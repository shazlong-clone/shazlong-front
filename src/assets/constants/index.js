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
  { id: 1, name: 'Male' },
  { id: 2, name: 'FeMale' },
];

export const DOCTOR = 2;
export const USER = 1;

export const prefixList = ['Dr', 'PsyD', 'Prof', 'MBPsS', 'Mr', 'Mrs', 'Ms'];

export const specializationList = [
  {
    id: 1,
    name: 'Adolescence_Disorders',
  },
  {
    id: 2,
    name: 'Adolescence_Disorders',
  },
  {
    id: 3,
    name: 'Mood_Disorders_depression',
  },
  {
    id: 4,
    name: 'Anxiety_Disorders_And_Obsessions',
  },
  {
    id: 5,
    name: 'Marriage_CounsellingRelationship_Disorders',
  },
  {
    id: 6,
    name: 'Addiction',
  },
  {
    id: 7,
    name: 'Sexual_Disorders',
  },
];
