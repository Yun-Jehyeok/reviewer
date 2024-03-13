import { reviewIFC } from './reviewIFC';

export interface postIFC {
  _id: string;
  title: string;
  content: string;
  register_date: string;
  lang: string[];
  price: number;
  creator: string;
  reviews: reviewIFC[];
}

export interface allPostIFC {
  posts: postIFC[];
  allPostsCnt: number;
}

export interface registerPostIFC {
  userId: string;
  title: string;
  content: string;
  lang: string[];
  price: number;
}

export interface applyIFC {
  applicantId: string;
  reviewerId: string;
  point: number;
  postId: string;
}
