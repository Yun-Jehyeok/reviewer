import { userIFC } from './userIFC';

export interface alarmIFC {
  _id: string;
  creator: userIFC;
  register_date: string;
  isRead: boolean;
  content: string;
}

export interface allAlarmsIFC {
  alarms: alarmIFC[];
}
