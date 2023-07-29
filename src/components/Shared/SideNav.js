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
    </>
  );
}

export default FooterNav;