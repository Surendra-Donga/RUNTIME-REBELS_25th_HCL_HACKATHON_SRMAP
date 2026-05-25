package com.example.RUNTIME_REBELS.service;

import com.example.RUNTIME_REBELS.model.Booking;
import com.example.RUNTIME_REBELS.model.BookingStatus;
import com.example.RUNTIME_REBELS.model.Room;
import com.example.RUNTIME_REBELS.model.Users;
import com.example.RUNTIME_REBELS.repository.BookingRepo;
import com.example.RUNTIME_REBELS.repository.RoomRepository;
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
    private RoomRepository roomRepository;

    public Booking createBooking(Booking booking) {
        log.info("Initiating booking for room: {}", booking.getRoom().getRoomId());
        
        Room room = roomRepository.findById(booking.getRoom().getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));
        
        if (!room.isAvailability()) {
            throw new RuntimeException("Room is already booked");
        }

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        
        booking.setUser(user);
        booking.setRoom(room);
        booking.setCreatedAt(LocalDateTime.now());
        booking.setStatus(BookingStatus.CONFIRMED);

        long days = ChronoUnit.DAYS.between(booking.getCheckIn(), booking.getCheckOut());
        if (days <= 0) days = 1;
        booking.setTotalPrice(room.getPricePerNight() * days);

        // Update room availability
        room.setAvailability(false);
        roomRepository.save(room);

        Booking savedBooking = bookingRepo.save(booking);

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
        
        // If booking is cancelled, make room available again
        if (status == BookingStatus.CANCELLED) {
            Room room = booking.getRoom();
            room.setAvailability(true);
            roomRepository.save(room);
        }
        
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
        
        Room room = booking.getRoom();
        room.setAvailability(true);
        roomRepository.save(room);
        
        bookingRepo.save(booking);
    }
}
