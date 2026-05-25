package com.example.RUNTIME_REBELS.Repository;

import com.example.RUNTIME_REBELS.Models.Hotels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotels, Long> {
    List<Hotels> findByLocationContainingIgnoreCase(String location);
    List<Hotels> findByOwner_Username(String username);
    List<Hotels> findByApprovedFalse();
    List<Hotels> findByApprovedTrue();
}
