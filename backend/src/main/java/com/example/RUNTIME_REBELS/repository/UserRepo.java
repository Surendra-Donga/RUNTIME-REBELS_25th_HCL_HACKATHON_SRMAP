package com.example.RUNTIME_REBELS.repository;

import com.example.RUNTIME_REBELS.model.Role;
import com.example.RUNTIME_REBELS.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface UserRepo extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
    List<Users> findByRole(Role role);
}
