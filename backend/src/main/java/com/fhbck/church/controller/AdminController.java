package com.fhbck.church.controller;

import com.fhbck.church.dto.*;
import com.fhbck.church.entity.User;
import com.fhbck.church.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin endpoints for content management (requires ADMIN or EDITOR role)")
public class AdminController {

    private final HeroSlideService heroSlideService;
    private final EventService eventService;
    private final SermonService sermonService;
    private final MinistryService ministryService;
    private final LeaderService leaderService;
    private final NewsService newsService;
    private final PastorService pastorService;
    private final TestimonialService testimonialService;
    private final GalleryService galleryService;
    private final ContactService contactService;
    private final PrayerService prayerService;
    private final ChurchSettingService churchSettingService;
    private final UserService userService;

    // Hero Slides
    @GetMapping("/hero-slides")
    @Operation(summary = "Get all hero slides (admin)")
    public ResponseEntity<?> getAllHeroSlides() {
        return ResponseEntity.ok(heroSlideService.getAll());
    }

    @PostMapping("/hero-slides")
    @Operation(summary = "Create a hero slide")
    public ResponseEntity<HeroSlideDto> createHeroSlide(@Valid @RequestBody HeroSlideDto dto) {
        return ResponseEntity.ok(heroSlideService.create(dto));
    }

    @PutMapping("/hero-slides/{id}")
    @Operation(summary = "Update a hero slide")
    public ResponseEntity<HeroSlideDto> updateHeroSlide(@PathVariable Long id, @Valid @RequestBody HeroSlideDto dto) {
        return ResponseEntity.ok(heroSlideService.update(id, dto));
    }

    @DeleteMapping("/hero-slides/{id}")
    @Operation(summary = "Delete a hero slide")
    public ResponseEntity<Void> deleteHeroSlide(@PathVariable Long id) {
        heroSlideService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Events
    @GetMapping("/events")
    @Operation(summary = "Get all events (admin)")
    public ResponseEntity<?> getAllEvents(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size, @RequestParam(required = false) String keyword, @RequestParam(required = false) String category) {
        return ResponseEntity.ok(eventService.getAll(page, size, keyword, category));
    }

    @PostMapping("/events")
    @Operation(summary = "Create an event")
    public ResponseEntity<EventDto> createEvent(@Valid @RequestBody EventDto dto) {
        return ResponseEntity.ok(eventService.create(dto));
    }

    @PutMapping("/events/{id}")
    @Operation(summary = "Update an event")
    public ResponseEntity<EventDto> updateEvent(@PathVariable Long id, @Valid @RequestBody EventDto dto) {
        return ResponseEntity.ok(eventService.update(id, dto));
    }

    @DeleteMapping("/events/{id}")
    @Operation(summary = "Delete an event")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Sermons
    @GetMapping("/sermons")
    @Operation(summary = "Get all sermons (admin)")
    public ResponseEntity<?> getAllSermons(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size, @RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(sermonService.getAll(page, size, keyword));
    }

    @PostMapping("/sermons")
    @Operation(summary = "Create a sermon")
    public ResponseEntity<SermonDto> createSermon(@Valid @RequestBody SermonDto dto) {
        return ResponseEntity.ok(sermonService.create(dto));
    }

    @PutMapping("/sermons/{id}")
    @Operation(summary = "Update a sermon")
    public ResponseEntity<SermonDto> updateSermon(@PathVariable Long id, @Valid @RequestBody SermonDto dto) {
        return ResponseEntity.ok(sermonService.update(id, dto));
    }

    @DeleteMapping("/sermons/{id}")
    @Operation(summary = "Delete a sermon")
    public ResponseEntity<Void> deleteSermon(@PathVariable Long id) {
        sermonService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Ministries
    @GetMapping("/ministries")
    @Operation(summary = "Get all ministries (admin)")
    public ResponseEntity<?> getAllMinistries() {
        return ResponseEntity.ok(ministryService.getAll());
    }

    @PostMapping("/ministries")
    @Operation(summary = "Create a ministry")
    public ResponseEntity<MinistryDto> createMinistry(@Valid @RequestBody MinistryDto dto) {
        return ResponseEntity.ok(ministryService.create(dto));
    }

    @PutMapping("/ministries/{id}")
    @Operation(summary = "Update a ministry")
    public ResponseEntity<MinistryDto> updateMinistry(@PathVariable Long id, @Valid @RequestBody MinistryDto dto) {
        return ResponseEntity.ok(ministryService.update(id, dto));
    }

    @DeleteMapping("/ministries/{id}")
    @Operation(summary = "Delete a ministry")
    public ResponseEntity<Void> deleteMinistry(@PathVariable Long id) {
        ministryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Leaders
    @PostMapping("/leaders")
    @Operation(summary = "Create a leader")
    public ResponseEntity<LeaderDto> createLeader(@Valid @RequestBody LeaderDto dto) {
        return ResponseEntity.ok(leaderService.create(dto));
    }

    @PutMapping("/leaders/{id}")
    @Operation(summary = "Update a leader")
    public ResponseEntity<LeaderDto> updateLeader(@PathVariable Long id, @Valid @RequestBody LeaderDto dto) {
        return ResponseEntity.ok(leaderService.update(id, dto));
    }

    @DeleteMapping("/leaders/{id}")
    @Operation(summary = "Delete a leader")
    public ResponseEntity<Void> deleteLeader(@PathVariable Long id) {
        leaderService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // News
    @GetMapping("/news")
    @Operation(summary = "Get all news articles (admin)")
    public ResponseEntity<?> getAllNews(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(newsService.getAll(page, size));
    }

    @PostMapping("/news")
    @Operation(summary = "Create a news article")
    public ResponseEntity<NewsArticleDto> createNews(@Valid @RequestBody NewsArticleDto dto) {
        return ResponseEntity.ok(newsService.create(dto));
    }

    @PutMapping("/news/{id}")
    @Operation(summary = "Update a news article")
    public ResponseEntity<NewsArticleDto> updateNews(@PathVariable Long id, @Valid @RequestBody NewsArticleDto dto) {
        return ResponseEntity.ok(newsService.update(id, dto));
    }

    @DeleteMapping("/news/{id}")
    @Operation(summary = "Delete a news article")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        newsService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Pastors
    @GetMapping("/pastors")
    @Operation(summary = "Get all pastors (admin)")
    public ResponseEntity<?> getAllPastors() {
        return ResponseEntity.ok(pastorService.getAll());
    }

    @PostMapping("/pastors")
    @Operation(summary = "Create a pastor")
    public ResponseEntity<PastorDto> createPastor(@Valid @RequestBody PastorDto dto) {
        return ResponseEntity.ok(pastorService.create(dto));
    }

    @PutMapping("/pastors/{id}")
    @Operation(summary = "Update a pastor")
    public ResponseEntity<PastorDto> updatePastor(@PathVariable Long id, @Valid @RequestBody PastorDto dto) {
        return ResponseEntity.ok(pastorService.update(id, dto));
    }

    @DeleteMapping("/pastors/{id}")
    @Operation(summary = "Delete a pastor")
    public ResponseEntity<Void> deletePastor(@PathVariable Long id) {
        pastorService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Testimonials
    @GetMapping("/testimonials")
    @Operation(summary = "Get all testimonials (admin)")
    public ResponseEntity<?> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAll());
    }

    @PostMapping("/testimonials")
    @Operation(summary = "Create a testimonial")
    public ResponseEntity<TestimonialDto> createTestimonial(@Valid @RequestBody TestimonialDto dto) {
        return ResponseEntity.ok(testimonialService.create(dto));
    }

    @PutMapping("/testimonials/{id}")
    @Operation(summary = "Update a testimonial")
    public ResponseEntity<TestimonialDto> updateTestimonial(@PathVariable Long id, @Valid @RequestBody TestimonialDto dto) {
        return ResponseEntity.ok(testimonialService.update(id, dto));
    }

    @DeleteMapping("/testimonials/{id}")
    @Operation(summary = "Delete a testimonial")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        testimonialService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Gallery
    @GetMapping("/gallery")
    @Operation(summary = "Get all gallery items (admin)")
    public ResponseEntity<?> getAllGallery() {
        return ResponseEntity.ok(galleryService.getAll());
    }

    @PostMapping("/gallery")
    @Operation(summary = "Create a gallery item")
    public ResponseEntity<GalleryItemDto> createGalleryItem(@Valid @RequestBody GalleryItemDto dto) {
        return ResponseEntity.ok(galleryService.create(dto));
    }

    @PutMapping("/gallery/{id}")
    @Operation(summary = "Update a gallery item")
    public ResponseEntity<GalleryItemDto> updateGalleryItem(@PathVariable Long id, @Valid @RequestBody GalleryItemDto dto) {
        return ResponseEntity.ok(galleryService.update(id, dto));
    }

    @DeleteMapping("/gallery/{id}")
    @Operation(summary = "Delete a gallery item")
    public ResponseEntity<Void> deleteGalleryItem(@PathVariable Long id) {
        galleryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Contact Messages
    @GetMapping("/contact-messages")
    @Operation(summary = "Get all contact messages")
    public ResponseEntity<?> getContactMessages(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(contactService.getAll(page, size));
    }

    @PatchMapping("/contact-messages/{id}/read")
    @Operation(summary = "Mark a contact message as read")
    public ResponseEntity<ContactMessageDto> markMessageRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.markAsRead(id));
    }

    @DeleteMapping("/contact-messages/{id}")
    @Operation(summary = "Delete a contact message")
    public ResponseEntity<Void> deleteContactMessage(@PathVariable Long id) {
        contactService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Prayer Requests
    @GetMapping("/prayer-requests")
    @Operation(summary = "Get all prayer requests")
    public ResponseEntity<?> getPrayerRequests(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(prayerService.getAll(page, size));
    }

    @PatchMapping("/prayer-requests/{id}/prayed")
    @Operation(summary = "Mark a prayer request as prayed")
    public ResponseEntity<PrayerRequestDto> markPrayed(@PathVariable Long id) {
        return ResponseEntity.ok(prayerService.markAsPrayed(id));
    }

    @DeleteMapping("/prayer-requests/{id}")
    @Operation(summary = "Delete a prayer request")
    public ResponseEntity<Void> deletePrayerRequest(@PathVariable Long id) {
        prayerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Settings
    @GetMapping("/settings")
    @Operation(summary = "Get all church settings")
    public ResponseEntity<?> getSettings() {
        return ResponseEntity.ok(churchSettingService.getAll());
    }

    @PutMapping("/settings/{key}")
    @Operation(summary = "Update a church setting")
    public ResponseEntity<ChurchSettingDto> updateSetting(@PathVariable String key, @RequestBody ChurchSettingDto dto) {
        return ResponseEntity.ok(churchSettingService.update(key, dto.getSettingValue()));
    }

    // User management
    @GetMapping("/users")
    @Operation(summary = "Get all users")
    public ResponseEntity<List<UserDto>> getUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @PostMapping("/users")
    @Operation(summary = "Create a user")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.create(request));
    }

    @PutMapping("/users/{id}")
    @Operation(summary = "Update a user")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.update(id, request));
    }

    @DeleteMapping("/users/{id}")
    @Operation(summary = "Delete a user")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{id}/roles")
    @Operation(summary = "Update user roles")
    public ResponseEntity<UserDto> updateUserRoles(@PathVariable Long id, @RequestBody List<String> roles) {
        return ResponseEntity.ok(userService.updateRoles(id, roles));
    }

    // Dashboard stats
    @GetMapping("/dashboard")
    @Operation(summary = "Get dashboard statistics")
    public ResponseEntity<DashboardResponse> getDashboard() {
        return ResponseEntity.ok(new DashboardResponse(
                contactService.getUnreadCount(),
                prayerService.getUnprayedCount()
        ));
    }

    public record DashboardResponse(long unreadMessages, long unprayedRequests) {}
}
