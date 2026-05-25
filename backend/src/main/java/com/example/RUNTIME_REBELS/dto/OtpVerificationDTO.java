package com.example.RUNTIME_REBELS.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpVerificationDTO {
    private String username;
    private String otp;
}
