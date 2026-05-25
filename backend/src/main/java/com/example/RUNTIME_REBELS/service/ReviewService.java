package com.example.RUNTIME_REBELS.service;

import com.example.RUNTIME_REBELS.model.BookingStatus;
import com.example.RUNTIME_REBELS.model.Hotels;
import com.example.RUNTIME_REBELS.model.Review;
import com.example.RUNTIME_REBELS.model.Users;
import com.example.RUNTIME_REBELS.repository.BookingRepo;
import com.example.RUNTIME_REBELS.repository.HotelRepository;
import com.example.RUNTIME_REBELS.repository.ReviewRepository;
import com.example.RUNTIME_REBELS.repository.UserRepo;
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

    @Autowired
    private BookingRepo bookingRepo;

    public List<Review> getReviewsByHotel(Long hotelId) {
        return reviewRepository.findByHotel_HotelId(hotelId);
    }

    public Review addReview(Long hotelId, Review review, String username) {
        Users user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Hotels hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        // Check if user has a confirmed booking for this hotel
        boolean hasBooking = !bookingRepo.findByRoom_Hotel_HotelIdAndUserAndStatus(hotelId, user, BookingStatus.CONFIRMED).isEmpty();
        if (!hasBooking) {
            throw new RuntimeException("Review denied: No confirmed booking found for this hotel.");
        }

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
