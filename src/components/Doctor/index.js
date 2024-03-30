import React, { useEffect } from 'react';
import { Avatar, Divider, Drawer, IconButton, Nav, Sidenav } from 'rsuite';
import MenuIcon from '@rsuite/icons/Menu';
import useMediaQuery from '../../hooks/useMediaQuery';
import clsx from 'clsx';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import SettingWhisper from './components/SettingWhisper';
import logo from '../../assets/images/shezlong-logo.svg';
import logoAr from '../../assets/images/shezlong-logo-ar.svg';
import { appNavs } from '../../config/NavConfig';
import { setActiveSideBar } from '../../features/theme/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IoHome } from 'react-icons/io5';
import { Icon } from '@rsuite/icons';

const NavItem = (props) => {
  const { title, eventKey, ...rest } = props;
  const dispatch = useDispatch();
  return (
    <Nav.Item
      onClick={() => {
        dispatch(setActiveSideBar(title));
      }}
      eventKey={eventKey}
      as={NavLink}
      {...rest}
    >
      {title}
    </Nav.Item>
  );
};

const NavList = () => {
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = React.useState('1');
  const { i18n } = useTranslation();
  const loacle = i18n.resolvedLanguage;
  return (
    <Nav activeKey={activeKey} onSelect={setActiveKey} className="overflow-hidden">
      <Sidenav.Header className="text-center">
        <img className="w-[170px] my-5 px-1 rtl:hidden" src={logo} />
        <img className="w-[170px] my-5 px-1 ltr:hidden" src={logoAr} />
        <div className="font-bold text-gray/80 text-[12px] text-center mb-5 tracking-[7px]">
          Doctor <br /> Dashboard
        </div>
        <Divider className="my-0" />
      </Sidenav.Header>
      <Nav.Item onClick={() => navigate('/')} eventKey="Home" icon={<Icon as={IoHome} />}>
        Home
      </Nav.Item>
      {appNavs.map((item) => {
        const { children, ...rest } = item;
        let newRest = { ...rest, to: `/${loacle}/doctor/${rest.to}` };
        if (children) {
          return (
            <Nav.Menu key={item.eventKey} placement="rightStart" trigger="hover" {...newRest}>
              {children.map((child) => {
                return <NavItem key={child.eventKey} {...child} />;
              })}
            </Nav.Menu>
          );
        }
        if (rest.target === '_blank') {
          return (
            <Nav.Item key={item.eventKey} {...newRest}>
              {item.title}
            </Nav.Item>
          );
        }

        return <NavItem key={rest.eventKey} {...newRest} />;
      })}
    </Nav>
  );
};
function DoctorLayout() {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const lg = useMediaQuery('lg');
  const handleOpen = (key) => {
    setOpen(true);
    setPlacement(key);
  };
  const { profile } = useSelector((state) => state?.doctor);

  const [expanded, setExpanded] = React.useState(true);
  const { activeSideBar } = useSelector((state) => state?.theme);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        <main className="hidden lg:block fixed" style={expanded ? { width: 250 } : {}}>
          <Sidenav expanded={expanded} className="min-h-screen">
            <Sidenav.Body>
              <NavList />
            </Sidenav.Body>
            <Sidenav.Toggle expanded={expanded} onToggle={(expanded) => setExpanded(expanded)} />
          </Sidenav>
        </main>
        <main className={clsx('bg-[var(--rs-gray-100)] grow transition-[0.3s]', expanded ? 'lg:ps-[250px]' : 'lg:ps-[58px]')}>
          <div className="lg:pb-5">
            <article className="max-lg:bg-[var(--rs-bg-card)] max-lg:shadow-sm max-lg:mb-5 max-lg:fixed w-full z-20">
              <section className="flex px-5 items-center justify-between py-2 lg:pt-5 lg:px-36">
                <article>
                  <IconButton className="lg:hidden bg-transparent" onClick={() => handleOpen('left')} icon={<MenuIcon />} />
                  <h4 className="hidden lg:block">{activeSideBar}</h4>
                </article>
                <article>
                  <div className="flex items-center gap-5">
                    {/* <NotificationWhisper /> */}
                    <SettingWhisper placement="bottomEnd" />
                    <Avatar className="cursor-pointer" circle src={profile?.photo} alt="@SevenOutman" />
                  </div>
                </article>
              </section>
            </article>
            <div className="max-lg:py-[70px] px-5 lg:px-36">
              <Outlet />
            </div>
          </div>
          {lg ? (
            ''
          ) : (
            <Drawer className="doctor-drawer" size="xs" placement={placement} open={open} onClose={() => setOpen(false)}>
              <Drawer.Body className="px-0 pt-0 bg-[#f7f7fa]">
                <Sidenav>
                  <Sidenav.Body>
                    <NavList />
                  </Sidenav.Body>
                </Sidenav>
              </Drawer.Body>
            </Drawer>
          )}
        </main>
      </div>
    </>
  );
}

export default DoctorLayout;
