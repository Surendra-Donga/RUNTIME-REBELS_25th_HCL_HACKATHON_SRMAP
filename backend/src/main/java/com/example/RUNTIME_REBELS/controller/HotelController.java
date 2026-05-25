package com.example.RUNTIME_REBELS.controller;

import com.example.RUNTIME_REBELS.model.Hotels;
import com.example.RUNTIME_REBELS.service.HotelService;
import com.example.RUNTIME_REBELS.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Hotels>>> getAllHotels() {
        List<Hotels> hotels = hotelService.getAllHotels();
        return ResponseEntity.ok(ApiResponse.success("Hotels retrieved successfully", hotels));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Hotels>> getHotelById(@PathVariable Long id) {
        return hotelService.getHotelById(id)
                .map(hotel -> ResponseEntity.ok(ApiResponse.success("Hotel retrieved successfully", hotel)))
                .orElse(ResponseEntity.status(404).body(ApiResponse.error(404, "Hotel not found")));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Hotels>>> searchHotels(@RequestParam String location) {
        List<Hotels> hotels = hotelService.searchHotelsByLocation(location);
        return ResponseEntity.ok(ApiResponse.success("Hotels retrieved successfully", hotels));
    }

    @GetMapping("/advanced-search")
    public ResponseEntity<ApiResponse<List<Hotels>>> advancedSearch(@RequestParam(required = false) String location,
                                       @RequestParam(required = false) Double minPrice,
                                       @RequestParam(required = false) Double maxPrice,
                                       @RequestParam(required = false) String amenity) {
        List<Hotels> hotels = hotelService.searchAdvanced(location, minPrice, maxPrice, amenity);
        return ResponseEntity.ok(ApiResponse.success("Hotels retrieved successfully", hotels));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Hotels>> addHotel(@RequestBody Hotels hotel) {
        Hotels savedHotel = hotelService.addHotel(hotel);
        return ResponseEntity.ok(ApiResponse.success("Hotel added successfully", savedHotel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Hotels>> updateHotel(@PathVariable Long id, @RequestBody Hotels hotelDetails) {
        try {
            Hotels updatedHotel = hotelService.updateHotel(id, hotelDetails);
            return ResponseEntity.ok(ApiResponse.success("Hotel updated successfully", updatedHotel));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(ApiResponse.error(404, "Hotel not found"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        return ResponseEntity.ok(ApiResponse.success("Hotel deleted successfully", null));
    }
}
