package com.example.RUNTIME_REBELS.Service;

import com.example.RUNTIME_REBELS.Models.Bookings;
import com.example.RUNTIME_REBELS.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Bookings> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Bookings> getBookingsByUserId(Long userId) {
        // This might need adjustment based on how the repository method is named
        return bookingRepository.findByUserId(userId);
    }

    public Bookings createBooking(Bookings booking) {
        booking.setBooking_time(LocalDateTime.now());
        booking.setBooking_Status("CONFIRMED");
        return bookingRepository.save(booking);
    }

    public Bookings extendStay(Long bookingId, String newCheckOutDate, double additionalPrice) {
        Bookings booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setCheck_Out_Date(newCheckOutDate);
        booking.setTotal_Price(booking.getTotal_Price() + additionalPrice);
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long bookingId) {
        Bookings booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setBooking_Status("CANCELLED");
        bookingRepository.save(booking);
    }
}
