package com.example.RUNTIME_REBELS.controller;

import com.example.RUNTIME_REBELS.model.Booking;
import com.example.RUNTIME_REBELS.service.BookingService;
import com.example.RUNTIME_REBELS.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
