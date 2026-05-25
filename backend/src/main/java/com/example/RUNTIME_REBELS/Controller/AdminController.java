package com.example.RUNTIME_REBELS.Controller;

import com.example.RUNTIME_REBELS.Models.Hotels;
import com.example.RUNTIME_REBELS.Models.Users;
import com.example.RUNTIME_REBELS.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/pending-hotels")
    public List<Hotels> getPendingHotels() {
        return adminService.getPendingHotels();
    }

    @PostMapping("/approve-hotel/{id}")
    public ResponseEntity<Hotels> approveHotel(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.approveHotel(id));
    }

    @DeleteMapping("/reject-hotel/{id}")
    public ResponseEntity<Void> rejectHotel(@PathVariable Long id) {
        adminService.rejectHotel(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/users")
    public List<Users> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/owners")
    public List<Users> getAllOwners() {
        return adminService.getAllOwners();
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
