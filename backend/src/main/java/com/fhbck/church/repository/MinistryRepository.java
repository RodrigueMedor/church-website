package com.fhbck.church.repository;

import com.fhbck.church.entity.Ministry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MinistryRepository extends JpaRepository<Ministry, Long> {
    List<Ministry> findByActiveTrueOrderBySortOrderAsc();
    Optional<Ministry> findBySlugAndActiveTrue(String slug);
}
