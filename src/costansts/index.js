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

export const sessionsStatusList = [
  {
    id: 0,
    translationKey: 'Canceled',
  },
  {
    id: 1,
    translationKey: 'Reserved',
  },
  {
    id: 2,
    translationKey: 'Attended',
  },
  {
    id: 3,
    translationKey: 'Not_Attended',
  },
];
