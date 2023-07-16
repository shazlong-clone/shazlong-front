import React, { useEffect, useState } from 'react';
import shazlongLogo from '../../assets/images/shezlong-logo.svg';
import shazlongLogoAr from '../../assets/images/shezlong-logo-ar.svg';
import { lngs } from '../../assets/constants/index';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import applyRtlCssStyles from '../../utils/applyRtlCssStyles';
import { Link, NavLink } from 'react-router-dom';
import { Drawer, Popover } from 'rsuite';
import { BsPersonBadgeFill, BsPersonCircle } from 'react-icons/bs';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { GoSignOut } from 'react-icons/go';
import therapist from '../../assets/images/therapist.webp';
import useMediaQuery from '../../utils/useMediaQuery'

function NavBar() {
  const [open,setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  useEffect(() => {
    applyRtlCssStyles(currLang);
  }, [currLang]);
  const lg = useMediaQuery('lg')

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
                  'text-gray/75 cursor-pointer hover:underline flex',
                  currLang === el ? 'hidden' : '',
                  currLang === 'ar' ? 'pt-2' : ''
                )}
              >
                {lngs[el]?.nativeName}
              </article>
            );
          })}
          {/* <article className='text-green border border-solid border-green py-1 px-2 rounded-3xl cursor-pointer  lg:py-1 lg:px-5 text-sm rtl:text-[10px] lg:text-base'>
            {t('Sign_In')}
          </article>
          <article className='text-white bg-green py-1 px-2 rounded-3xl cursor-pointer  lg:py-1 lg:px-5 text-sm rtl:text-[10px] lg:text-base flex rtl:pt-2'>
            {t('Sign_Up')}
          </article> */}
          <article>
            <section onClick={()=>setOpen(true)} className={clsx(open && 'text-cyan', 'flex items-center')}>
              <BsPersonCircle className='text-xl' /> 
              <AiOutlineCaretDown className='text-xs' />
              <Popover title="Title" visible>
                <p>This is a default Popover </p>
                <p>Content</p>
              </Popover>
            </section>
            {
               lg ? '' :  
               <Drawer placement='bottom' size='md' open={open} onClose={() => setOpen(false)}>
                <Drawer.Body className='px-0 close-right'>
                  <ul className='mt-[50px] list-none px-0'>
                    <li className='px-5 flex gap-3 items-center'>
                      <img  src={therapist} alt='therapist' className='rounded-full w-[50px]' /> 
                      <span className='text-lg italic font-[100]'>John Doe</span>
                    </li>
                    <hr />
                    <li className='px-5'>
                      <Link to='/' className='text-inherit inline-flex items-center gap-2 hover:no-underline'>
                        <BsPersonBadgeFill className='text-3xl' /> 
                        <span className='text-lg'>Your Profile</span>
                      </Link>
                    </li>
                    <hr />
                    <li className='text-red-600 flex items-center justify-center gap-2'>
                      <GoSignOut  className='text-3xl' />
                      <span className='text-lg'>Sign Out</span>
                    </li>
                  </ul>
                </Drawer.Body>
              </Drawer>
              }
          </article>
        </section>
      </div>
    </div>
  );
}

export default NavBar;
