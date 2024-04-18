import {
    allPostIFC,
    applyIFC,
    getAllPostReqIFC,
    postIFC,
    registerPostIFC,
} from '@/interfaces/postIFC';
import { Apis } from '@/utils/api';
import { QueryFunction } from '@tanstack/react-query';

export const registerPostApi = async (post: registerPostIFC) => {
    try {
        const res = await Apis.post('/post', post);
        return res;
    } catch (err) {
        console.error(err, ' : Register Post Error !!!');
    }
};

export const uploadImgApi = async (imgs: FormData) => {
    try {
        const res = await Apis.post('/post/image', imgs);
        return res;
    } catch (err) {
        console.error(err, ' : Upload Image Error !!!');
    }
};

export const getAllPostApi: QueryFunction<
    allPostIFC,
    [_1: string, _2: getAllPostReqIFC]
> = async ({ queryKey }) => {
    const [_1, data] = queryKey;
    const res = await Apis.get(
        `/post/skip/${data.page}/${data.filter}/${data.langFilter}`,
    );

    if (!res.success) {
        throw new Error('Failed to fetch data');
    }

    return { posts: res.posts, allPostsCnt: res.allPostsCnt };
};

export const getPostApi: QueryFunction<
    postIFC,
    [_1: string, _2: string]
> = async ({ queryKey }) => {
    const [_1, postId] = queryKey;
    const res = await Apis.get(`/post/${postId}`, {
        next: {
            tags: ['users', postId],
        },
    });

    if (!res.success) {
        throw new Error('Failed to fetch data');
    }

    return res.post;
};

export const applyApi = async (data: applyIFC) => {
    try {
        const res = await Apis.post('/application/apply', data);
        return res;
    } catch (err) {
        console.error(err, ' : Apply Error !!!');
    }
};

export const getNewReviewsApi: QueryFunction<postIFC[], [_1: string]> = async ({
    queryKey,
}) => {
    const [_1] = queryKey;
    const res = await Apis.get(`/post/post/new`, {
        next: {
            tags: ['new'],
        },
    });

    if (!res.success) {
        throw new Error('Failed to fetch data');
    }

    return res.posts;
};

export const getBestReviewsApi: QueryFunction<
    postIFC[],
    [_1: string]
> = async ({ queryKey }) => {
    const [_1] = queryKey;
    const res = await Apis.get(`/post/post/best`, {
        next: {
            tags: ['best'],
        },
    });

    if (!res.success) {
        throw new Error('Failed to fetch data');
    }

    return res.posts;
};
