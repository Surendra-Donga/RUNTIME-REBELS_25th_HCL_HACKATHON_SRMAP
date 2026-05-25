package com.example.RUNTIME_REBELS.service;

import com.example.RUNTIME_REBELS.model.Hotels;
import com.example.RUNTIME_REBELS.model.Users;
import com.example.RUNTIME_REBELS.repository.HotelRepository;
import com.example.RUNTIME_REBELS.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OwnerService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepo userRepo;

    public List<Hotels> getHotelsByOwner(String username) {
        return hotelRepository.findByOwner_Username(username);
    }

    public Hotels addHotel(Hotels hotel, String username) {
        Users owner = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        hotel.setOwner(owner);
        hotel.setApproved(false); // Must be approved by admin
        hotel.setCreatedAt(LocalDateTime.now());
        return hotelRepository.save(hotel);
    }
}
