package com.example.RUNTIME_REBELS.repository;

import com.example.RUNTIME_REBELS.model.Booking;
import com.example.RUNTIME_REBELS.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(Users user);
}
