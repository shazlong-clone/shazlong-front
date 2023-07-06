import React, { useEffect, useState } from 'react';
import shazlongLogo from '../assets/images/shezlong-logo.svg';
import shazlongLogoAr from '../assets/images/shezlong-logo-ar.svg';
import { lngs } from '../assets/constants/index';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import applyRtlCssStyles from '../utils/applyRtlCssStyles';
import { Link, NavLink } from 'react-router-dom';
function NavBar() {
  const { t, i18n } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  useEffect(() => {
    applyRtlCssStyles(currLang);
  }, [currLang]);

  const nav = [
    {
      name: t('Therapists_List'),
      to: '/therapists',
    },
    {
      name: t('Psychometer'),
      to: '/',
    },
    {
      name: t('Blog'),
      to: '/',
    },
  ];
  return (
    <div className='container items-center border-b-[1px] border-gray/10 px-4 py-5 bg-white'>
      <div className='flex justify-between items-center m-auto'>
        <section>
          <Link to='/'>
          <img
            src={currLang === 'ar' ? shazlongLogoAr : shazlongLogo}
            alt='logo'
            className='md:w-[160px] w-[100px]'
            />
          </Link>
        </section>
        <section className='hidden md:block'>
          <ul className='flex gap-5 text-gray/75 cursor-pointer list-none mb-0 px-0'>
            {
              nav?.map(({to, name}, i) => {
                return <li key={Math.random()}>
                <NavLink
                  to={to}
                  className='hover:text-green hover:no-underline focus:no-underline active:text-green focus:text-green  text-gray'
                >
                  {name}
                </NavLink>
              </li>
              })
            }
          </ul>
        </section>
        <section className='flex gap-2 items-center lg:gap-5'>
          {Object.keys(lngs)?.map((el) => {
            return (
              <article
                key={lngs[el]?.nativeName}
                onClick={() => i18n.changeLanguage(el)}
                className={clsx(
                  'text-gray/75 cursor-pointer hover:underline',
                  currLang === el ? 'hidden' : ''
                )}
              >
                {lngs[el]?.nativeName}
              </article>
            );
          })}
          <article className='text-green border border-solid border-green py-1 px-2 rounded-3xl cursor-pointer  lg:py-1 lg:px-5 text-sm rtl:text-[10px] lg:text-base'>
            {t('Sign_In')}
          </article>
          <article className='text-white bg-green py-1 px-2 rounded-3xl cursor-pointer  lg:py-1 lg:px-5 text-sm rtl:text-[10px] lg:text-base flex rtl:pt-2'>
            {t('Sign_Up')}
          </article>
        </section>
      </div>
    </div>
  );
}

export default NavBar;
