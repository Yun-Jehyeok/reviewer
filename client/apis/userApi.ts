import {
  changePwIFC,
  editUserIFC,
  emailIFC,
  paymentIFC,
  phoneIFC,
  signinIFC,
  signupIFC,
} from '@/interfaces/userIFC';
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

export const authEmailApi = async (data: emailIFC) => {
  return await Apis.post('/user/email', data);
};

export const changePwApi = async (data: changePwIFC) => {
  return await Apis.put('/user/pw', data);
};

export const editUserApi = async (data: editUserIFC) => {
  return await Apis.put(`/user/${data.id}`, data);
};

export const paymentApi = async (data: paymentIFC) => {
  console.log('payload:::', data);
  return await Apis.put(`/user/payment/${data.id}`, data);
};
