import React, { useEffect, useState } from 'react';
import { BiGroup } from 'react-icons/bi';
import { BiVideoPlus } from 'react-icons/bi';
import { MdSupportAgent } from 'react-icons/md';
import { RiPsychotherapyLine } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Drawer } from 'rsuite';
import { AiOutlineHome } from 'react-icons/ai';
import { BiTestTube } from 'react-icons/bi';
import { FaBlog } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { openChat } from '../../features/theme/themeSlice';
import { t } from 'i18next';
import { RiGroupLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useSwipeable } from 'react-swipeable';
import { handelSideBar } from '../../features/shared/sharedSlice';
import { swiperConfig } from '../../assets/constants';
function FooterNav() {
  const [activeTabe, setActiveTabe] = useState('/');
  const sideBarOpen = useSelector((state) => state?.shared?.sideBarOpen ?? false);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const menu = [
    {
      name: 'Home',
      icon: <AiOutlineHome />,
      link: `/${locale}`,
    },
    {
      name: 'Psychological_Tests',
      icon: <BiTestTube />,
      link: `/${locale}/psychometer`,
    },
    {
      name: 'Blog',
      icon: <FaBlog />,
      link: `/${locale}/blogs`,
    },
    {
      name: 'Therapist_List',
      icon: <RiGroupLine />,
      link: `/${locale}/therapists`,
    },
  ];
  const setOpen = (v) => {
    dispatch(handelSideBar(v));
  };
  useEffect(() => {
    if (!open && activeTabe === 4) {
      setActiveTabe(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && open) {
        setOpen(false);
      }
      return () => window.removeEventListener('resize', () => {});
    });
  }, []);
  const Menu = ({ title, icon, link, id }) => {
    return (
      <section
        className="pointer hover:text-[var(--rs-primary-500)] transition-all text-center"
        onClick={() => setActiveTabe(id)}
      >
        <NavLink to={link} className={clsx(activeTabe === id ? 'text-[var(--rs-primary-500)]' : 'text-[var(--rs-gray-700)]')}>
          <i className="text-2xl">{icon}</i>
          <div className="text-[12px]">{title}</div>
        </NavLink>
      </section>
    );
  };
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (
        (i18n.resolvedLanguage === 'ar' && eventData.dir === 'Right') ||
        (i18n.resolvedLanguage === 'en' && eventData.dir === 'Left')
      ) {
        setOpen(false);
      }
    },
    ...swiperConfig,
  });

  return (
    <>
      <div className="bg-[var(--rs-bg-card)] md:hidden w-full bottom-0 right-0 fixed text-gray cursor-pointer z-50">
        <article className="flex gap-4 text-center justify-between py-3 px-4 shadow-2xl">
          <div>
            <Menu title={t('Therapists')} id={0} link={`/${locale}/therapists`} icon={<BiGroup />} />
          </div>
          <div>
            <Menu title={t('Online')} id={1} link={`/${locale}/therapists?availability=0`} icon={<BiVideoPlus />} />
          </div>
          <div>
            <Menu title={t('My_Therapy')} id={2} link={`/${locale}/my-therapy`} icon={<RiPsychotherapyLine />} />
          </div>
          <div onClick={() => dispatch(openChat())}>
            <Menu title={t('Support')} id={3} icon={<MdSupportAgent />} />
          </div>
          <div onClick={() => setOpen(true)}>
            <Menu title={t('More')} id={4} icon={<FiMoreHorizontal />} />
          </div>
        </article>
        <Drawer
          {...handlers}
          backdrop={true}
          size={'calc(100% - 100px)'}
          placement="left"
          open={sideBarOpen}
          onClose={() => setOpen(false)}
          className="bg-gray"
        >
          <Drawer.Header>
            <Drawer.Title className="text-center text-2xl text-cyan">{t('More')}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="p-0">
            <div>
              {menu?.map((el) => {
                return (
                  <Link
                    key={Math.random()}
                    to={el?.link}
                    className="text-[var(--rs-gray-700)] active:underline-none active:on-underline focus:no-underline"
                    onClick={() => setOpen(false)}
                  >
                    <section className="flex items-center gap-3 py-3 px-2">
                      <i className="text-2xl flex items-center">{el?.icon}</i>
                      <span className="text-xl font-extralight">{t(el?.name)}</span>
                    </section>
                    <hr className="m-0" />
                  </Link>
                );
              })}
            </div>
          </Drawer.Body>
        </Drawer>
      </div>
    </>
  );
}

export default FooterNav;
