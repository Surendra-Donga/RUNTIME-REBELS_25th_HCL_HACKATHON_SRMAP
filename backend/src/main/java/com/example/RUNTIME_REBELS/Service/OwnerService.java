package com.example.RUNTIME_REBELS.Service;

import com.example.RUNTIME_REBELS.Models.Hotels;
import com.example.RUNTIME_REBELS.Models.Users;
import com.example.RUNTIME_REBELS.Repository.HotelRepository;
import com.example.RUNTIME_REBELS.Repository.UserRepo;
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
