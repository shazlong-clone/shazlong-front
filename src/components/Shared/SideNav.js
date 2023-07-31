import React, { useEffect, useState } from 'react';
import { BiGroup, BiMessageAltDetail } from 'react-icons/bi';
import { BiVideoPlus } from 'react-icons/bi';
import { MdSupportAgent } from 'react-icons/md';
import { RiPsychotherapyLine } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Avatar, AvatarGroup, Badge, Drawer } from 'rsuite';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { BiTestTube } from 'react-icons/bi';
import { FaBlog } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { CgClose } from 'react-icons/cg';
import logo_white from '../../assets/images/logo_white.png';
import cs1 from '../../assets/images/cs1.jpg';
import cs2 from '../../assets/images/cs2.png';
import cs3 from '../../assets/images/cs3.jpg';
import Card from './Card';
const menu = [
  {
    name: 'Home',
    icon: <AiOutlineHome />,
    link: '/',
  },
  {
    name: 'Psychmeter',
    icon: <BiTestTube />,
    link: '/psychometer',
  },
  {
    name: 'Blog',
    icon: <FaBlog />,
    link: '/blogs',
  },
];

function FooterNav() {
  const [activeTabe, setActiveTabe] = useState('/');

  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (!open && activeTabe === 4) {
      setActiveTabe(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const Menu = ({ title, icon, link, id }) => {
    return (
      <section className="pointer hover:text-cyan/90 transition-all text-center" onClick={() => setActiveTabe(id)}>
        <NavLink to={link} className={clsx(activeTabe === id ? 'text-cyan' : 'text-gray')}>
          <i className="text-2xl">{icon}</i>
          <div className="text-[12px]">{title}</div>
        </NavLink>
      </section>
    );
  };
  return (
    <>
      <div className=" bg-white md:hidden w-full bottom-0 right-0 fixed text-gray cursor-pointer z-50">
        <article className="flex gap-4 text-center justify-between py-3 px-4 shadow-2xl">
          <div>
            <Menu title="Therapists" id={0} link="/therapists" icon={<BiGroup />} />
          </div>
          <div>
            <Menu title="Online" id={1} link="/online" icon={<BiVideoPlus />} />
          </div>
          <div>
            <Menu title="My Therapy" id={2} link="/my-therapy" icon={<RiPsychotherapyLine />} />
          </div>
          <div>
            <Menu title="Support" id={3} icon={<MdSupportAgent />} />
          </div>
          <div onClick={() => setOpen(true)}>
            <Menu title="More" id={4} icon={<FiMoreHorizontal />} />
          </div>
        </article>
        <Drawer size="full" placement="left" open={open} onClose={() => setOpen(false)} className="bg-gray">
          <Drawer.Header>
            <Drawer.Title className="text-center text-2xl text-cyan">More</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="p-0">
            <div>
              {menu?.map((el) => {
                return (
                  <Link
                    key={Math.random()}
                    to={el?.link}
                    className="text-gray active:underline-none active:on-underline focus:no-underline"
                    onClick={() => setOpen(false)}
                  >
                    <section className="flex items-center gap-3 py-3 px-2">
                      <i className="text-2xl flex items-center">{el?.icon}</i>
                      <span className="text-xl font-extralight">{el?.name}</span>
                    </section>
                    <hr className="m-0" />
                  </Link>
                );
              })}
            </div>
          </Drawer.Body>
        </Drawer>
      </div>
      <div className="fixed top-0 left-0 h-[100vh] w-full bg-white z-[51]">
        <section className="text-white bg-cyan px-5 p-10">
          <article className="flex justify-between items-center">
            <img width="50px" height="50px" src={logo_white} alt="intercomcdn" />
            <CgClose />
          </article>
          <article className="mt-10 mb-4">
            <AvatarGroup stack>
              <Avatar circle key={cs1} src={cs1} alt="cs1" />
              <Avatar circle key={cs2} src={cs2} alt="cs2" />
              <Avatar circle key={cs3} src={cs3} alt="cs3" />
            </AvatarGroup>
          </article>
          <article>
            <h4 className="text-white/60">Hi Saeed !</h4>
            <h4>How We Can Help You</h4>
          </article>
        </section>
        <section className="px-5 pt-1 pb-5 bg-gradient-to-b from-cyan to-white">
          <Card className="text-gray rounded-[10px] py-4">
            <aside>
              <div>
                <strong className="text-[14px]">Send Us a message</strong>
                <p className="text-gray/60 text-[14px]">We typically reply in under a minute</p>
              </div>
              <div></div>
            </aside>
          </Card>
        </section>
        <section className="absolute bottom-0 py-6 shadow-[#00000024_0px_0px_25px] w-full border-t border-b-0 border-r-0 border-l-0  border-solid border-gray/5 flex justify-evenly text-3xl">
          <aside className="grid text-center text-cyan">
            <span className=" flex justify-center">
              <AiFillHome />
            </span>
            <strong className="text-sm">Home</strong>
          </aside>
          <aside className="grid text-center">
            <span className=" flex justify-center">
              <Badge content={1}>
                <BiMessageAltDetail />
              </Badge>
            </span>
            <strong className="text-sm">messages</strong>
          </aside>
        </section>
      </div>
    </>
  );
}

export default FooterNav;
