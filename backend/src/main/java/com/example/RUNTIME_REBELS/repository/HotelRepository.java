package com.example.RUNTIME_REBELS.repository;

import com.example.RUNTIME_REBELS.model.Hotels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotels, Long> {
    List<Hotels> findByLocationContainingIgnoreCase(String location);
    List<Hotels> findByOwner_Username(String username);
    List<Hotels> findByApprovedFalse();
    List<Hotels> findByApprovedTrue();

    @Query("SELECT DISTINCT h FROM Hotels h LEFT JOIN h.rooms r WHERE " +
           "(LOWER(h.location) LIKE LOWER(CONCAT('%', :location, '%')) OR :location IS NULL) AND " +
           "(r.pricePerNight >= :minPrice OR :minPrice IS NULL) AND " +
           "(r.pricePerNight <= :maxPrice OR :maxPrice IS NULL) AND " +
           "(LOWER(h.amenities) LIKE LOWER(CONCAT('%', :amenity, '%')) OR :amenity IS NULL) AND " +
           "h.approved = true")
    List<Hotels> findAdvanced(@Param("location") String location, 
                              @Param("minPrice") Double minPrice, 
                              @Param("maxPrice") Double maxPrice, 
                              @Param("amenity") String amenity);
}
