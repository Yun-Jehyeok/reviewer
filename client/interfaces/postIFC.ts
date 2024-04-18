import { reviewIFC } from './reviewIFC';
import { userIFC } from './userIFC';

export interface postIFC {
    _id: string;
    title: string;
    content: string;
    register_date: string;
    lang: string[];
    price: number;
    creator: userIFC;
    reviews: reviewIFC[];
    reputation: number;
    imgs?: string[];
}

export interface getAllPostReqIFC {
    page: number;
    filter: string;
    langFilter: string;
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
    imgs: string[];
}

export interface uploadImgIFC {
    imgs: FormData;
}

export interface applyIFC {
    applicantId: string;
    reviewerId: string;
    point: number;
    postId: string;
}
