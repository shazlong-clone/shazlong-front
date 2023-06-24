import React from 'react';
import { HiUserGroup } from 'react-icons/hi';
import { BiVideoPlus } from 'react-icons/bi';
import { MdSupportAgent } from 'react-icons/md';
import { RiPsychotherapyLine } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Drawer } from 'rsuite';

function FooterMenu() {

  const Menu = ({title, icon}) =>{
    return <section className='pointer hover:text-cyan/90 transition-all text-center'>
      <i className='text-2xl'>{icon}</i>
      <div className='text-[13px]'>{title}</div>
    </section>
  }
  const [open, setOpen] = React.useState(false);

  return (
    <div className=' bg-white md:hidden w-full bottom-0 right-0 fixed text-gray cursor-pointer'>
      <article className='flex gap-4 text-center justify-between py-3 px-4'>
        <div>
          <Menu title='Therapists'  icon = {<HiUserGroup />} />
        </div>
        <div>
          <Menu title='Online'  icon = {<BiVideoPlus />} />
        </div>
        <div>
          <Menu title='My Therapy'  icon = {<RiPsychotherapyLine />} />
        </div>
        <div>
          <Menu title='Support'  icon = {<MdSupportAgent />} />
        </div>
        <div onClick={()=> setOpen(true)}>
          <Menu title='More'  icon = {<FiMoreHorizontal />} />
        </div>
      </article>
        <Drawer size='full' placement='left' open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title className='text-center text-2xl text-cyan'>More</Drawer.Title>
        </Drawer.Header>
          <Drawer.Body>
            <div></div>
          </Drawer.Body>
        </Drawer>
    </div>
  );
}

export default FooterMenu;
