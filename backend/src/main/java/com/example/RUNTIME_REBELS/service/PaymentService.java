package com.example.RUNTIME_REBELS.service;

import com.example.RUNTIME_REBELS.model.Booking;
import com.example.RUNTIME_REBELS.model.BookingStatus;
import com.example.RUNTIME_REBELS.model.Payment;
import com.example.RUNTIME_REBELS.model.PaymentStatus;
import com.example.RUNTIME_REBELS.repository.BookingRepo;
import com.example.RUNTIME_REBELS.repository.PaymentRepo;
import com.example.RUNTIME_REBELS.service.BookingService;
import com.example.RUNTIME_REBELS.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
public class PaymentService {

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private EmailService emailService;

    public Payment processPayment(Long bookingId, String method) {
        log.info("Processing payment for booking ID: {} via {}", bookingId, method);
        Booking booking = bookingRepo.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        
        if (booking.getStatus() == BookingStatus.CONFIRMED) {
            throw new RuntimeException("Booking already confirmed");
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(booking.getTotalPrice());
        payment.setPaymentMethod(method);
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setCreatedAt(LocalDateTime.now());
        payment.setStatus(PaymentStatus.COMPLETED); // Mocking successful payment

        Payment savedPayment = paymentRepo.save(payment);

        // Update booking status
        bookingService.updateStatus(bookingId, BookingStatus.CONFIRMED);

        // Send confirmation email
        emailService.sendEmail(booking.getUser().getEmail(), "Booking Confirmed", 
            "Your payment of " + payment.getAmount() + " was successful. Your booking is now confirmed!");

        return savedPayment;
    }
}
