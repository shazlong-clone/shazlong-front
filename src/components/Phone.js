import React from 'react';
import Header from './Header';
import DawnloadApp from '../assets/images/download-app-new.webp';
import GooglePlay from '../assets/images/google-play.svg';
import Apple from '../assets/images/app-store.svg';
function Phone() {
  return (
    <div>
      <div className='mt-[-40px] mb-12'>
        <Header>
          Download Our App Now
          <br />
          <div className='lg:hidden'>Taking Care of your Mental Health</div>
        </Header>
      </div>
      <div className='lg:flex gap-5'>
        <img
          src={DawnloadApp}
          alt='dawnload-app'
          className='w-full lg:w-[50%] md:w-[70%] m-auto block lg:h-[300px]'
        />
        <section>
          <h2 className='hidden lg:block lg:text-cyan/90'>
            Taking Care of your Mental Health
          </h2>
          <p className='text-center lg:text-xl lg:text-start lg:my-9 lg:font-light'>
            Enjoy a smoother and easier therapy experience on mobile. Download
            our app today
          </p>
          <article className='flex gap-4 my-5'>
            <img
              src={GooglePlay}
              alt='GooglePlay'
              className='w-[40%] md:w-[30%]'
            />
            <img src={Apple} alt='Apple' className='w-[40%] md:w-[30%]' />
          </article>
        </section>
      </div>
    </div>
  );
}

export default Phone;
