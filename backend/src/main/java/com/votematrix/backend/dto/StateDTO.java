package com.votematrix.backend.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StateDTO {
    private String state;
    private String stateSlug;
    private Integer totalConstituencies;
    private Integer electionYear;
    private String electionType;

    // Party-wise seat count: { "DMK": 22, "BJP": 4, ... }
    private Map<String, Integer> partySeatCounts;

    // Summary list of constituencies (without candidates)
    private List<ConstituencyDTO> constituencies;
}
