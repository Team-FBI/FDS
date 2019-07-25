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
  price: number;
  description: string;
  room_type: string;
  space: string;
  total_rating: number;
  bedroom: number;
  capacity: number;
  bath_type: string;
}
