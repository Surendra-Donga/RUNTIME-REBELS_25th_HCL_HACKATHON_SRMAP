package com.example.RUNTIME_REBELS.Service;

import com.example.RUNTIME_REBELS.Models.Hotels;
import com.example.RUNTIME_REBELS.Models.Review;
import com.example.RUNTIME_REBELS.Models.Users;
import com.example.RUNTIME_REBELS.Repository.HotelRepository;
import com.example.RUNTIME_REBELS.Repository.ReviewRepository;
import com.example.RUNTIME_REBELS.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private HotelRepository hotelRepository;

    public List<Review> getReviewsByHotel(Long hotelId) {
        return reviewRepository.findByHotel_HotelId(hotelId);
    }

    public Review addReview(Long hotelId, Review review, String username) {
        Users user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Hotels hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        review.setUser(user);
        review.setHotel(hotel);
        review.setCreatedAt(LocalDateTime.now());
        
        Review savedReview = reviewRepository.save(review);
        
        // Update hotel rating (simple average)
        updateHotelRating(hotel);
        
        return savedReview;
    }

    private void updateHotelRating(Hotels hotel) {
        List<Review> reviews = reviewRepository.findByHotel_HotelId(hotel.getHotelId());
        if (!reviews.isEmpty()) {
            double avg = reviews.stream().mapToInt(r -> r.getRating()).average().orElse(0.0);
            hotel.setRating((int) Math.round(avg));
            hotelRepository.save(hotel);
        }
    }
}
