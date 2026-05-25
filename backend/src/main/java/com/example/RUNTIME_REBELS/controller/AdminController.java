package com.example.RUNTIME_REBELS.controller;

import com.example.RUNTIME_REBELS.model.Hotels;
import com.example.RUNTIME_REBELS.model.Role;
import com.example.RUNTIME_REBELS.model.Users;
import com.example.RUNTIME_REBELS.service.AdminService;
import com.example.RUNTIME_REBELS.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<Users>>> getAllUsers(@RequestParam(required = false) Role role) {
        List<Users> users = adminService.getAllUsers(role);
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<ApiResponse<Users>> updateUserRole(@PathVariable Long userId, @RequestParam Role role) {
        Users updatedUser = adminService.updateUserRole(userId, role);
        return ResponseEntity.ok(ApiResponse.success("User role updated successfully", updatedUser));
    }

    @PutMapping("/users/{userId}/toggle-status")
    public ResponseEntity<ApiResponse<Users>> toggleUserStatus(@PathVariable Long userId) {
        Users updatedUser = adminService.toggleUserStatus(userId);
        return ResponseEntity.ok(ApiResponse.success("User status toggled successfully", updatedUser));
    }

    @GetMapping("/pending-hotels")
    public ResponseEntity<ApiResponse<List<Hotels>>> getPendingHotels() {
        List<Hotels> hotels = adminService.getPendingHotels();
        return ResponseEntity.ok(ApiResponse.success("Pending hotels retrieved successfully", hotels));
    }

    @PostMapping("/approve-hotel/{id}")
    public ResponseEntity<ApiResponse<Hotels>> approveHotel(@PathVariable Long id) {
        Hotels approvedHotel = adminService.approveHotel(id);
        return ResponseEntity.ok(ApiResponse.success("Hotel approved successfully", approvedHotel));
    }

    @DeleteMapping("/reject-hotel/{id}")
    public ResponseEntity<ApiResponse<Void>> rejectHotel(@PathVariable Long id) {
        adminService.rejectHotel(id);
        return ResponseEntity.ok(ApiResponse.success("Hotel rejected successfully", null));
    }

    @GetMapping("/owners")
    public ResponseEntity<ApiResponse<List<Users>>> getAllOwners() {
        List<Users> owners = adminService.getAllOwners();
        return ResponseEntity.ok(ApiResponse.success("Owners retrieved successfully", owners));
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", null));
    }
}
