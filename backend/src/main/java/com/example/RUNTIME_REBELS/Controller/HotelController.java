package com.example.RUNTIME_REBELS.Controller;

import com.example.RUNTIME_REBELS.Models.Hotels;
import com.example.RUNTIME_REBELS.Service.HotelService;
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
    public List<Hotels> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotels> getHotelById(@PathVariable Long id) {
        return hotelService.getHotelById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Hotels> searchHotels(@RequestParam String location) {
        return hotelService.searchHotelsByLocation(location);
    }

    @PostMapping
    public Hotels addHotel(@RequestBody Hotels hotel) {
        return hotelService.addHotel(hotel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotels> updateHotel(@PathVariable Long id, @RequestBody Hotels hotelDetails) {
        try {
            return ResponseEntity.ok(hotelService.updateHotel(id, hotelDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        return ResponseEntity.noContent().build();
    }
}
