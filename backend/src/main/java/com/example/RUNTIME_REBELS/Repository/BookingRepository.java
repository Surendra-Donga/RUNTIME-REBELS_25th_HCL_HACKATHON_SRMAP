package com.example.RUNTIME_REBELS.Repository;

import com.example.RUNTIME_REBELS.Models.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Bookings, Long> {
    List<Bookings> findByUserId(Long userId);
}
