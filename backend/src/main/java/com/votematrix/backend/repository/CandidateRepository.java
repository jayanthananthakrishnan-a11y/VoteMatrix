package com.votematrix.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.votematrix.backend.model.Candidate;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    List<Candidate> findByConstituencyIdOrderByTotalVotesSecuredDesc(Long constituencyId);
}
