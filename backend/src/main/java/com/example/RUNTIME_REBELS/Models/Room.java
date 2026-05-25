package com.example.RUNTIME_REBELS.Models;

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
    private Long Room_Id;

    @Column(nullable = false)
    private String Room_Type;

    @Column(nullable = false)
    private double Price_Per_Night;

    @Column(nullable = false)
    private boolean Availability;

    @ManyToOne
    @JoinColumn(name = "Hotel_Id", nullable = false)
    private Hotels hotel;
}