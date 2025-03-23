// Library
import nookies from "nookies";
import { ServerApi } from "@/utils/api";
// import { cookies } from "next/headers";

// Utils
import { Apis } from "@/utils/api";

// Interface
import { changePwIFC, editUserIFC, emailIFC, paymentIFC, phoneIFC, signinIFC, signupIFC, userIFC } from "@/interfaces/userIFC";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

export const signinApi = async (user: signinIFC) => {
    return await Apis.post("/user/login", user);
};

export const signinServerApi = async (token: string) => {
    const res = await ServerApi.get(`/user/${token}`);
    console.log(res, " : res");
    // cookies().set("x-user", JSON.stringify(res.user));
    return signinApi(res) as Promise<signinIFC>;
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

export const getUserApi = async () => {
    console.log("getUserApi 호출 >>>> ");
    try {
        // const session = await useSession();
        // const session = await auth();
        // console.log("session token api check >>>> ", session?.token);
        // const res = await Apis.get(`/user/${session?.token}`);
        const res = await Apis.get(`/user/`);

        console.log(res, " : res");
        if (!res.success) throw new Error(res.data.msg);
        return res.user;
    } catch (err: Error | unknown) {
        // console.error("get User API Error >>>> ", err?.response?.data?.msg);
        console.error("get User API Error >>>> ", err);
        throw err;
    }
};
