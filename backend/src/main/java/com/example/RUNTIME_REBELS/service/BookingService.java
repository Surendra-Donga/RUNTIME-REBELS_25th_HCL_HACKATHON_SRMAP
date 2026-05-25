package com.example.RUNTIME_REBELS.service;

import com.example.RUNTIME_REBELS.model.Booking;
import com.example.RUNTIME_REBELS.model.BookingStatus;
import com.example.RUNTIME_REBELS.model.Users;
import com.example.RUNTIME_REBELS.repository.BookingRepo;
import com.example.RUNTIME_REBELS.repository.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
        booking.setStatus(BookingStatus.CONFIRMED);

        long days = ChronoUnit.DAYS.between(booking.getCheckIn(), booking.getCheckOut());
        if (days <= 0) days = 1;
        booking.setTotalPrice(booking.getRoom().getPricePerNight() * days);

        Booking savedBooking = bookingRepo.save(booking);

        // Send confirmation email
        try {
            emailService.sendEmail(user.getEmail(), "Booking Confirmed", 
                "Your booking for " + booking.getRoom().getRoomType() + " at " + 
                booking.getRoom().getHotel().getHotelName() + " is confirmed.");
        } catch (Exception e) {
            log.error("Failed to send email: {}", e.getMessage());
        }

        return savedBooking;
    }

    public List<Booking> getMyBookings() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepo.findByUser(user);
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        Users user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepo.findByUser(user);
    }

    public Booking updateStatus(Long bookingId, BookingStatus status) {
        Booking booking = bookingRepo.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        return bookingRepo.save(booking);
    }

    public Booking extendStay(Long bookingId, LocalDate newCheckOutDate, double additionalPrice) {
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setCheckOut(newCheckOutDate);
        booking.setTotalPrice(booking.getTotalPrice() + additionalPrice);
        return bookingRepo.save(booking);
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepo.save(booking);
    }
}
