package com.votematrix.backend.loader;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.votematrix.backend.model.Candidate;
import com.votematrix.backend.model.Constituency;
import com.votematrix.backend.repository.CandidateRepository;
import com.votematrix.backend.repository.ConstituencyRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final ConstituencyRepository constituencyRepo;
    private final CandidateRepository candidateRepo;

    @Value("${app.data.load-on-startup:false}")
    private boolean loadOnStartup;

    @Value("${app.data.json-path}")
    private String jsonPath;

    @Override
    public void run(String... args) throws Exception {
        if (!loadOnStartup) {
            log.info("Data loader disabled. Set app.data.load-on-startup=true to import JSON.");
            return;
        }

        long existingCount = constituencyRepo.count();
        if (existingCount > 0) {
            log.info("Database already has {} constituencies. Skipping import.", existingCount);
            return;
        }

        log.info("Starting data import from: {}", jsonPath);
        importJson();
        log.info("Import complete. Total constituencies: {}", constituencyRepo.count());
    }

    private void importJson() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(new File(jsonPath));

        int totalImported = 0;

        Iterator<Map.Entry<String, JsonNode>> stateIterator = root.fields();
        while (stateIterator.hasNext()) {
            Map.Entry<String, JsonNode> stateEntry = stateIterator.next();
            String stateName = stateEntry.getKey();           // e.g. "TAMIL NADU"
            String stateSlug = toSlug(stateName);             // e.g. "tamil-nadu"
            JsonNode stateData = stateEntry.getValue();

            log.info("Importing state: {}", stateName);

            Iterator<Map.Entry<String, JsonNode>> constIterator = stateData.fields();
            while (constIterator.hasNext()) {
                Map.Entry<String, JsonNode> constEntry = constIterator.next();
                JsonNode c = constEntry.getValue();

                try {
                    Constituency constituency = Constituency.builder()
                            .state(stateName)
                            .stateSlug(stateSlug)
                            .constSno(c.path("const_sno").asInt())
                            .constituencyName(c.path("constituency_name").asText())
                            .totalElectors(c.path("total_electors").asInt(0))
                            .totalPolled(c.path("total_polled").asInt(0))
                            .totalValidVotes(c.path("total_valid_votes").asInt(0))
                            .voterTurnoutPct(c.path("voter_turnout_pct").asDouble(0.0))
                            .uncontested(c.path("uncontested").asBoolean(false))
                            .electionYear(2024)
                            .electionType("LOK_SABHA")
                            .build();

                    constituency = constituencyRepo.save(constituency);

                    // Import candidates
                    JsonNode candidatesNode = c.path("candidates");
                    List<Candidate> candidates = new ArrayList<>();

                    for (JsonNode cand : candidatesNode) {
                        Candidate candidate = Candidate.builder()
                                .constituency(constituency)
                                .candidateSlNo(cand.path("candidate_sl_no").asInt())
                                .candidateName(cand.path("candidate_name").asText())
                                .category(cand.path("category").isNull() ? null : cand.path("category").asText())
                                .party(cand.path("party").asText())
                                .symbol(cand.path("symbol").asText())
                                .totalVotesSecured(cand.path("total_votes_secured").asInt(0))
                                .voteSharePct(cand.path("vote_share_pct").asDouble(0.0))
                                .build();
                        candidates.add(candidate);
                    }

                    candidateRepo.saveAll(candidates);
                    totalImported++;

                } catch (Exception e) {
                    log.error("Error importing constituency {} in {}: {}", 
                            constEntry.getKey(), stateName, e.getMessage());
                }
            }
        }

        log.info("Successfully imported {} constituencies", totalImported);
    }

    // Convert "TAMIL NADU" → "tamil-nadu"
    private String toSlug(String name) {
        return name.toLowerCase()
                .trim()
                .replace(" & ", "-and-")
                .replace("&", "and")
                .replace(" ", "-")
                .replaceAll("[^a-z0-9-]", "")
                .replaceAll("-+", "-");
    }
}
