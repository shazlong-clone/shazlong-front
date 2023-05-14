import React from 'react';
import shazlongLogo from '../assets/images/shezlong-logo.svg';
function NavBar() {
  return (
    <div className='items-center border-b-[1px] border-gray/10 px-4 py-3 lg:px-20 bg-white'>
      <div className='max-w-6xl flex justify-between items-center m-auto'>
        <section>
          <img src={shazlongLogo} alt='logo' className='w-[160px]' />
        </section>
        <section className='hidden md:block'>
          <ul className='flex gap-5 text-gray/75 cursor-pointer list-none'>
            <li className='hover:text-green'>Therapists List</li>
            <li className='hover:text-green'>Psychometer</li>
            <li className='hover:text-green'>Blog</li>
          </ul>
        </section>
        <section className='flex gap-2 items-center lg:gap-5'>
          <article className='text-gray/75 cursor-pointer hover:underline'>
            العربية
          </article>
          <article className='text-green border border-green py-1 px-4 rounded-xl cursor-pointer lg:px-10 lg:py-2'>
            Sign In
          </article>
          <article className='text-white bg-green py-1 px-4 rounded-xl cursor-pointer lg:px-10 lg:py-2'>
            Sign up
          </article>
        </section>
      </div>
    </div>
  );
}

export default NavBar;
