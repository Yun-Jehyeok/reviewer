import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        accept: 'application/json',
    },
});

export const Apis = {
    get: (url: string, params?: any) =>
        api.get(url, params).then((res: any) => res.data),
    post: (url: string, payload?: any) =>
        api.post(url, payload).then((res: any) => res.data),
    put: (url: string, payload?: any) =>
        api.put(url, payload).then((res: any) => res.data),
    delete: (url: string, payload?: any) =>
        api.delete(url, payload).then((res: any) => res.data),
};
