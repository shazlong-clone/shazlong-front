import React from 'react';

function Hero() {
  return (
    <div className='py-10 bg-no-repeat bg-right-bottom bg-[length:68%] md:bg-[length:60%] lg:bg-[length:65%] bg-hero'>
      <div className='container'>
        <div className='max-w-[400px] lg:max-w-[600px]'>
          <p className='font-light text-sm'>YOU TALK WE HELP</p>
          <h2 className='text-2xl mb-3 text-gray/80 leading-8 md:text-6xl'>
            <span className='font-light'>Talk </span>
            <span className='font-bold'>
              to your therapist online privately
            </span>
            <span className='font-light'> anytime anywhere!</span>
          </h2>
          <p className='text-gray/60 md:text-xl'>
            Shezlong is number one in online <br /> Arabic psychotherapy
            worldwide.
          </p>
        </div>
        <section className='mt-16 mb-5 flex flex-col gap-4 md:mb-32'>
          <button className='bg-cyan/90 hover:bg-cyan transition-all text-white py-2 px-10 rounded-lg text-sm w-[250px]'>
            Explore Our Therapists
          </button>
          <button className='border rounded-lg border-cyan/90 hover:border-cyan bg-white text-cyan/90 hover:text-cyan transition-all text-sm px-10 py-2 w-[250px]'>
            Get Matched
          </button>
        </section>
      </div>
    </div>
  );
}

export default Hero;
