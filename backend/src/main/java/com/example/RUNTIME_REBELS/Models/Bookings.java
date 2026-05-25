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
@Table(name = "bookings")

public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Booking_Id;

    @ManyToOne
    @JoinColumn(name = "User_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "Room_Id", nullable = false)
    private Room room;

    @Column(nullable = false)
    private String Check_In_Date;

    private String Check_Out_Date;

    private double Total_Price;

    private String Booking_Status;

    private double price_per_night;

    private LocalDateTime booking_time;


}