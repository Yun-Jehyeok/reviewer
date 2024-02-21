import { userIFC } from '@/interfaces/userIFC';
import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom<userIFC>({
  key: 'userState',
  default: {
    _id: '',
    reputation: 0,
    register_date: '',
    profile_img: '',
    posts: [],
    point: 0,
    phone: '',
    nickname: '',
    name: '',
    login_way: '',
    lang: [],
    isSubmit: false,
    grade: '',
    getApplications: [],
    email: '',
    applications: [],
  },
  effects_UNSTABLE: [persistAtom],
});
