package com.example.RUNTIME_REBELS.service;

import com.example.RUNTIME_REBELS.model.Hotels;
import com.example.RUNTIME_REBELS.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public List<Hotels> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Optional<Hotels> getHotelById(Long id) {
        return hotelRepository.findById(id);
    }

    public List<Hotels> searchHotelsByLocation(String location) {
        return hotelRepository.findByLocationContainingIgnoreCase(location);
    }

    public List<Hotels> searchAdvanced(String location, Double minPrice, Double maxPrice, String amenity) {
        return hotelRepository.findAdvanced(location, minPrice, maxPrice, amenity);
    }

    public Hotels addHotel(Hotels hotel) {
        hotel.setCreatedAt(LocalDateTime.now());
        return hotelRepository.save(hotel);
    }

    public Hotels updateHotel(Long id, Hotels hotelDetails) {
        Hotels hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + id));

        hotel.setHotelName(hotelDetails.getHotelName());
        hotel.setLocation(hotelDetails.getLocation());
        hotel.setDescription(hotelDetails.getDescription());
        hotel.setRating(hotelDetails.getRating());
        hotel.setAmenities(hotelDetails.getAmenities());

        return hotelRepository.save(hotel);
    }

    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}
