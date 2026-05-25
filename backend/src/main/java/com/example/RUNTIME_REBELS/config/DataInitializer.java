package com.example.RUNTIME_REBELS.config;

import com.example.RUNTIME_REBELS.model.Role;
import com.example.RUNTIME_REBELS.model.Users;
import com.example.RUNTIME_REBELS.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        userRepo.findByUsername("admin").ifPresent(user -> userRepo.delete(user));
        
        Users admin = new Users();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setEmail("admin@runtimerebels.com");
        admin.setRole(Role.ADMIN);
        admin.setAge(30);
        admin.setEnabled(true);
        admin.setCreatedAt(LocalDateTime.now());
        userRepo.save(admin);
        System.out.println("DEBUG: Default Admin user (re)created: admin / admin123");
    }
}
