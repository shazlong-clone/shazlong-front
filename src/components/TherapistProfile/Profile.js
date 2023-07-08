import React from 'react';
import { Badge, Button, Rate } from 'rsuite';
import therapist from '../../assets/images/therapist.webp';
import { GiWorld } from 'react-icons/gi';
import { BsFlag } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { RiPsychotherapyLine } from 'react-icons/ri';
import Card from '../Shared/Card';
function Profile(props) {
  return (
    <Card className='mb-5'>
      <section className='flex gap-5 lg:mb-5'>
        <article>
          <Badge color='green'>
            <img className='w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] rounded-full' alt='img' src={therapist} />
          </Badge>
        </article>
        <article className='grid gap-y-1'>
          <h6 className='lg:text-xl'>Jone Doe</h6>
          <h6 className='font-medium text-cyan lg:text-lg'>Psychiatrist</h6>
          <Rate defaultValue={4} readOnly size='xs'/>
          <aside className='flex gap-2 items-center text-xs'>
            <span className='underline'>4.48(344 Reviews)</span>{' '}
            <Button appearance='link' className='text-sm p-0'>
              Write Reviews
            </Button>
          </aside>
        </article>
      </section>
      <section className='mt-3'>
        <ul className='list-none p-0 text-sm grid gap-2 mt-2'>
          <li className='flex items-center gap-1'>
            <span className='text-cyan flex items-center gap-3'>
              <i className='flex items-center text-lg'>{<GiWorld />}</i>
              <aside className='text-lg'>Language:</aside>
            </span>
            <aside className='text-xs lg:text-base font-bold'>Arabic,English</aside>
          </li>
          <li className='flex items-center gap-1'>
            <span className='text-cyan flex items-center gap-3'>
              <i className='flex items-center text-lg'>{<BsFlag />}</i>
              <aside className='text-lg'>Counary:</aside>
            </span>
            <aside className='text-xs lg:text-base font-bold'>Egypt</aside>
          </li>
          <li className='flex items-center gap-1'>
            <span className='text-cyan flex items-center gap-3'>
              <i className='flex items-center text-lg'>{<SlCalender />}</i>
              <aside className='text-lg'>Join Date:</aside>
            </span>
            <aside className='text-xs lg:text-base font-bold'>5 years ago</aside>
          </li>
          <li className='flex items-center gap-1'>
            <span className='text-cyan flex items-center gap-3'>
              <i className='flex items-center text-lg'>{<RiPsychotherapyLine />}</i>
              <aside className='text-lg'>Nub of Sessions:</aside>
            </span>
            <aside className='text-xs lg:text-base font-bold'>1000+ session</aside>
          </li>
        </ul>
      </section>
      </Card>
  );
}

export default Profile;
