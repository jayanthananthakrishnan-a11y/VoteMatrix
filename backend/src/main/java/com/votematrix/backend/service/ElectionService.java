package com.votematrix.backend.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.votematrix.backend.dto.CandidateDTO;
import com.votematrix.backend.dto.ConstituencyDTO;
import com.votematrix.backend.dto.StateDTO;
import com.votematrix.backend.model.Candidate;
import com.votematrix.backend.model.Constituency;
import com.votematrix.backend.repository.CandidateRepository;
import com.votematrix.backend.repository.ConstituencyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ElectionService {

    private final ConstituencyRepository constituencyRepo;
    private final CandidateRepository candidateRepo;

    // ── Get all state slugs ───────────────────────────────
    public List<String> getAllStateSlugs(String electionType) {
        return constituencyRepo.findDistinctStateSlugs(electionType.toUpperCase());
    }

    // ── Get state summary ─────────────────────────────────
    public StateDTO getStateSummary(String stateSlug, int year, String electionType) {
        List<Constituency> constituencies = constituencyRepo
                .findByStateSlugAndElectionYearOrderByConstSnoAsc(stateSlug, year);

        if (constituencies.isEmpty()) return null;

        String stateName = constituencies.get(0).getState();

        // Build constituency DTOs (without candidates for list view)
        List<ConstituencyDTO> constDTOs = constituencies.stream()
                .map(c -> toConstituencyDTO(c, false))
                .collect(Collectors.toList());

        // Party seat counts
        Map<String, Integer> partyCounts = new LinkedHashMap<>();
        constDTOs.forEach(c -> {
            if (c.getWinnerParty() != null) {
                partyCounts.merge(c.getWinnerParty(), 1, Integer::sum);
            }
        });
        // Sort by count desc
        Map<String, Integer> sortedPartyCounts = partyCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .collect(Collectors.toMap(
                        Map.Entry::getKey, Map.Entry::getValue,
                        (e1, e2) -> e1, LinkedHashMap::new));

        return StateDTO.builder()
                .state(stateName)
                .stateSlug(stateSlug)
                .totalConstituencies(constituencies.size())
                .electionYear(year)
                .electionType(electionType.toUpperCase())
                .partySeatCounts(sortedPartyCounts)
                .constituencies(constDTOs)
                .build();
    }

    // ── Get single constituency with candidates ───────────
    public ConstituencyDTO getConstituencyDetail(String stateSlug, int constSno, int year) {
        Optional<Constituency> opt = constituencyRepo
                .findByStateSlugAndConstSnoAndElectionYear(stateSlug, constSno, year);
        return opt.map(c -> toConstituencyDTO(c, true)).orElse(null);
    }

    // ── Intelligence filter ───────────────────────────────
    public List<ConstituencyDTO> getIntelligenceFilter(
            String electionType, Integer year, Double maxMarginPct, Double minMarginPct) {

        List<Constituency> all = year != null
                ? constituencyRepo.findByStateSlugAndElectionYearOrderByConstSnoAsc("", year)
                : constituencyRepo.findAll();

        return all.stream()
                .map(c -> toConstituencyDTO(c, false))
                .filter(c -> c.getMarginPct() != null)
                .filter(c -> maxMarginPct == null || c.getMarginPct() <= maxMarginPct)
                .filter(c -> minMarginPct == null || c.getMarginPct() >= minMarginPct)
                .sorted(Comparator.comparingDouble(ConstituencyDTO::getMarginPct))
                .collect(Collectors.toList());
    }

    // ── Converter ─────────────────────────────────────────
    private ConstituencyDTO toConstituencyDTO(Constituency c, boolean includeCandidates) {
        // Load candidates sorted by votes desc
        List<Candidate> candidates = candidateRepo
                .findByConstituencyIdOrderByTotalVotesSecuredDesc(c.getId());

        Candidate winner   = candidates.size() > 0 ? candidates.get(0) : null;
        Candidate runnerUp = candidates.size() > 1 ? candidates.get(1) : null;

        int margin = 0;
        double marginPct = 0.0;
        if (winner != null && runnerUp != null
                && winner.getTotalVotesSecured() != null
                && runnerUp.getTotalVotesSecured() != null) {
            margin = winner.getTotalVotesSecured() - runnerUp.getTotalVotesSecured();
            if (c.getTotalValidVotes() != null && c.getTotalValidVotes() > 0) {
                marginPct = (margin * 100.0) / c.getTotalValidVotes();
            }
        }

        String status = marginPct < 3.0 ? "CRITICAL" : marginPct < 10.0 ? "STABLE" : "SAFE";

        List<CandidateDTO> candidateDTOs = includeCandidates
                ? candidates.stream().map(this::toCandidateDTO).collect(Collectors.toList())
                : Collections.emptyList();

        return ConstituencyDTO.builder()
                .id(c.getId())
                .state(c.getState())
                .stateSlug(c.getStateSlug())
                .constSno(c.getConstSno())
                .constituencyName(c.getConstituencyName())
                .totalElectors(c.getTotalElectors())
                .totalPolled(c.getTotalPolled())
                .totalValidVotes(c.getTotalValidVotes())
                .voterTurnoutPct(c.getVoterTurnoutPct())
                .uncontested(c.getUncontested())
                .electionYear(c.getElectionYear())
                .electionType(c.getElectionType())
                .winnerName(winner != null ? winner.getCandidateName() : null)
                .winnerParty(winner != null ? winner.getParty() : null)
                .runnerUpName(runnerUp != null ? runnerUp.getCandidateName() : null)
                .runnerUpParty(runnerUp != null ? runnerUp.getParty() : null)
                .margin(margin)
                .marginPct(Math.round(marginPct * 10.0) / 10.0)
                .status(status)
                .candidates(candidateDTOs)
                .build();
    }

    private CandidateDTO toCandidateDTO(Candidate c) {
        return CandidateDTO.builder()
                .candidateSlNo(c.getCandidateSlNo())
                .candidateName(c.getCandidateName())
                .category(c.getCategory())
                .party(c.getParty())
                .symbol(c.getSymbol())
                .totalVotesSecured(c.getTotalVotesSecured())
                .voteSharePct(c.getVoteSharePct())
                .build();
    }
}
