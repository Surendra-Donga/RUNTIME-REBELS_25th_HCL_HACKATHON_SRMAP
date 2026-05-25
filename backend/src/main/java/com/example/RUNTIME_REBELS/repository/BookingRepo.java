package com.example.RUNTIME_REBELS.repository;

import com.example.RUNTIME_REBELS.model.Booking;
import com.example.RUNTIME_REBELS.model.BookingStatus;
import com.example.RUNTIME_REBELS.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(Users user);
    List<Booking> findByRoom_Hotel_Owner_UsernameAndStatus(String username, BookingStatus status);
    List<Booking> findByRoom_Hotel_HotelIdAndUserAndStatus(Long hotelId, Users user, BookingStatus status);
}
