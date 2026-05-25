package com.example.RUNTIME_REBELS.controller;

import com.example.RUNTIME_REBELS.model.Review;
import com.example.RUNTIME_REBELS.service.ReviewService;
import com.example.RUNTIME_REBELS.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<ApiResponse<List<Review>>> getReviewsByHotel(@PathVariable Long hotelId) {
        List<Review> reviews = reviewService.getReviewsByHotel(hotelId);
        return ResponseEntity.ok(ApiResponse.success("Reviews retrieved successfully", reviews));
    }

    @PostMapping("/hotel/{hotelId}")
    public ResponseEntity<ApiResponse<Review>> addReview(@PathVariable Long hotelId, @RequestBody Review review, Principal principal) {
        Review savedReview = reviewService.addReview(hotelId, review, principal.getName());
        return ResponseEntity.ok(ApiResponse.success("Review added successfully", savedReview));
    }
}
