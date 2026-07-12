package com.fhbck.church.service;

import com.fhbck.church.dto.PageContentDTO;
import com.fhbck.church.entity.PageContent;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.PageContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PageContentService {

    private final PageContentRepository pageContentRepository;
    private final MessageSource messageSource;

    public List<PageContent> findAll() {
        return pageContentRepository.findAll();
    }

    public PageContent findByPageKey(String pageKey) {
        return pageContentRepository.findByPageKey(pageKey)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.page", null, LocaleContextHolder.getLocale()), pageKey}, LocaleContextHolder.getLocale())));
    }

    public PageContent create(PageContentDTO dto) {
        PageContent page = PageContent.builder()
                .pageKey(dto.getPageKey())
                .title(dto.getTitle())
                .subtitle(dto.getSubtitle())
                .content(dto.getContent())
                .heroTitle(dto.getHeroTitle())
                .heroSubtitle(dto.getHeroSubtitle())
                .heroImageUrl(dto.getHeroImageUrl())
                .metaData(dto.getMetaData())
                .data(dto.getData())
                .published(dto.isPublished())
                .build();
        return pageContentRepository.save(page);
    }

    public PageContent update(String pageKey, PageContentDTO dto) {
        PageContent page = findByPageKey(pageKey);
        if (dto.getTitle() != null) page.setTitle(dto.getTitle());
        if (dto.getSubtitle() != null) page.setSubtitle(dto.getSubtitle());
        if (dto.getContent() != null) page.setContent(dto.getContent());
        if (dto.getHeroTitle() != null) page.setHeroTitle(dto.getHeroTitle());
        if (dto.getHeroSubtitle() != null) page.setHeroSubtitle(dto.getHeroSubtitle());
        if (dto.getHeroImageUrl() != null) page.setHeroImageUrl(dto.getHeroImageUrl());
        if (dto.getMetaData() != null) page.setMetaData(dto.getMetaData());
        if (dto.getData() != null) page.setData(dto.getData());
        page.setPublished(dto.isPublished());
        return pageContentRepository.save(page);
    }

    public String getPageData(String pageKey) {
        return pageContentRepository.findByPageKey(pageKey)
                .map(PageContent::getData)
                .orElse(null);
    }

    public PageContent savePageData(String pageKey, String dataJson) {
        PageContent page = pageContentRepository.findByPageKey(pageKey)
                .orElseGet(() -> {
                    PageContent newPage = PageContent.builder().pageKey(pageKey).build();
                    return pageContentRepository.save(newPage);
                });
        page.setData(dataJson);
        page.setPublished(true);
        return pageContentRepository.save(page);
    }

    public void delete(String pageKey) {
        PageContent page = findByPageKey(pageKey);
        pageContentRepository.delete(page);
    }
}
