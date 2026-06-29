package com.fhbck.church.service;

import com.fhbck.church.dto.NewsArticleDto;
import com.fhbck.church.dto.PagedResponse;
import com.fhbck.church.entity.NewsArticle;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.NewsArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsArticleRepository newsArticleRepository;

    public PagedResponse<NewsArticleDto> getAll(int page, int size) {
        var pageable = PageRequest.of(page, size);
        var result = newsArticleRepository.findByActiveTrueOrderByCreatedAtDesc(pageable);
        var items = result.getContent().stream().map(this::toDto).collect(Collectors.toList());
        return new PagedResponse<>(items, result.getNumber(), result.getSize(),
                result.getTotalElements(), result.getTotalPages(),
                result.isLast(), result.isFirst());
    }

    public List<NewsArticleDto> getFeatured() {
        return newsArticleRepository.findByFeaturedTrueAndActiveTrueOrderByCreatedAtDesc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public NewsArticleDto getById(Long id) {
        return toDto(newsArticleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News not found: " + id)));
    }

    @Transactional
    public NewsArticleDto create(NewsArticleDto dto) {
        var article = toEntity(dto);
        return toDto(newsArticleRepository.save(article));
    }

    @Transactional
    public NewsArticleDto update(Long id, NewsArticleDto dto) {
        var article = newsArticleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News not found: " + id));
        article.setTitle(dto.getTitle());
        article.setExcerpt(dto.getExcerpt());
        article.setContent(dto.getContent());
        article.setImageUrl(dto.getImageUrl());
        article.setAuthor(dto.getAuthor());
        article.setFeatured(dto.getFeatured());
        article.setActive(dto.getActive());
        return toDto(newsArticleRepository.save(article));
    }

    @Transactional
    public void delete(Long id) {
        if (!newsArticleRepository.existsById(id)) {
            throw new ResourceNotFoundException("News not found: " + id);
        }
        newsArticleRepository.deleteById(id);
    }

    private NewsArticleDto toDto(NewsArticle a) {
        var dto = new NewsArticleDto();
        dto.setId(a.getId());
        dto.setTitle(a.getTitle());
        dto.setExcerpt(a.getExcerpt());
        dto.setContent(a.getContent());
        dto.setImageUrl(a.getImageUrl());
        dto.setAuthor(a.getAuthor());
        dto.setFeatured(a.getFeatured());
        dto.setActive(a.getActive());
        dto.setCreatedAt(a.getCreatedAt());
        dto.setUpdatedAt(a.getUpdatedAt());
        return dto;
    }

    private NewsArticle toEntity(NewsArticleDto dto) {
        return NewsArticle.builder()
                .title(dto.getTitle())
                .excerpt(dto.getExcerpt())
                .content(dto.getContent())
                .imageUrl(dto.getImageUrl())
                .author(dto.getAuthor())
                .featured(dto.getFeatured() != null ? dto.getFeatured() : false)
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();
    }
}
