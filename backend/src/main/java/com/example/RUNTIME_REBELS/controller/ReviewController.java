package com.example.RUNTIME_REBELS.controller;

import com.example.RUNTIME_REBELS.model.Review;
import com.example.RUNTIME_REBELS.service.ReviewService;
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
    public List<Review> getReviewsByHotel(@PathVariable Long hotelId) {
        return reviewService.getReviewsByHotel(hotelId);
    }

    @PostMapping("/hotel/{hotelId}")
    public ResponseEntity<Review> addReview(@PathVariable Long hotelId, @RequestBody Review review, Principal principal) {
        return ResponseEntity.ok(reviewService.addReview(hotelId, review, principal.getName()));
    }
}
