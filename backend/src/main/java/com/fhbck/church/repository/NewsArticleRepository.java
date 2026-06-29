package com.fhbck.church.repository;

import com.fhbck.church.entity.NewsArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Long> {
    Page<NewsArticle> findByActiveTrueOrderByCreatedAtDesc(Pageable pageable);
    List<NewsArticle> findByFeaturedTrueAndActiveTrueOrderByCreatedAtDesc();
}
