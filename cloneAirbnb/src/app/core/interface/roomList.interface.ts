export interface RoomList {
  count: number;
  next: string;
  previous: string;
  results: Array<Result>;
}

export interface Result {
  id: number;
  host: string;
  title: string;
  image: string;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  price: number;
  description: string;
  room_type: string;
  space: string;
  total_rating: number;
  bedroom: number;
  capacity: number;
  bath_type: string;
  address: string;
  images: number;
  reservations: number;
  state: string;
  label: string;
}
