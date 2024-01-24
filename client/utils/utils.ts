export const bgFixed = () => {
  document.querySelector('body')!.style.height = '100vh';
  document.querySelector('body')!.style.overflow = 'hidden';
};

export const cancelBgFixed = () => {
  document.querySelector('body')!.style.height = 'fit-content';
  document.querySelector('body')!.style.overflow = 'auto';
};
