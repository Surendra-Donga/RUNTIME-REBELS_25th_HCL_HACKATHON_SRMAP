package com.example.RUNTIME_REBELS.Repository;

import com.example.RUNTIME_REBELS.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserRepo extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
}