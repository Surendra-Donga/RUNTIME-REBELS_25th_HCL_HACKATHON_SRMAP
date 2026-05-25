import { apiFetch } from './api';

export const roomService = {
  getAllRooms: async () => {
    return apiFetch('/rooms');
  },

  getRoomsByHotel: async (hotelId: number) => {
    return apiFetch(`/rooms/hotel/${hotelId}`);
  },

  getAvailableRooms: async () => {
    return apiFetch('/rooms/available');
  },

  addRoom: async (roomData: any) => {
    return apiFetch('/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData),
    });
  },

  updateRoom: async (id: number, roomData: any) => {
    return apiFetch(`/rooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(roomData),
    });
  },

  deleteRoom: async (id: number) => {
    return apiFetch(`/rooms/${id}`, {
      method: 'DELETE',
    });
  }
};
