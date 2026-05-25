package com.example.RUNTIME_REBELS.repository;

import com.example.RUNTIME_REBELS.model.Booking;
import com.example.RUNTIME_REBELS.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {
    Optional<Payment> findByBooking(Booking booking);
}
