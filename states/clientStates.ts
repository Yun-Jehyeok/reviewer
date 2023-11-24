import { atom } from 'recoil';

export const confirmState = atom<Boolean>({
  key: 'confirmState',
  default: false,
});
