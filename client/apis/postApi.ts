import {
  allPostIFC,
  applyIFC,
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

export const getAllPostApi: QueryFunction<
  allPostIFC,
  [_1: string, _2: number]
> = async ({ queryKey }) => {
  const [_1, page] = queryKey;
  const res = await Apis.get(`/post/skip/${page}`);

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
