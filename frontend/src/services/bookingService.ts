import { apiFetch } from './api';

export const bookingService = {
  createBooking: async (bookingData: any) => {
    return apiFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  getUserBookings: async (userId: number) => {
    return apiFetch(`/bookings/user/${userId}`);
  },

  extendStay: async (bookingId: number, newCheckOutDate: string, additionalPrice: number) => {
    return apiFetch(`/bookings/${bookingId}/extend`, {
      method: 'PUT',
      body: JSON.stringify({ newCheckOutDate, additionalPrice }),
    });
  },

  cancelBooking: async (bookingId: number) => {
    return apiFetch(`/bookings/${bookingId}/cancel`, {
      method: 'DELETE',
    });
  }
};
