package com.example.RUNTIME_REBELS.service;

import com.example.RUNTIME_REBELS.model.Hotels;
import com.example.RUNTIME_REBELS.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private HotelRepository hotelRepository;

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
}
