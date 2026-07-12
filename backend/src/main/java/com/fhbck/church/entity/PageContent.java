package com.fhbck.church.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "page_content", uniqueConstraints = @UniqueConstraint(columnNames = "page_key"))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PageContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "page_key", nullable = false, unique = true)
    private String pageKey;

    @Column(columnDefinition = "TEXT")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String subtitle;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "hero_title")
    private String heroTitle;

    @Column(name = "hero_subtitle")
    private String heroSubtitle;

    @Column(name = "hero_image_url")
    private String heroImageUrl;

    @Column(name = "meta_data", columnDefinition = "TEXT")
    private String metaData;

    @Column(columnDefinition = "TEXT")
    private String data;

    @Column(name = "is_published")
    private boolean published;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
