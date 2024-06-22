import { API_BASE_URL } from '../../config/enviroment.config';

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
export const ACCEPTED = 1;
export const REJECTED = 2;
export const PENDING = 3;

export const blogStatusList = [
  {
    id: ACCEPTED,
    translationKey: 'Accepted',
  },
  {
    id: REJECTED,
    translationKey: 'Rejected',
  },
  {
    id: PENDING,
    translationKey: 'Pending',
  },
];

export const PERSONAL_INFO = 'PERSONAL_INFO';
export const PAYMENT_INFO = 'PAYMENT_INFO';
export const MY_THERAPY = 'MY_THERAPY';
export const MY_TESTS = 'MY_TESTS';

export const localizeNum = (lang, num) => {
  switch (lang) {
    case 'ar':
      return String(num).replace(/\d/g, function (v) {
        return String.fromCharCode(v.charCodeAt(0) + 0x0630);
      });
    case 'en':
      return num;
    default:
      return num;
  }
};

export const swiperConfig = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
};

const sunEditorOptions = {
  buttonList: [
    ['undo', 'redo'],
    ['font', 'fontSize'],
    // ['paragraphStyle', 'blockquote'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor'],
    ['align', 'list', 'lineHeight'],
    ['outdent', 'indent'],

    ['table', 'horizontalRule', 'link'],
    // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
    // ['imageGallery'], // You must add the "imageGalleryUrl".
    // ["fullScreen", "showBlocks", "codeView"],
    ['preview', 'print'],
    ['removeFormat'],

    // ['save', 'template'],
    // '/', Line break
  ], // Or Array of button list, eg. [['font', 'align'], ['image']]
  defaultTag: 'div',
  minHeight: '300px',
  rtl: false,
  showPathLabel: false,
  imageGalleryUrl: `${API_BASE_URL}/images/image-gallary`,
  font: [
    'Logical',
    'Salesforce Sans',
    'Garamond',
    'Sans-Serif',
    'Serif',
    'Times New Roman',
    'Helvetica',
    'Arial',
    'Comic Sans MS',
    'Courier New',
    'Impact',
    'Georgia',
    'Tahoma',
    'Trebuchet MS',
    'Verdana',
  ].sort(),
};

export const sunEditorArOptions = { ...sunEditorOptions, rtl: true, className: 'suneditor-rtl' };
export const sunEditorEnOptions = { ...sunEditorOptions, className: 'suneditor-ltr' };
