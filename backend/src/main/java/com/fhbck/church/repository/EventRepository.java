package com.fhbck.church.repository;

import com.fhbck.church.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Page<Event> findByActiveTrueOrderByStartDateDesc(Pageable pageable);

    @Query("SELECT e FROM Event e WHERE e.active = true AND " +
           "(:keyword IS NULL OR LOWER(e.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(e.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(e.location) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY e.startDate DESC")
    Page<Event> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT e FROM Event e WHERE e.active = true AND e.category = :category ORDER BY e.startDate DESC")
    Page<Event> findByCategoryAndActiveTrue(@Param("category") String category, Pageable pageable);

    List<Event> findByFeaturedTrueAndActiveTrueOrderByStartDateAsc();
    List<Event> findByStartDateAfterAndActiveTrueOrderByStartDateAsc(LocalDate date);
}
