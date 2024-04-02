import { allAlarmsIFC } from "@/interfaces/alarmIFC";
import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const getAllAlarmsApi: QueryFunction<
    allAlarmsIFC,
    [_1: string, _2: string]
> = async ({ queryKey }) => {
    const [_1, userId] = queryKey;
    const res = await Apis.get(`/alarm/${userId}`);
    console.log("Alram Response >>>> ", res);
    if (!res.success) {
        throw new Error("Failed to fetch data");
    }

    let unreadCount = 0;

    if (res?.alarms.length) {
        res?.alarms.forEach((alarm: any) => {
            if (!alarm?.isRead) unreadCount++;
        });
    }
    return { alarms: res.alarms, unreadCount: unreadCount };
};

export const readAlaramApi = async (id: string) => {
    return await Apis.put(`/alarm/status/${id}`);
};
