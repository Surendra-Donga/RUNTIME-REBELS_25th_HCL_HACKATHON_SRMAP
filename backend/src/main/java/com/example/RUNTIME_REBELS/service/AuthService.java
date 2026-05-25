package com.example.RUNTIME_REBELS.service;

import com.example.RUNTIME_REBELS.model.Role;
import com.example.RUNTIME_REBELS.model.Users;
import com.example.RUNTIME_REBELS.repository.UserRepo;
import com.example.RUNTIME_REBELS.dto.UserRegistrationDTO;
import com.example.RUNTIME_REBELS.dto.UserResponseDTO;
import com.example.RUNTIME_REBELS.dto.LoginResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    public UserResponseDTO register(UserRegistrationDTO registrationDTO) {
        Users user = new Users();
        user.setUsername(registrationDTO.getUsername());
        user.setPassword(encoder.encode(registrationDTO.getPassword()));

        user.setEmail(registrationDTO.getEmail() != null ? registrationDTO.getEmail() : registrationDTO.getUsername() + "@example.com");
        user.setAge(registrationDTO.getAge() > 0 ? registrationDTO.getAge() : 18);
        
        Role userRole = Role.USER;
        if (registrationDTO.getRole() != null) {
            String roleStr = registrationDTO.getRole().trim().toUpperCase();
            try {
                userRole = Role.valueOf(roleStr);
            } catch (IllegalArgumentException e) {
                userRole = Role.USER;
            }
        }
        user.setRole(userRole);

        user.setCreatedAt(LocalDateTime.now());
        user.setEnabled(true);

        System.out.println("DEBUG: Registering user: " + user.getUsername() + " with role: " + user.getRole());
        Users savedUser = userRepo.save(user);

        return new UserResponseDTO(
            savedUser.getUserId(),
            savedUser.getUsername(),
            savedUser.getEmail(),
            savedUser.getAge(),
            savedUser.getRole(),
            savedUser.getCreatedAt()
        );
    }

    public LoginResponseDTO login(String username, String password) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        if (authentication.isAuthenticated()) {
            Users user = userRepo.findByUsername(username).orElseThrow();
            String token = jwtService.generateToken(username);
            return new LoginResponseDTO(token, user.getUsername(), user.getRole());
        }
        return null;
    }
}
