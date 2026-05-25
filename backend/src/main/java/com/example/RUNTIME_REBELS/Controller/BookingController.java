package com.example.RUNTIME_REBELS.Controller;

import com.example.RUNTIME_REBELS.Models.Bookings;
import com.example.RUNTIME_REBELS.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Bookings> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/user/{userId}")
    public List<Bookings> getBookingsByUser(@PathVariable Long userId) {
        return bookingService.getBookingsByUserId(userId);
    }

    @PostMapping
    public Bookings createBooking(@RequestBody Bookings booking) {
        return bookingService.createBooking(booking);
    }

    @PutMapping("/{id}/extend")
    public Bookings extendStay(@PathVariable Long id, @RequestBody Map<String, Object> extensionDetails) {
        String newCheckOutDate = (String) extensionDetails.get("newCheckOutDate");
        double additionalPrice = Double.parseDouble(extensionDetails.get("additionalPrice").toString());
        return bookingService.extendStay(id, newCheckOutDate, additionalPrice);
    }

    @DeleteMapping("/{id}/cancel")
    public void cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
    }
}
