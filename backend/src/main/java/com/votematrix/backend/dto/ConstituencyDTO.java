package com.votematrix.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConstituencyDTO {

    private Long id;
    private String state;
    private String stateSlug;
    private Integer constSno;
    private String constituencyName;
    private Integer totalElectors;
    private Integer totalPolled;
    private Integer totalValidVotes;
    private Double voterTurnoutPct;
    private Boolean uncontested;
    private Integer electionYear;
    private String electionType;

    // Derived fields
    private String winnerName;
    private String winnerParty;
    private String runnerUpName;
    private String runnerUpParty;
    private Integer margin;
    private Double marginPct;
    private String status;  // SAFE / STABLE / CRITICAL

    private List<CandidateDTO> candidates;
}
