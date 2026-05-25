package com.example.RUNTIME_REBELS.controller;

import com.example.RUNTIME_REBELS.model.Users;
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
    public ResponseEntity<ApiResponse<Users>> register(@RequestBody Users user) {
        Users registeredUser = authService.register(user);
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", registeredUser));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@RequestBody Users user) {
        String token = authService.verify(user);
        if (token.equals("Login Fail")) {
            return ResponseEntity.status(401).body(ApiResponse.error(401, "Invalid username or password"));
        }
        return ResponseEntity.ok(ApiResponse.success("Login successful", token));
    }
}
