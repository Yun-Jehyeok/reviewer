import { createReviewIFC } from '@/interfaces/reviewIFC';
import { Apis } from '@/utils/api';

export const createReviewApi = async (data: createReviewIFC) => {
  return await Apis.post('/review', data);
};
