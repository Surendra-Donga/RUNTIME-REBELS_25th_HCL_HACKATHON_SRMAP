package com.example.RUNTIME_REBELS.controller;

import com.example.RUNTIME_REBELS.model.Payment;
import com.example.RUNTIME_REBELS.service.PaymentService;
import com.example.RUNTIME_REBELS.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/process/{bookingId}")
    public ResponseEntity<ApiResponse<Payment>> processPayment(@PathVariable Long bookingId, @RequestParam String method) {
        Payment payment = paymentService.processPayment(bookingId, method);
        return ResponseEntity.ok(ApiResponse.success("Payment processed successfully", payment));
    }
}
