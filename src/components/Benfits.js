import React from 'react';
import Header from './Header';
import benfit1 from '../assets/images/benfit1.png';
import benfit2 from '../assets/images/benfit2.png';
import benfit3 from '../assets/images/benfit3.png';

function Benfits(props) {
  const benfits = [
    {
      titile: 'Save time and effort',
      body: 'Get your session online. No waiting lists, no transportation hassles',
      img: benfit1,
    },
    {
      titile: 'Responsive team',
      body: 'Our support team is available to help you take your first step and answer non-clinical',
      img: benfit2,
    },
    {
      titile: 'Variety of options',
      body: 'A large number of therapists in various specialties ready to help you with whatever you are facing.',
      img: benfit3,
    },
  ];
  return (
    <div>
      <Header>Our Members Benefit From</Header>
      <div>
        <section className='lg:flex gap-5'>
          {benfits?.map((el, i) => {
            return (
              <div className='bg-white my-12 rounded-2xl p-6 shadow-xl lg:flex-[1_1_30%]'>
                <article
                  key={el?.titile}
                  className='flex justify-between relative'
                >
                  <h5 className='text-cyan/80 mb-3'>{el?.titile}</h5>
                  <img
                    src={el?.img}
                    alt={el?.titile}
                    className='absolute top-[-50px] right-0 w-20'
                  />
                </article>
                <section>{el?.body}</section>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Benfits;
