import { userIFC } from "./userIFC";

export interface alarmIFC {
    _id: string;
    creator: userIFC;
    register_date: string;
    date: string;
    isRead: boolean;
    content: string;
}

export interface allAlarmsIFC {
    alarms: alarmIFC[];
    unreadCount: number;
}
