import React from 'react';
import Header from './Header';
import HIW1 from '../assets/images/how-it-works-1.png';
import HIW2 from '../assets/images/how-it-works-2.png';
import HIW3 from '../assets/images/how-it-works-3.png';
import clsx from 'clsx';

function HowItWorks() {
  const data = [
    {
      title: '1. Sign-up as a customer',
      body: 'Answer a few questions to get matched with the right therapist. You can also select the therapist yourself',
      img: HIW1,
    },
    {
      title: '2. Book your session',
      body: 'Choose date and time that suits you and pay using different payment methods',
      img: HIW2,
    },
    {
      title: '3. Start your journey',
      body: 'You can communicate with your therapist in different ways during the session: camera, mic, and chatting',
      img: HIW3,
    },
  ];
  return (
    <div>
      <Header>How It is Works</Header>
      <section className='flex flex-col lg:flex-row gap-y-5 bg-white rounded-lg p-5 flex-wrap justify-center lg:gap-x-12'>
        {data?.map((el, i, arr) => {
          return (
            <article className={clsx('flex gap-x-5 lg:w-[46%]')}>
              <img src={el?.img} alt={el?.title} />
              <div>
                <h5 className='text-cyan/95 mb-2'>{el?.title}</h5>
                <p className='text-gray/80'>{el?.body}</p>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default HowItWorks;
