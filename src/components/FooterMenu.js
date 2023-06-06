import React from 'react';
import { HiUserGroup } from 'react-icons/hi';
import { BiVideoPlus } from 'react-icons/bi';
import { MdSupportAgent } from 'react-icons/md';
import { RiPsychotherapyLine } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';

function FooterMenu() {
  const footerMenu = [
    { id: 1, title: 'Therapists', icon: <HiUserGroup /> },
    { id: 2, title: 'Online', icon: <BiVideoPlus /> },
    { id: 3, title: 'My Therapy', icon: <RiPsychotherapyLine /> },
    { id: 4, title: 'Support', icon: <MdSupportAgent /> },
    { id: 5, title: 'More', icon: <FiMoreHorizontal /> }
  ];
  return (
    <div className='bg-white fixed w-full bottom-0 right-0 text-gray p-2 cursor-pointer'>
      <article className='flex gap-4 text-center justify-between'>
        {footerMenu?.map((el) => {
          return (
            <section key={el?.id} className='pointer hover:text-cyan/90 transition-all text-center'>
              <i className='text-xl'>{el.icon}</i>
              <div className='text-sm'>{el?.title}</div>
            </section>
          );
        })}
      </article>
    </div>
  );
}

export default FooterMenu;
