const applyRtlCssStyles = (currLang) => {
  const root = document.getElementById('root');
  if (currLang === 'ar') {
    document.body.dir = 'rtl';
    root.style.fontSize = '16px';
    root.style.fontFamily = 'Tajawal';
  } else {
    document.body.dir = 'ltr';
    root.style.fontSize = '16px';
    root.style.fontFamily = 'Montserrat';
  }
};
export default applyRtlCssStyles;
