import { apiFetch } from './api';

export const hotelService = {
  getAllHotels: async () => {
    return apiFetch('/hotels');
  },

  getHotelById: async (id: number) => {
    return apiFetch(`/hotels/${id}`);
  },

  searchHotels: async (location: string) => {
    return apiFetch(`/hotels/search?location=${location}`);
  },

  addHotel: async (hotelData: any) => {
    return apiFetch('/owner/add-hotel', {
      method: 'POST',
      body: JSON.stringify(hotelData),
    });
  },

  getMyHotels: async () => {
    return apiFetch('/owner/my-hotels');
  },

  updateHotel: async (id: number, hotelData: any) => {
    return apiFetch(`/hotels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hotelData),
    });
  },

  deleteHotel: async (id: number) => {
    return apiFetch(`/hotels/${id}`, {
      method: 'DELETE',
    });
  }
};
