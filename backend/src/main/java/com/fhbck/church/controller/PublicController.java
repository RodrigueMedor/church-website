package com.fhbck.church.controller;

import com.fhbck.church.dto.*;
import com.fhbck.church.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
@Tag(name = "Public", description = "Public endpoints for website content (no auth required)")
public class PublicController {

    private final HeroSlideService heroSlideService;
    private final EventService eventService;
    private final SermonService sermonService;
    private final MinistryService ministryService;
    private final NewsService newsService;
    private final PastorService pastorService;
    private final TestimonialService testimonialService;
    private final GalleryService galleryService;
    private final ContactService contactService;
    private final PrayerService prayerService;
    private final ChurchSettingService churchSettingService;

    @GetMapping("/hero-slides")
    @Operation(summary = "Get active hero slides for a page")
    public ResponseEntity<List<HeroSlideDto>> getHeroSlides(@RequestParam(defaultValue = "homepage") String page) {
        return ResponseEntity.ok(heroSlideService.getActiveSlidesByPage(page));
    }

    @GetMapping("/events")
    @Operation(summary = "Get active events with pagination, search, and filtering")
    public ResponseEntity<PagedResponse<EventDto>> getEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(eventService.getAll(page, size, keyword, category));
    }

    @GetMapping("/events/upcoming")
    @Operation(summary = "Get upcoming events")
    public ResponseEntity<List<EventDto>> getUpcomingEvents() {
        return ResponseEntity.ok(eventService.getUpcoming());
    }

    @GetMapping("/events/featured")
    @Operation(summary = "Get featured events")
    public ResponseEntity<List<EventDto>> getFeaturedEvents() {
        return ResponseEntity.ok(eventService.getFeatured());
    }

    @GetMapping("/events/{id}")
    @Operation(summary = "Get a single event by ID")
    public ResponseEntity<EventDto> getEvent(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getById(id));
    }

    @GetMapping("/sermons")
    @Operation(summary = "Get active sermons with pagination and search")
    public ResponseEntity<PagedResponse<SermonDto>> getSermons(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(sermonService.getAll(page, size, keyword));
    }

    @GetMapping("/sermons/{id}")
    @Operation(summary = "Get a single sermon by ID")
    public ResponseEntity<SermonDto> getSermon(@PathVariable Long id) {
        return ResponseEntity.ok(sermonService.getById(id));
    }

    @GetMapping("/ministries")
    @Operation(summary = "Get all active ministries")
    public ResponseEntity<List<MinistryDto>> getMinistries() {
        return ResponseEntity.ok(ministryService.getAll());
    }

    @GetMapping("/ministries/{slug}")
    @Operation(summary = "Get a ministry by slug")
    public ResponseEntity<MinistryDto> getMinistry(@PathVariable String slug) {
        return ResponseEntity.ok(ministryService.getBySlug(slug));
    }

    @GetMapping("/news")
    @Operation(summary = "Get active news articles with pagination")
    public ResponseEntity<PagedResponse<NewsArticleDto>> getNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(newsService.getAll(page, size));
    }

    @GetMapping("/news/featured")
    @Operation(summary = "Get featured news articles")
    public ResponseEntity<List<NewsArticleDto>> getFeaturedNews() {
        return ResponseEntity.ok(newsService.getFeatured());
    }

    @GetMapping("/news/{id}")
    @Operation(summary = "Get a single news article by ID")
    public ResponseEntity<NewsArticleDto> getNewsItem(@PathVariable Long id) {
        return ResponseEntity.ok(newsService.getById(id));
    }

    @GetMapping("/pastors")
    @Operation(summary = "Get all pastors")
    public ResponseEntity<List<PastorDto>> getPastors() {
        return ResponseEntity.ok(pastorService.getAll());
    }

    @GetMapping("/testimonials")
    @Operation(summary = "Get all active testimonials")
    public ResponseEntity<List<TestimonialDto>> getTestimonials() {
        return ResponseEntity.ok(testimonialService.getAll());
    }

    @GetMapping("/gallery")
    @Operation(summary = "Get all active gallery items")
    public ResponseEntity<List<GalleryItemDto>> getGallery() {
        return ResponseEntity.ok(galleryService.getAll());
    }

    @GetMapping("/gallery/{category}")
    @Operation(summary = "Get gallery items by category")
    public ResponseEntity<List<GalleryItemDto>> getGalleryByCategory(@PathVariable String category) {
        return ResponseEntity.ok(galleryService.getByCategory(category));
    }

    @PostMapping("/contact")
    @Operation(summary = "Submit a contact form message")
    public ResponseEntity<ContactMessageDto> submitContact(@RequestBody ContactMessageDto dto) {
        return ResponseEntity.ok(contactService.create(dto));
    }

    @PostMapping("/prayer-requests")
    @Operation(summary = "Submit a prayer request")
    public ResponseEntity<PrayerRequestDto> submitPrayer(@RequestBody PrayerRequestDto dto) {
        return ResponseEntity.ok(prayerService.create(dto));
    }

    @GetMapping("/prayer-requests/public")
    @Operation(summary = "Get public prayer requests")
    public ResponseEntity<List<PrayerRequestDto>> getPublicPrayers() {
        return ResponseEntity.ok(prayerService.getPublic());
    }

    @GetMapping("/settings")
    @Operation(summary = "Get church settings")
    public ResponseEntity<List<ChurchSettingDto>> getSettings() {
        return ResponseEntity.ok(churchSettingService.getAll());
    }
}
