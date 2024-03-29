export const ASC = 'ASC';
export const DESC = 'DESC';

export const sortMenu = [
  {
    label: 'Fees (From low to high)',
    translationKey: 'Fees (From low to high)',
    id: '1',
    sortBy: 'feez',
    sort: ASC,
  },
  {
    label: 'Fees (From high to low)',
    translationKey: 'Fees (From high to low)',
    id: '2',
    sortBy: 'feez',
    sort: DESC,
  },
  {
    label: 'Top rated therapists',
    translationKey: 'Top rated therapists',
    id: '3',
    sortBy: 'stars',
    sort: DESC,
  },
];

export const searckList = ['Neuroscience(1)', 'Brain Science(2)', 'Psychotherapy(3)', 'COVID-19(6)', 'General Topics(9)'];

export const UPCOMING = 1;
export const PREVIOUS = 2;

export const CANCELED = 0;
export const RESERVED = 1;
export const PATIENT_ATTEND = 2;
export const PATIENT_NOT_ATTEND = 3;
export const sessionsStatusList = [
  {
    id: CANCELED,
    translationKey: 'Canceled',
  },
  {
    id: RESERVED,
    translationKey: 'Reserved',
  },
  {
    id: PATIENT_ATTEND,
    translationKey: 'Attended',
  },
  {
    id: PATIENT_NOT_ATTEND,
    translationKey: 'Not_Attended',
  },
];
export const PERSONAL_INFO = 'PERSONAL_INFO';
export const PAYMENT_INFO = 'PAYMENT_INFO';
export const MY_THERAPY = 'MY_THERAPY';


