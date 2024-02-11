import { postIFC, registerPostIFC } from '@/interfaces/postIFC';
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

export const getPostApi: QueryFunction<
  postIFC,
  [_1: string, _2: string]
> = async ({ queryKey }) => {
  const [_1, postId] = queryKey;
  console.log('postId:::', postId);

  const res = await Apis.get(`/post/${postId}`, {
    next: {
      tags: ['users', postId],
    },
  });

  console.log('getPostRes:::', res);

  if (!res.success) {
    throw new Error('Failed to fetch data');
  }

  return res.post;
};
