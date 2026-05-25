package com.example.RUNTIME_REBELS.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "hotels")
public class Hotels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hotelId;

    @Column(nullable = false)
    private String hotelName;

    @Column(nullable = false)
    private String location;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private String amenities;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Users owner;

    @Column(nullable = false)
    private boolean approved = false;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Prevent infinite recursion during JSON serialization
    private List<Room> rooms;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}
