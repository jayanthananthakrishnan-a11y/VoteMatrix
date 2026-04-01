package com.votematrix.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.votematrix.backend.dto.ConstituencyDTO;
import com.votematrix.backend.dto.StateDTO;
import com.votematrix.backend.service.ElectionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ElectionController {

    private final ElectionService electionService;

    // ── GET /api/states?type=LOK_SABHA ────────────────────
    @GetMapping("/states")
    public ResponseEntity<List<String>> getStates(
            @RequestParam(defaultValue = "LOK_SABHA") String type) {
        return ResponseEntity.ok(electionService.getAllStateSlugs(type));
    }

    // ── GET /api/state/tamil-nadu?year=2024&type=LOK_SABHA
    @GetMapping("/state/{stateSlug}")
    public ResponseEntity<StateDTO> getState(
            @PathVariable String stateSlug,
            @RequestParam(defaultValue = "2024") int year,
            @RequestParam(defaultValue = "LOK_SABHA") String type) {
        StateDTO dto = electionService.getStateSummary(stateSlug, year, type);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    // ── GET /api/state/tamil-nadu/constituencies?year=2024
    @GetMapping("/state/{stateSlug}/constituencies")
    public ResponseEntity<StateDTO> getConstituencies(
            @PathVariable String stateSlug,
            @RequestParam(defaultValue = "2024") int year,
            @RequestParam(defaultValue = "LOK_SABHA") String type) {
        StateDTO dto = electionService.getStateSummary(stateSlug, year, type);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    // ── GET /api/constituency/tamil-nadu/39?year=2024 ─────
    @GetMapping("/constituency/{stateSlug}/{constSno}")
    public ResponseEntity<ConstituencyDTO> getConstituency(
            @PathVariable String stateSlug,
            @PathVariable int constSno,
            @RequestParam(defaultValue = "2024") int year) {
        ConstituencyDTO dto = electionService.getConstituencyDetail(stateSlug, constSno, year);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    // ── GET /api/health ───────────────────────────────────
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("VoteMatrix API is running");
    }
}
