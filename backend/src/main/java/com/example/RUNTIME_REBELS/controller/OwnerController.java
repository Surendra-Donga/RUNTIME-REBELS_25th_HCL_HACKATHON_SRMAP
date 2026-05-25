package com.example.RUNTIME_REBELS.controller;

import com.example.RUNTIME_REBELS.model.Hotels;
import com.example.RUNTIME_REBELS.service.OwnerService;
import com.example.RUNTIME_REBELS.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/owner")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @GetMapping("/my-hotels")
    public ResponseEntity<ApiResponse<List<Hotels>>> getMyHotels(Principal principal) {
        List<Hotels> hotels = ownerService.getHotelsByOwner(principal.getName());
        return ResponseEntity.ok(ApiResponse.success("Hotels retrieved successfully", hotels));
    }

    @GetMapping("/analytics/earnings")
    public ResponseEntity<ApiResponse<Double>> getEarnings(Principal principal) {
        double earnings = ownerService.getEarningsAnalytics(principal.getName());
        return ResponseEntity.ok(ApiResponse.success("Earnings retrieved successfully", earnings));
    }

    @PostMapping("/add-hotel")
    public ResponseEntity<ApiResponse<Hotels>> addHotel(@RequestBody Hotels hotel, Principal principal) {
        Hotels savedHotel = ownerService.addHotel(hotel, principal.getName());
        return ResponseEntity.ok(ApiResponse.success("Hotel submitted successfully and is pending approval", savedHotel));
    }
}
