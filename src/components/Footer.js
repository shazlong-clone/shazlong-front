import React from 'react';
import shezlongLogoLight from '../assets/images/shezlong-logo-light.svg';
import ssl from '../assets/images/secure-ssl.svg';
import ismho from '../assets/images/ismho-grey.webp';
import SVLogoFill from '../assets/images/SVLogoFill.svg';

function Footer() {
  return (
    <div className='bg-gray/90 text-white py-10 mt-20 lg:mt-0 md:px-10 md:py-16'>
      <div className='container'>
        <section className='lg:flex lg:gap-10'>
          <article className='text-center lg:text-start mb-5 lg:mb-0 border-b border-t-0 border-r-0 border-l-0 border-b-white border-solid lg:flex-[1_1_50%] lg:border-b-0 '>
            <img
              src={shezlongLogoLight}
              className='w-[50%] md:w-[40%] mb-4 lg:w-[60%]'
              alt='logo-light'
            />
            <p className='text-center my-5 text-[18px] lg:text-start'>
              Shezlong is number one in online Arabic psychotherapy worldwide
            </p>
            <div className='flex gap-4 items-center justify-center mb-10'>
              <img src={ssl} className='h-[25px] border' alt='ssl' />
              <img src={ismho} className='h-[40px]' alt='ismho' />
            </div>
          </article>
          <article className='w-[1px] bg-white'></article>
          <article className='md:flex-[1_1_50%]'>
            <div className='flex justify-between'>
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
              <h2 className='text-3xl lg:text-xl lg:text-start lg:mb-5'>Join us</h2>
              <section className='lg:flex items-center gap-2'>
                <button className='font-bold border mt-5 lg:mt-0 rounded-lg border-white text-white bg-opacity-0 bg-gray py-3 px-14 lg:px-0 md:block md:w-full'>
                  Join as a Client
                </button>
                <div className='my-3'>Or</div>
                <button className='font-bold border rounded-lg border-white text-white bg-opacity-0 bg-gray py-3 px-14 lg:px-0 md:block md:w-full'>
                  Join as a Therapist
                </button>
              </section>
                <div className='mt-5'>if you have an account <a href='/' className='text-white hover:text-white underline'>Sign in</a> </div>
            </div>
          </article>
        </section>
      </div>
      <div className='text-center m-7'>
        <a href='https://saeedkhal.github.io/saeed-khaled-portfolio/' className='text-white hover:text-white underline'>
        Copyright © {new Date().getFullYear()} <img className='w-[30px] text-cyan' src={SVLogoFill} alt='d' /> Saeed Khaled
        <br />
        
        </a>
      </div>
    </div>
  );
}

export default Footer;
