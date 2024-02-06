import { userIFC } from '@/interfaces/userIFC';
import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom<userIFC>({
  key: 'userState',
  default: {
    name: '',
    email: '',
    id: '',
    token: '',
  },
  effects_UNSTABLE: [persistAtom],
});
