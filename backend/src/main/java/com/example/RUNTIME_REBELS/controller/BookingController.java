package com.example.RUNTIME_REBELS.controller;

import com.example.RUNTIME_REBELS.model.Booking;
import com.example.RUNTIME_REBELS.service.BookingService;
import com.example.RUNTIME_REBELS.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Booking>> createBooking(@RequestBody Booking booking) {
        Booking createdBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(ApiResponse.success("Booking created successfully", createdBooking));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<Booking>>> getMyBookings() {
        List<Booking> bookings = bookingService.getMyBookings();
        return ResponseEntity.ok(ApiResponse.success("Bookings retrieved successfully", bookings));
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingService.getBookingsByUserId(userId);
    }

    @PutMapping("/{id}/extend")
    public Booking extendStay(@PathVariable Long id, @RequestBody Map<String, Object> extensionDetails) {
        LocalDate newCheckOutDate = LocalDate.parse((String) extensionDetails.get("newCheckOutDate"));
        double additionalPrice = Double.parseDouble(extensionDetails.get("additionalPrice").toString());
        return bookingService.extendStay(id, newCheckOutDate, additionalPrice);
    }

    @DeleteMapping("/{id}/cancel")
    public void cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
    }
}
