export interface reviewIFC {
  _id: string;
  creator: string;
  nickname: string;
  content: string;
  score: number;
  register_date: string;
  postId: string;
}

export interface createReviewIFC {
  creator: string;
  nickname: string;
  content: string;
  score: number;
  postId: string;
  appId: string;
}
