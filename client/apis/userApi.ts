import { authIFC, signinIFC, signupIFC } from '@/interfaces/userIFC';
import { Apis } from '@/utils/api';

export const signinApi = async (user: signinIFC) => {
  try {
    const res = await Apis.post('/user/login', user);
    return res;
  } catch (err) {
    console.error(err, ' : Signin Error !!!');
  }
};

export const signupApi = async (user: signupIFC) => {
  try {
    const res = await Apis.post('/user/register', user);
    return res;
  } catch (err) {
    console.error(err, ' : Signin Error !!!');
  }
};

export const authApi = async (user: authIFC) => {
  try {
    const res = await Apis.post('/user/auth', user);
    return res;
  } catch (err) {
    console.error(err, ' : Signin Error !!!');
  }
};
