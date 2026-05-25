package com.example.RUNTIME_REBELS.repository;

import com.example.RUNTIME_REBELS.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByHotel_HotelId(Long hotelId);
}
