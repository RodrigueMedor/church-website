package com.fhbck.church.repository;

import com.fhbck.church.entity.HeroSlide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeroSlideRepository extends JpaRepository<HeroSlide, Long> {
    List<HeroSlide> findByPageAndActiveTrueOrderBySortOrderAsc(String page);
    List<HeroSlide> findByActiveTrueOrderBySortOrderAsc();
}
