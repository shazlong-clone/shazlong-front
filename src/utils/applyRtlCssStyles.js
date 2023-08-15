const applyRtlCssStyles = (currLang) => {
  const root = document.getElementById('root');
  if (!currLang) return;
  if (currLang === 'ar') {
    document.body.dir = 'rtl';
    document.documentElement.lang = 'ar';
    root.style.fontSize = '20px';
    root.style.fontFamily = 'Tajawal';
  } else {
    document.body.dir = 'ltr';
    document.documentElement.lang = 'en';
    root.style.fontSize = '16px';
    root.style.fontFamily = 'Montserrat';
  }
};
export default applyRtlCssStyles;
