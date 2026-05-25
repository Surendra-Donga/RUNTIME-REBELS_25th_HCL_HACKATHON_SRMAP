package com.example.RUNTIME_REBELS.service;

import com.example.RUNTIME_REBELS.model.Booking;
import com.example.RUNTIME_REBELS.model.BookingStatus;
import com.example.RUNTIME_REBELS.model.Users;
import com.example.RUNTIME_REBELS.repository.BookingRepo;
import com.example.RUNTIME_REBELS.repository.UserRepo;
import com.example.RUNTIME_REBELS.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@Slf4j
public class BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EmailService emailService;

    public Booking createBooking(Booking booking) {
        log.info("Initiating booking for room: {}", booking.getRoom().getRoomId());
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        
        booking.setUser(user);
        booking.setCreatedAt(LocalDateTime.now());
        booking.setStatus(BookingStatus.PENDING);

        long days = ChronoUnit.DAYS.between(booking.getCheckIn(), booking.getCheckOut());
        if (days <= 0) days = 1;
        booking.setTotalPrice(booking.getRoom().getPricePerNight() * days);

        Booking savedBooking = bookingRepo.save(booking);

        // Send confirmation email
        emailService.sendEmail(user.getEmail(), "Booking Initiated", 
            "Your booking for " + booking.getRoom().getRoomType() + " at " + 
            booking.getRoom().getHotel().getHotelName() + " is initiated. Please complete the payment.");

        return savedBooking;
    }

    public List<Booking> getMyBookings() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepo.findByUser(user);
    }

    public Booking updateStatus(Long bookingId, BookingStatus status) {
        Booking booking = bookingRepo.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        return bookingRepo.save(booking);
    }
}
