package com.example.RUNTIME_REBELS.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "hotels")
public class Hotels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Hotel_Id;

    @Column(nullable = false)
    private String Hotel_Name;

    @Column(nullable = false)
    private String Location;

    @Column(length = 1000)
    private String Description;

    @Column(nullable = false)
    private int Rating;

    @Column(nullable = false)
    private String Amenities;
    
    @Column(nullable = false)
    private LocalDateTime Created_At;

}