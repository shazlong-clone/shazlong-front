import React, { useEffect } from 'react';
import shazlongLogo from '../assets/images/shezlong-logo.svg';
import shazlongLogoAr from '../assets/images/shezlong-logo-ar.svg';
import {lngs}  from '../assets/constants/index';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
function NavBar() {
  const {t ,i18n } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  useEffect(() =>{
      document.body.dir = lngs[currLang]?.dir;
      const root =  document.getElementById("root")
      if (currLang === 'ar'){
        root.style.fontSize = '16px'
      }else{
        root.style.fontSize = '14px'
      }

  },[currLang])
  return (
    <div className='items-center border-b-[1px] border-gray/10 px-4 py-3 lg:px-20 bg-white'>
      <div className='max-w-6xl flex justify-between items-center m-auto'>
        <section>
          <img src={currLang === 'ar' ? shazlongLogoAr : shazlongLogo} alt='logo' className='w-[160px]' />
        </section>
        <section className='hidden md:block'>
          <ul className='flex gap-5 text-gray/75 cursor-pointer list-none'>
            <li className='hover:text-green'>{t('Therapists_List')}</li>
            <li className='hover:text-green'>{t('Psychometer')}</li>
            <li className='hover:text-green'>{t('Blog')}</li>
          </ul>
        </section>
        <section className='flex gap-2 items-center lg:gap-5'>
          {
           Object.keys(lngs)?.map((el) => {
            return <article key={lngs[el]?.nativeName} onClick={()=> i18n.changeLanguage(el)}  className={clsx('text-gray/75 cursor-pointer hover:underline', currLang === el ? 'hidden' :'' )}>
            {lngs[el]?.nativeName}
            </article>
           })
          }
          <article className='text-green border border-green py-1 px-4 rounded-xl cursor-pointer lg:px-10 lg:py-2'>
            {t('Sign_In')}
          </article>
          <article className='text-white bg-green py-1 px-4 rounded-xl cursor-pointer lg:px-10 lg:py-2'>
            {t('Sign_Up')}
          </article>
        </section>
      </div>
    </div>
  );
}

export default NavBar;
