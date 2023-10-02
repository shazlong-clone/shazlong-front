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
  { id: '1', name: 'Male' },
  { id: '2', name: 'FeMale' },
];

export const DOCTOR = 2;
export const USER = 1;

export const prefixList = ['Dr', 'PsyD', 'Prof', 'MBPsS', 'Mr', 'Mrs', 'Ms'];

export const egyptGovernorates = [
  { id: 1, name: 'Cairo', ar_name: 'القاهرة' },
  { id: 2, name: 'Alexandria', ar_name: 'الإسكندرية' },
  { id: 3, name: 'Giza', ar_name: 'الجيزة' },
  { id: 4, name: 'Luxor', ar_name: 'الأقصر' },
  { id: 5, name: 'Aswan', ar_name: 'أسوان' },
  { id: 6, name: 'Red Sea', ar_name: 'البحر الأحمر' },
  { id: 7, name: 'Suez', ar_name: 'السويس' },
  { id: 8, name: 'Minya', ar_name: 'المنيا' },
  { id: 9, name: 'Fayoum', ar_name: 'الفيوم' },
  { id: 10, name: 'Beni Suef', ar_name: 'بني سويف' },
  { id: 11, name: 'Ismailia', ar_name: 'الإسماعيلية' },
  { id: 12, name: 'Port Said', ar_name: 'بورسعيد' },
  { id: 13, name: 'Damietta', ar_name: 'دمياط' },
  { id: 14, name: 'Kafr El Sheikh', ar_name: 'كفر الشيخ' },
  { id: 15, name: 'Qena', ar_name: 'قنا' },
  { id: 16, name: 'Sohag', ar_name: 'سوهاج' },
  { id: 17, name: 'North Sinai', ar_name: 'شمال سيناء' },
  { id: 18, name: 'South Sinai', ar_name: 'جنوب سيناء' },
  { id: 19, name: 'Beheira', ar_name: 'البحيرة' },
  { id: 20, name: 'Matrouh', ar_name: 'مطروح' },
  { id: 21, name: 'Gharbia', ar_name: 'الغربية' },
  { id: 22, name: 'Sharqia', ar_name: 'الشرقية' },
  { id: 23, name: 'Dakahlia', ar_name: 'الدقهلية' },
  { id: 24, name: 'Monufia', ar_name: 'المنوفية' },
];
