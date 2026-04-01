package com.votematrix.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateDTO {
    private Integer candidateSlNo;
    private String candidateName;
    private String category;
    private String party;
    private String symbol;
    private Integer totalVotesSecured;
    private Double voteSharePct;
}
