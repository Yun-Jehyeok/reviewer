import { userIFC } from './userIFC';

export interface applicationIFC {
  _id: string;
  reviewerId: userIFC;
  applicantId: userIFC;
  postId: string;
  status: string;
  register_date: string;
  chatRoom: string;
  review?: string;
}

export interface chatIFC {
  _id: string;
  roomId: string;
  user: string;
  message: string;
  createdAt: string[];
  userName: string[];
}

export interface chatRoomIFC {
  _id: string;
  users: string[];
  chats: chatIFC[];
  createdAt: string;
}
