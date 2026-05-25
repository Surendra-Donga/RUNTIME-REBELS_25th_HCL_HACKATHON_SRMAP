package com.example.RUNTIME_REBELS.controller;

import com.example.RUNTIME_REBELS.dto.LoginRequestDTO;
import com.example.RUNTIME_REBELS.dto.LoginResponseDTO;
import com.example.RUNTIME_REBELS.dto.UserRegistrationDTO;
import com.example.RUNTIME_REBELS.dto.UserResponseDTO;
import com.example.RUNTIME_REBELS.service.AuthService;
import com.example.RUNTIME_REBELS.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDTO>> register(@RequestBody UserRegistrationDTO registrationDTO) {
        UserResponseDTO registeredUser = authService.register(registrationDTO);
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", registeredUser));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDTO>> login(@RequestBody LoginRequestDTO loginRequest) {
        LoginResponseDTO loginResponse = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (loginResponse == null) {
            return ResponseEntity.status(401).body(ApiResponse.error(401, "Invalid username or password"));
        }
        return ResponseEntity.ok(ApiResponse.success("Login successful", loginResponse));
    }
}
