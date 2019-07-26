export interface RoomDetail {
  id: number;
  title: string;
  host: string;
  address: string;
  state: number;
  postal_code: string;
  mobile: number;
  image: string;
  images: number;
  total_rating: number;
  capacity: number;
  space: string;
  room_type: string;
  bedroom: number;
  bath_type: string;
  bathroom: number;
  cancellation: string;
  min_stay: number;
  max_stay: number;
  description: string;
  price: number;
  facilities: string[];
  reservations: string[][];
  updated_at: string;
  created_at: string;
  label?: string;
}
