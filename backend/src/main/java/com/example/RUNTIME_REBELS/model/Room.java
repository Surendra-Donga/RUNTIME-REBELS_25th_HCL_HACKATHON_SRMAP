package com.example.RUNTIME_REBELS.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(nullable = false)
    private String roomType;

    @Column(nullable = false)
    private double pricePerNight;

    @Column(nullable = false)
    private boolean availability;

    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotels hotel;
}