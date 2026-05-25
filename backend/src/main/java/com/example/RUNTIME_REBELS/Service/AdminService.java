package com.example.RUNTIME_REBELS.Service;

import com.example.RUNTIME_REBELS.Models.Hotels;
import com.example.RUNTIME_REBELS.Models.Users;
import com.example.RUNTIME_REBELS.Models.Role;
import com.example.RUNTIME_REBELS.Repository.HotelRepository;
import com.example.RUNTIME_REBELS.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepo userRepo;

    public List<Hotels> getPendingHotels() {
        return hotelRepository.findByApprovedFalse();
    }

    public Hotels approveHotel(Long id) {
        Hotels hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotel.setApproved(true);
        return hotelRepository.save(hotel);
    }

    public void rejectHotel(Long id) {
        hotelRepository.deleteById(id);
    }

    public List<Users> getAllUsers() {
        return userRepo.findAll().stream()
                .filter(u -> u.getRole() == Role.USER)
                .collect(Collectors.toList());
    }

    public List<Users> getAllOwners() {
        return userRepo.findAll().stream()
                .filter(u -> u.getRole() == Role.OWNER)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
}
