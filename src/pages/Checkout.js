import React from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import { Avatar } from 'rsuite';
import therapist from '../assets/images/therapist.webp';
import Card from '../components/Shared/Card';
import { LuAlarmClock } from 'react-icons/lu';
import { GiCash } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { RadioTile, RadioTileGroup } from 'rsuite';
import visa_new from '../assets/images/visa_new.png';
import master_card_new from '../assets/images/master_card_new.svg';
import we from '../assets/images/we_icon.svg';
import orange from '../assets/images/orange_icon.svg';
import etisalat_icon from '../assets/images/etisalat_icon.svg';
import fawry from '../assets/images/fawry.png';
const instruction = [
  ' 1- Internet speed must not be not less than 2 MB/s. ',
  ' 2- The session room opens 10 minutes before your session start time. ',
  ' 3- If you face any difficulties before or during the session, both sides should contact the support team (the blue circle at the bottom) directly. ',
  <>4- If you cancel the session 6 hours or less before the session start time, a fee will be deducted from your paid amount. If you do not attend the session, then none of the fees will be refunded. Please read our cancellation and refund policy for more information click <Link to='/instructions'>here</Link> .</>,
  ' 5- For the session room, we recommend using a desktop computer or a laptop. If you are using a mobile device, please beware that only Safari is supported on Apple devices and we recommend Google Chrome on Android devices. It is also important for iOS devices to have the latest updates. ',
  ' 6- You can cancel or reschedule sessions only a limited number of times monthly. ',
  ' 7- Please make sure to attend your session from a quiet and an appropriate place. ',
  ' 8- If you are reserving the session from Egypt, you cannot access the session room from elsewhere. Reservations made from Egypt are paid in Egyptian pounds, while reservations made from elsewhere are paid in U.S. dollars. If the session is paid in a non-matching currency, it cannot be refunded. ',
];
function Checkout() {
  return (
    <main className='bg-cyan/5 py-5'>
      <div className='container'>
        <InternalHeader to='/'>Check Out</InternalHeader>
      </div>
      <div className='container'>
        <Card className='mb-0'>
          <section className='flex gap-2'>
            <Link to='/thearpist-profile/1'>
              <Avatar circle src={therapist} alt='img' />
            </Link>
            <aside>
              <div className='capitalize font-medium'>wassim Asgrf</div>
              <div className='text-cyan text-xs'>psychologist</div>
            </aside>
          </section>
          <section className='my-4'>
            {Array(2)
              .fill('')
              ?.map((el) => {
                return (
                  <Card
                    key={Math.random()}
                    className=' bg-gray/5 rounded-lg p-2 mb-0 mt-2 grid gap-2'
                  >
                    <article className='flex gap-2 items-center'>
                      <LuAlarmClock className='text-xl text-cyan' />
                      <aside className='text-sm'>
                        Today Jul 10 (1:00 PM : 2:00 PM)
                      </aside>
                    </article>
                    <article className='flex gap-2 items-center'>
                      <GiCash className='text-xl text-cyan' />
                      <aside className='font-semibold text-sm'>300 EGP</aside>
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
        <Card className='mt-8'>
          <RadioTileGroup
            defaultValue='private'
            aria-label='Visibility Level'
            className='check-meth'
          >
            <RadioTile
              icon={
                <div>
                  <img src={visa_new} alt='visa_new' />
                  <img src={master_card_new} alt='master_card_new' />
                </div>
              }
              label='Credit Card'
              value='private'
              className='h-[70px]'
            ></RadioTile>
            <RadioTile
              icon={
                <div className='flex gap-1'>
                  <img src={we} alt='we' />
                  <img src={orange} alt='orange' />
                  <img src={etisalat_icon} alt='etisalat_icon' />
                </div>
              }
              label='Vodavon Cash'
              value='internal'
              className='h-[70px]'
            />

            <RadioTile
              icon={<img className='w-16' src={fawry} alt='fawry' />}
              label='Fawry'
              value='public'
              className='h-[70px]'
            />
          </RadioTileGroup>
        </Card>
        <Card>
          <h4>
            <span>How to get the best session experience? </span>
            <span>collape</span>
          </h4>
          <ul className='px-0 list-none grid gap-2 text-sm'>
            {instruction?.map((el) => {
              return <li className='font-[500]'>{el}</li>;
            })}
          </ul>
        </Card>
      </div>
    </main>
  );
}

export default Checkout;
