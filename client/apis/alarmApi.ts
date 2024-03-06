import { allAlarmsIFC } from '@/interfaces/alarmIFC';
import { Apis } from '@/utils/api';
import { QueryFunction } from '@tanstack/react-query';

export const getAllAlarmsApi: QueryFunction<
  allAlarmsIFC,
  [_1: string, _2: string]
> = async ({ queryKey }) => {
  const [_1, userId] = queryKey;
  const res = await Apis.get(`/alarm/${userId}`);

  if (!res.success) {
    throw new Error('Failed to fetch data');
  }

  return { alarms: res.alarms };
};
