import { applicationIFC, chatRoomIFC } from "@/interfaces/applicationIFC";
import { Apis } from "@/utils/api";
import { QueryFunction } from "@tanstack/react-query";

export const getReviewsApi: QueryFunction<
    applicationIFC[],
    [_1: string, _2: string]
> = async ({ queryKey }) => {
    const [_1, id] = queryKey;
    const res = await Apis.get(`/application/reviews/${id}`);

    if (!res.success) {
        throw new Error("Failed to fetch data");
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
        throw new Error("Failed to fetch data");
    }

    return res.reviews;
};

export const proceedingApi = async (id: string) => {
    let payload = { id };
    return await Apis.put("/application/status/proceeding", payload);
};

export const cancelAppApi = async (arg: any) => {
    let payload = arg;
    return await Apis.put("/application/status/cancel", payload);
};

export const completeReviwerAppApi = async (id: string) => {
    let payload = { id };
    return await Apis.put("/application/status/complete/reviewer", payload);
};

export const completeApplicantAppApi = async (id: string) => {
    let payload = { id };
    return await Apis.put("/application/status/complete/applicant", payload);
};

export const getChatRoomApi: QueryFunction<
    chatRoomIFC,
    [_1: string, _2: string]
> = async ({ queryKey }) => {
    const [_1, roomId] = queryKey;
    const res = await Apis.get(`/application/chats/${roomId}`);

    if (!res.success) {
        throw new Error("Failed to fetch data");
    }

    return res.room;
};
