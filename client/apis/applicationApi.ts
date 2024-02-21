import { applicationIFC } from '@/interfaces/applicationIFC';
import { Apis } from '@/utils/api';
import { QueryFunction } from '@tanstack/react-query';

export const getReviewsApi: QueryFunction<
  applicationIFC[],
  [_1: string, _2: string]
> = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await Apis.get(`/application/reviews/${id}`);

  if (!res.success) {
    throw new Error('Failed to fetch data');
  }

  return res.reviews;
};

export const getApplicationsApi: QueryFunction<
  applicationIFC[],
  [_1: string, _2: string]
> = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await Apis.get(`/application/applications/${id}`);

  if (!res.success) {
    throw new Error('Failed to fetch data');
  }

  return res.reviews;
};
