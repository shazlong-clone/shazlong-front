import React from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import { Avatar } from 'rsuite';
import therapist from '../assets/images/therapist.webp';
import Card from '../components/Shared/Card';
import { LuAlarmClock } from 'react-icons/lu';
import { GiCash } from 'react-icons/gi';

function Checkout() {
  return (
    <main className='bg-cyan/5 py-5'>
      <div className='container'>
        <InternalHeader to='/'>Check Out</InternalHeader>
      </div>
      <div className='container'>
        <Card className='mb-0'>
          <section className='flex gap-2'>
            <Avatar circle src={therapist} alt='img' />
            <aside>
              <div className='capitalize font-medium'>wassim Asgrf</div>
              <div className='text-cyan text-xs'>psychologist</div>
            </aside>
          </section>
          <section className='mt-4'>
            {Array(2)
              .fill('')
              ?.map((el) => {
                return (
                  <Card
                    key={Math.random()}
                    className=' bg-gray/5 rounded-lg p-2 mb-0 mt-2'
                  >
                    <article className='flex gap-2 items-center'>
                      <LuAlarmClock className='text-2xl text-cyan' />
                      <aside>Today Jul 10 (1:00 PM : 2:00 PM)</aside>
                    </article>
                    <article className='flex gap-2 items-center'>
                      <GiCash className='text-2xl text-cyan' />
                      <aside className='font-semibold'>300 EGP</aside>
                    </article>
                  </Card>
                );
              })}
          </section>
          <section className='mt-3 grid gap-2 capitalize'>
            <article className='flex justify-between'>
              <span>subtotal</span>
              <span>600 EGP</span>
            </article>
            <article className='flex justify-between'>
              <span>Transction Feez</span>
              <span>33 EGP</span>
            </article>
            <article className='flex justify-between'>
              <span>Discount</span>
              <span className='line-through'>600 EGP</span>
            </article>
            <article className='flex justify-between font-bold'>
              <span>Total</span>
              <span>633 EGP</span>
            </article>
          </section>
        </Card>
      </div>
    </main>
  );
}

export default Checkout;
