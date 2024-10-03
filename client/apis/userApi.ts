// Library
import { QueryFunction } from "@tanstack/react-query";
import nookies from "nookies";

// Utils
import { Apis } from "@/utils/api";

// Interface
import { changePwIFC, editUserIFC, emailIFC, paymentIFC, phoneIFC, signinIFC, signupIFC, userIFC } from "@/interfaces/userIFC";

export const signinApi = async (user: signinIFC) => {
    return await Apis.post("/user/login", user);
};

export const signupApi = async (user: signupIFC) => {
    return await Apis.post("/user/register", user);
};

export const authPhoneApi = async (data: phoneIFC) => {
    return await Apis.post("/user/phone", data);
};

export const withdrawalApi = async (userId: string) => {
    return await Apis.delete(`/user/withdrawal/${userId}`);
};

export const authEmailApi = async (data: emailIFC) => {
    return await Apis.post("/user/email", data);
};

export const changePwApi = async (data: changePwIFC) => {
    return await Apis.put("/user/pw", data);
};

export const editUserApi = async (data: editUserIFC) => {
    return await Apis.put(`/user/${data.id}`, data);
};

export const paymentApi = async (data: paymentIFC) => {
    return await Apis.put(`/user/payment/${data.id}`, data);
};

export const getUserApi: QueryFunction<userIFC, [string]> = async ({ queryKey }) => {
    try {
        const { token } = nookies.get();
        const res = await Apis.get(`/user/${token}`);

        if (!res.success) throw new Error("Failed to fetch data");

        return res.user;
    } catch (err) {
        console.error("get User APi Error >>>> ", err);

        return null;
    }
};
