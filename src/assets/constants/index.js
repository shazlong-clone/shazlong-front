export const lngs = {
  en: { nativeName: 'English' },
  ar: { nativeName: 'العربية' },
};

export const splitArrOfChunchN = (arr, len) => {
  let newArr = [];
  const step = Math.ceil(arr?.length / len);
  for (var i = 0; i < step; i++) {
    const start = i === 0 ? 0 : i * len;
    const end = i * len + len;
    const chunck = arr.slice(start, end);
    newArr.push(chunck);
  }
  return newArr;
};

export const genders = [
  { id: 1, name: 'Male', ar_name: 'ذكر' },
  { id: 2, name: 'FeMale', ar_name: 'انثي' },
];

export const DOCTOR = 2;
export const USER = 1;

export const prefixList = ['Dr', 'PsyD', 'Prof', 'MBPsS', 'Mr', 'Mrs', 'Ms'];

export const availability = [
  {
    id: '0',
    name: 'Now',
  },
  {
    id: '1',
    name: 'Today',
  },
  {
    id: '7',
    name: 'This_Week',
  },
  {
    id: 'all',
    name: 'Any_Time',
  },
];

export const transctionFeez = 5;

export const couponCode = Array.from(crypto.getRandomValues(new Uint32Array(5)))
  .map((x) => x.toString(36).slice(0, 5))
  .join('');
export const discount = 20;

export const CRIDIT_CARD = 'CREDIT_CARD';
export const PHONE_CASH = 'PHONE_CASH';
export const FAWRY = 'FAWRY';

export const CARD_NUMBER_DEMO = '1111111111111111';
export const CVC_DEMO = '111';
export const EXPIREDATE_DEMO = '25/25';
export const PHONE_DEMO = '01111111111';
export const EMAIL_DEMO = 'shazlong@demo.com';
