import React from 'react';
import { GrGroup } from 'react-icons/gr';
import { BiVideoPlus } from 'react-icons/bi';
import { MdSupportAgent } from 'react-icons/md';
import { RiPsychotherapyLine } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { BiTestTube } from 'react-icons/bi';
import { FaBlog } from 'react-icons/fa';

import { Drawer } from 'rsuite';
import { Link } from 'react-router-dom';

const menu = [
  {
    name: 'Home',
    icon: <AiOutlineHome />
  },
  {
    name: 'Test',
    icon: <BiTestTube />
  },
  {
    name: 'Blog',
    icon: <FaBlog />,
  }

]
function FooterMenu() {

  const Menu = ({ title, icon,link }) => {
    return <section className='pointer hover:text-cyan/90 transition-all text-center'>
      <i className='text-2xl'>{icon}</i>
      <Link to={link} className='text-gray'>
        <div className='text-[13px]'>{title}</div>
      </Link>
    </section>
  }
  const [open, setOpen] = React.useState(false);

  return (
    <div className=' bg-white md:hidden w-full bottom-0 right-0 fixed text-gray cursor-pointer z-50'>
      <article className='flex gap-4 text-center justify-between py-3 px-4 shadow-2xl'>
        <div>
          <Menu title='Therapists' link='/therapists' icon={<GrGroup />} />
        </div>
        <div>
          <Menu title='Online' icon={<BiVideoPlus />} />
        </div>
        <div>
          <Menu title='My Therapy' icon={<RiPsychotherapyLine />} />
        </div>
        <div>
          <Menu title='Support' icon={<MdSupportAgent />} />
        </div>
        <div onClick={() => setOpen(true)}>
          <Menu title='More' icon={<FiMoreHorizontal />} />
        </div>
      </article>
      <Drawer size='full' placement='left' open={open} onClose={() => setOpen(false)} className='bg-gray'>
        <Drawer.Header>
          <Drawer.Title className='text-center text-2xl text-cyan'>More</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className='p-0'>
          <div>
            {menu?.map(el => {
              return <a key={Math.random()} href='/' className='text-gray active:underline-none'>
              <section className='flex items-center gap-3 py-3 px-2'>
                <i className='text-2xl'>
                  {el?.icon}
                </i>
                <span className='text-xl'>
                  {el?.name}
                </span>
              </section>
                <hr className='m-0' />
              </a>
            })}
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
}

export default FooterMenu;
