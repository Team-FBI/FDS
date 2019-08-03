export interface MessageList {
  id: string;
  start_date: string;
  end_date: string;
  room: MessagesMessage;
  messages: MessageRoom;
}

export interface MessagesMessage {
  author: MessageAuthor;
  created: string;
  is_host: boolean;
  test: string;
}

export interface MessageAuthor {
  id: string;
  image: string;
  username: string;
}

export interface MessageRoom {
  host: MessageHost;
  id: string;
  price: number;
  title: string;
}

export interface MessageHost {
  id: string;
  image: string;
  username: string;
}
