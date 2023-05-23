import React from 'react';
import shezlongLogoLight from '../assets/images/shezlong-logo-light.svg';
import ssl from '../assets/images/secure-ssl.svg';
import ismho from '../assets/images/ismho-grey.webp';
function Footer() {
  return (
    <div className='bg-gray/90 text-white pt-16 pb-32 mt-20 lg:mt-0 md:px-10 md:py-16'>
      <div className='container'>
        <section className='lg:flex lg:gap-10'>
          <article className='text-center mb-5 lg:mb-0 border-b border-t-0 border-r-0 border-l-0 border-b-white border-solid lg:flex-[1_1_50%] lg:border-b-0 '>
            <img
              src={shezlongLogoLight}
              className='w-[50%] md:w-[40%] mb-4 lg:w-[50%]'
              alt='logo-light'
            />
            <p className='text-center my-5 text-[18px] lg:text-start font-light'>
              Shezlong is number one in online Arabic psychotherapy worldwide
            </p>
            <div className='flex gap-4 items-center justify-center mb-10'>
              <img src={ssl} className='h-[25px] border' alt='ssl' />
              <img src={ismho} className='h-[40px]' alt='ismho' />
            </div>
          </article>
          <article className='w-[1px] bg-white'></article>
          <article className='md:flex-[1_1_50%]'>
            <div className='flex justify-between font-light'>
              <section>
                <h4 className='mb-4 font-bold'>Shezlong</h4>
                <p>Terms and conditions</p>
                <p>Privacy and Policy</p>
              </section>
              <section>
                <h4 className='mb-4 font-bold'>Resources</h4>
                <p>Psychological Tests</p>
                <p>Blog</p>
                <p>Emergency numbers</p>
              </section>
            </div>
            <div className='text-center mt-10'>
              <h2 className='text-3xl lg:text-xl lg:text-start'>Join us</h2>
              <button className='font-bold border mt-5 rounded-lg border-white text-white bg-opacity-0 bg-gray py-4 px-14 md:block md:w-full'>
                Join as a Therapist
              </button>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

export default Footer;
