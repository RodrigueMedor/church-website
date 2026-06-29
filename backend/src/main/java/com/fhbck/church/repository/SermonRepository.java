package com.fhbck.church.repository;

import com.fhbck.church.entity.Sermon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SermonRepository extends JpaRepository<Sermon, Long> {
    Page<Sermon> findByActiveTrueOrderByDatePreachedDesc(Pageable pageable);

    @Query("SELECT s FROM Sermon s WHERE s.active = true AND " +
           "(:keyword IS NULL OR LOWER(s.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.speaker) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.series) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY s.datePreached DESC")
    Page<Sermon> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    List<Sermon> findBySeriesAndActiveTrueOrderByDatePreachedDesc(String series);
    List<Sermon> findBySpeakerAndActiveTrueOrderByDatePreachedDesc(String speaker);
}
