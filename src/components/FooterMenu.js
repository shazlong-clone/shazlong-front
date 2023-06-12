import React from 'react';
import { HiUserGroup } from 'react-icons/hi';
import { BiVideoPlus } from 'react-icons/bi';
import { MdSupportAgent } from 'react-icons/md';
import { RiPsychotherapyLine } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Drawer, Placeholder } from 'rsuite';

function FooterMenu() {
  const footerMenu = [
    { id: 1, title: 'Therapists', icon: <HiUserGroup /> },
    { id: 2, title: 'Online', icon: <BiVideoPlus /> },
    { id: 3, title: 'My Therapy', icon: <RiPsychotherapyLine /> },
    { id: 4, title: 'Support', icon: <MdSupportAgent /> },
    { id: 5, title: 'More', icon: <FiMoreHorizontal /> }
  ];
  const [open, setOpen] = React.useState(false);

  return (
    <div className=' bg-white md:hidden fixed w-full bottom-0 right-0 text-gray p-2 cursor-pointer'>
      <article className='flex gap-4 text-center justify-between'>
        {footerMenu?.map((el) => {
          return (
            <section onClick={()=>  el?.id === 5 ? setOpen(true) : ''} key={el?.id} className='pointer hover:text-cyan/90 transition-all text-center'>
              <i className='text-2xl'>{el.icon}</i>
              <div className='text-[13px]'>{el?.title}</div>
            </section>
          );
        })}
      </article>
      <Drawer size='xs' placement='left' open={open} onClose={() => setOpen(false)}>
        <Drawer.Body>
          <Placeholder.Paragraph rows={8} />
        </Drawer.Body>
      </Drawer>
    </div>
  );
}

export default FooterMenu;
