import React, { useEffect, useState } from 'react';
import shazlongLogo from '../../assets/images/shezlong-logo.svg';
import shazlongLogoAr from '../../assets/images/shezlong-logo-ar.svg';
import { lngs } from '../../assets/constants/index';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import applyRtlCssStyles from '../../utils/applyRtlCssStyles';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button, Drawer, Popover, Whisper } from 'rsuite';
import { BsPersonBadgeFill, BsPersonCircle } from 'react-icons/bs';
import { GoSignOut } from 'react-icons/go';
import personIcon from '../../assets/images/person-icon-blue-7563.png';
import useMediaQuery from '../../utils/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, getMeAsDoctor } from '../../features/auth/authAction';
import { signOut } from '../../features/auth/authSlice';

import { AiOutlineCaretDown } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

function NavBar() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  useEffect(() => {
    applyRtlCssStyles(currLang);
  }, [currLang]);
  const lg = useMediaQuery('lg');

  const nav = [
    {
      name: t('Therapists_List'),
      to: 'therapists',
    },
    {
      name: t('Psychometer'),
      to: 'psychometer',
    },
    {
      name: t('Blog'),
      to: 'blogs',
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const triggerRef = React.useRef();
  const navgiagte = useNavigate();
  const close = () => triggerRef.current.close();
  const handleProfile = () => {
    close();
    setTimeout(() => {
      navgiagte('/user-info');
    }, 0);
  };
  const signOutHandler = () => {
    close();
    setTimeout(() => {
      dispatch(signOut());
      setOpen(false);
      navigate('/');
    }, 0);
  };
  const speaker = (
    <Popover className="p-0" style={!lg ? { display: 'none' } : {}}>
      <ul className="p-0 list-none divide-y-[1px] divide-x-0 divide-solid divide-[var(--rs-gray-100)]">
        <li className="px-3 flex items-center gap-2 py-2">
          <img className="rounded-full" src={user?.photo ? user?.photo : personIcon} width="40px" height="40px" />
          <strong className="capitalize">{user?.name}</strong>
        </li>
        <li className="text-base px-3 py-2 cursor-pointer">
          <a className="no-underline hover:no-underline">
            <div onClick={handleProfile} className="flex gap-2 items-center">
              <BsPersonCircle />
              <span className="capitalize">{t('my_profile')}</span>
            </div>
          </a>
        </li>
        <li
          onClick={signOutHandler}
          className="text-red-600 hover:text-red-500 text-base flex gap-2 items-center px-3 py-2 cursor-pointer"
        >
          <GoSignOut className="text-xl  items-center mt-[3px]" />
          <span className="pb-[1px]">{t('Sign_Out')}</span>
        </li>
      </ul>
    </Popover>
  );

  useEffect(() => {
    dispatch(getMe());
    dispatch(getMeAsDoctor());
  }, []);

  return (
    <div
      className="container items-center border-b-[1px] border-[var(--rs-gray-100)] px-4 py-3 bg-[var(--rs-bg-card)]"
      id="link2"
    >
      <div className="flex justify-between items-center m-auto">
        <section className="lg:flex-[1_1_33%]">
          <Link to={`/${i18n.resolvedLanguage}`}>
            <img src={currLang === 'ar' ? shazlongLogoAr : shazlongLogo} alt="logo" className="md:w-[160px] w-[100px]" />
          </Link>
        </section>
        <section className="hidden md:block  lg:flex-[1_1_33%]">
          <ul className="flex gap-5 text-gray/75 cursor-pointer list-none mb-0 px-0 lg:justify-center">
            {nav?.map(({ to, name }) => {
              return (
                <li key={Math.random()}>
                  <NavLink
                    to={to}
                    className={clsx(
                      'text-[var(--rs-gray-700)] hover:text-[var(--rs-green-300)] hover:no-underline focus:no-underline active:text-[var(--rs-green-900)] focus:text-[var(--rs-green-400)]',
                      window.location.pathname?.includes(to) ? 'text-[--rs-green-300]' : 'text-[--rs-gray-800]',
                    )}
                  >
                    {name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="flex gap-2 items-center lg:gap-5  lg:flex-[1_1_33%]  lg:justify-end">
          {Object.keys(lngs)?.map((el) => {
            return (
              <article
                key={lngs[el]?.nativeName}
                onClick={() => i18n.changeLanguage(el)}
                className={clsx(
                  'text-[var(--rs-gray-700)] cursor-pointer hover:underline flex',
                  currLang === el ? 'hidden' : '',
                  currLang === 'ar' ? 'pt-2' : '',
                )}
              >
                {lngs[el]?.nativeName}
              </article>
            );
          })}

          {!user?._id ? (
            <>
              <Link className="text-inherit hover:no-underline hover:text-inherit" to={`/${i18n.resolvedLanguage}/sign-in`}>
                <article className="text-[var(--rs-green-400)] border border-solid border-[var(--rs-green-400)] py-1 px-2 rounded-3xl cursor-pointer  lg:py-1 lg:px-5 text-[12px] text-center  xl:text-base">
                  {t('Sign_In')}
                </article>
              </Link>
              <Link className="text-inherit hover:no-underline hover:text-inherit" to={`/${i18n.resolvedLanguage}/sign-up`}>
                <article className="text-white bg-[var(--rs-green-400)] py-1 px-2 rounded-3xl cursor-pointer lg:py-1 lg:px-5 text-[12px] text-center  xl:text-base flex rtl:pt-2">
                  {t('Sign_Up')}
                </article>
              </Link>
            </>
          ) : (
            ''
          )}
          <article className={clsx(!user?._id ? 'hidden' : '')}>
            <section className={clsx(open && 'text-cyan', 'flex items-center')}>
              <Whisper className="hidden" ref={triggerRef} trigger="click" placement="bottom" speaker={speaker}>
                <Button onClick={() => setOpen(true)} appearance="subtle">
                  <BsPersonCircle className="text-xl" />
                  <AiOutlineCaretDown className="text-xs" />
                </Button>
              </Whisper>
            </section>
            {lg ? (
              ''
            ) : (
              <Drawer placement="bottom" size="md" open={open} onClose={() => setOpen(false)}>
                <Drawer.Body className="px-0 close-right">
                  <ul className="mt-[30px] list-none px-0">
                    <li className="px-5 flex gap-3 items-center">
                      <img src={user?.photo ? user?.photo : personIcon} alt="therapist" className="rounded-full w-[50px]" />
                      <span className="text-lg italic font-[100]">{user?.name}</span>
                    </li>
                    <hr />
                    <li className="px-5">
                      <Link to="/user-info" className="text-inherit hover:no-underline">
                        <div onClick={() => setOpen(false)} className="inline-flex items-center gap-2 text-cyan">
                          <BsPersonBadgeFill className="text-3xl" />
                          <span className="text-lg">{t('Your_Profile')}</span>
                        </div>
                      </Link>
                    </li>
                    <hr />
                    <li className="text-red-600 flex items-center justify-center gap-2">
                      <span className="text-lg cursor-pointer flex items-center gap-2" onClick={signOutHandler}>
                        <GoSignOut className="text-3xl" />
                        {t('Sign_Out')}
                      </span>
                    </li>
                  </ul>
                </Drawer.Body>
              </Drawer>
            )}
          </article>
        </section>
      </div>
    </div>
  );
}

export default NavBar;
