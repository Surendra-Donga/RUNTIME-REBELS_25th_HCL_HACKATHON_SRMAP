package com.example.RUNTIME_REBELS.Controller;

import com.example.RUNTIME_REBELS.Models.Hotels;
import com.example.RUNTIME_REBELS.Service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/owner")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @GetMapping("/my-hotels")
    public List<Hotels> getMyHotels(Principal principal) {
        return ownerService.getHotelsByOwner(principal.getName());
    }

    @PostMapping("/add-hotel")
    public ResponseEntity<Hotels> addHotel(@RequestBody Hotels hotel, Principal principal) {
        return ResponseEntity.ok(ownerService.addHotel(hotel, principal.getName()));
    }
}
