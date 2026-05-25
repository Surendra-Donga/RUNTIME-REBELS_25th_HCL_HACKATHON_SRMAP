package com.example.RUNTIME_REBELS.Controller;

import com.example.RUNTIME_REBELS.Models.Users;
import com.example.RUNTIME_REBELS.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Users register(@RequestBody Users user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user) {
        return authService.verify(user);
    }
}
