package com.example.RUNTIME_REBELS.dto;

import com.example.RUNTIME_REBELS.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    private String token;
    private String username;
    private Role role;
}
