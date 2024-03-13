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
