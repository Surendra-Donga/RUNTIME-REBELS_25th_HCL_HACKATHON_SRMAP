package com.example.RUNTIME_REBELS.dto;

import com.example.RUNTIME_REBELS.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private Long userId;
    private String username;
    private String email;
    private int age;
    private Role role;
    private LocalDateTime createdAt;
}
