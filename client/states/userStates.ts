import { userIFC } from '@/interfaces/userIFC';
import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface IUserState extends userIFC {
  token: string;
}
export const userState = atom<IUserState>({
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
    token: '',
    price: 0,
    introduce: '',
    oneLineIntroduce: '',
  },
  effects_UNSTABLE: [persistAtom],
});
