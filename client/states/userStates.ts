import { userIFC } from '@/interfaces/userIFC';
import { atom } from 'recoil';

export const userState = atom<userIFC>({
  key: 'userState',
  default: {
    name: '',
    email: '',
    id: '',
    token: '',
  },
});
