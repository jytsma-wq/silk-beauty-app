import axios from 'axios';
import { salonInfo } from '../data/salon';
import { buildBookingPayload, type BookedSlot, type BookingFormValues } from '../utils/booking';

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || salonInfo.siteUrl;

interface BookingResponse {
  bookedSlots?: BookedSlot[];
  slots?: BookedSlot[];
  bookings?: BookedSlot[];
  message?: string;
}

export async function fetchBookedSlots(date: string): Promise<BookedSlot[]> {
  const response = await axios.get<BookingResponse>(`${baseUrl}/api/bookings`, {
    params: { date },
    timeout: 10000,
  });

  return response.data.bookedSlots || response.data.slots || response.data.bookings || [];
}

export async function createBooking(values: BookingFormValues) {
  const response = await axios.post(`${baseUrl}/api/bookings`, buildBookingPayload(values), {
    timeout: 10000,
  });
  return response.data;
}
