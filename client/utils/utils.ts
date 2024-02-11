export const bgFixed = () => {
  document.querySelector('body')!.style.height = '100vh';
  document.querySelector('body')!.style.overflow = 'hidden';
};

export const cancelBgFixed = () => {
  document.querySelector('body')!.style.height = 'fit-content';
  document.querySelector('body')!.style.overflow = 'auto';
};

export const numberReg = (param: string) => {
  let numReg = /^[0-9]+$/;

  if (numReg.test(param)) {
    return param;
  } else {
    let notNum = /[^0-9]+/g;
    return param.replaceAll(notNum, '');
  }
};

export const numberComma = (num: string) => {
  let convert = Number(num.replaceAll(',', ''));
  return convert.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
