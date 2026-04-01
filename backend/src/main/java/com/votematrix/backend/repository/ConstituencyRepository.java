package com.votematrix.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.votematrix.backend.model.Constituency;

@Repository
public interface ConstituencyRepository extends JpaRepository<Constituency, Long> {

    // All constituencies for a state + year
    List<Constituency> findByStateSlugAndElectionYearOrderByConstSnoAsc(
            String stateSlug, Integer electionYear);

    // All constituencies for a state (any year)
    List<Constituency> findByStateSlugOrderByConstSnoAsc(String stateSlug);

    // Single constituency by state + sno + year
    Optional<Constituency> findByStateSlugAndConstSnoAndElectionYear(
            String stateSlug, Integer constSno, Integer electionYear);

    // All distinct states
    @Query("SELECT DISTINCT c.state FROM Constituency c WHERE c.electionType = :type ORDER BY c.state")
    List<String> findDistinctStatesByElectionType(@Param("type") String electionType);

    // All distinct state slugs
    @Query("SELECT DISTINCT c.stateSlug FROM Constituency c WHERE c.electionType = :type ORDER BY c.stateSlug")
    List<String> findDistinctStateSlugs(@Param("type") String electionType);

    // Count constituencies per state
    @Query("SELECT COUNT(c) FROM Constituency c WHERE c.stateSlug = :slug AND c.electionYear = :year")
    Long countByStateSlugAndElectionYear(@Param("slug") String slug, @Param("year") Integer year);
}
