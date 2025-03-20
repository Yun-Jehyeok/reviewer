import axios from "axios";
import { auth } from "@/auth";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        accept: "application/json",
    },
});

// Next.js 서버 서버 API
export const ServerApi = {
    get: async (url: string) => {
        const response = await axios.get(`/api${url}`);
        if (!response.status) throw new Error("API Get request failed");
        return response.data;
    },
    post: async (url: string, payload: any) => {
        const response = await axios.post(`/api${url}`, payload);
        if (!response.status) throw new Error("API Post request failed");
        return response.data;
    },
};

api.interceptors.request.use(async (config) => {
    const session = await auth();
    if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
});

// 클라이언트 -> 서버 API
export const Apis = {
    get: (url: string, config?: any) => api.get(url, config).then((res) => res.data),
    post: (url: string, payload?: any) => api.post(url, payload).then((res: any) => res.data),
    put: (url: string, payload?: any) => api.put(url, payload).then((res: any) => res.data),
    delete: (url: string, payload?: any) => api.delete(url, payload).then((res: any) => res.data),
};
