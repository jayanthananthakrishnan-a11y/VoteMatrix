package com.votematrix.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "constituencies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Constituency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String state;           // e.g. "TAMIL NADU"

    @Column(name = "state_slug", nullable = false)
    private String stateSlug;       // e.g. "tamil-nadu"

    @Column(name = "const_sno", nullable = false)
    private Integer constSno;       // constituency number within state

    @Column(name = "constituency_name", nullable = false)
    private String constituencyName;

    @Column(name = "total_electors")
    private Integer totalElectors;

    @Column(name = "total_polled")
    private Integer totalPolled;

    @Column(name = "total_valid_votes")
    private Integer totalValidVotes;

    @Column(name = "voter_turnout_pct")
    private Double voterTurnoutPct;

    @Column
    private Boolean uncontested = false;

    @Column(name = "election_year", nullable = false)
    private Integer electionYear;

    @Column(name = "election_type", nullable = false)
    private String electionType;    // "LOK_SABHA" or "ASSEMBLY"

    @OneToMany(mappedBy = "constituency", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Candidate> candidates;
}
