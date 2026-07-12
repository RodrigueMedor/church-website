package com.fhbck.church.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PageContentDTO {
    private Long id;
    private String pageKey;
    private String title;
    private String subtitle;
    private String content;
    private String heroTitle;
    private String heroSubtitle;
    private String heroImageUrl;
    private String metaData;
    private String data;
    private boolean published;
}
