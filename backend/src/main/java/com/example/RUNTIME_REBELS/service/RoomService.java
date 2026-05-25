package com.example.RUNTIME_REBELS.service;

import com.example.RUNTIME_REBELS.model.Room;
import com.example.RUNTIME_REBELS.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotel_HotelId(hotelId);
    }

    public List<Room> getRoomsByOwner(String username) {
        // Fetch all rooms for all hotels owned by this user
        return roomRepository.findAll().stream()
                .filter(room -> room.getHotel() != null && 
                                room.getHotel().getOwner() != null && 
                                room.getHotel().getOwner().getUsername().equals(username))
                .toList();
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByAvailabilityTrue();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room roomDetails) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));

        if (roomDetails.getRoomType() != null) room.setRoomType(roomDetails.getRoomType());
        if (roomDetails.getPricePerNight() > 0) room.setPricePerNight(roomDetails.getPricePerNight());
        room.setAvailability(roomDetails.isAvailability());
        
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
