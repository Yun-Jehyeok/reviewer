import { phoneIFC, signinIFC, signupIFC } from '@/interfaces/userIFC';
import { Apis } from '@/utils/api';

export const signinApi = async (user: signinIFC) => {
  return await Apis.post('/user/login', user);
};

export const signupApi = async (user: signupIFC) => {
  return await Apis.post('/user/register', user);
};

export const authPhoneApi = async (data: phoneIFC) => {
  return await Apis.post('/user/phone', data);
};

export const withdrawalApi = async (userId: string) => {
  return await Apis.delete(`/user/withdrawal/${userId}`);
};
