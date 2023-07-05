import React from 'react';
import { Avatar, Badge, Button, Rate, Stack } from 'rsuite';


import { BsPersonSquare } from 'react-icons/bs';
import { GiAlarmClock } from 'react-icons/gi';
import { GiCash } from 'react-icons/gi';
function TherapistsCard(props) {
    return (
        <>
        {Array(5)
        .fill('')
        ?.map((el) => {
          return (
              <section key={Math.random()} className='bg-white rounded-3xl mt-3 p-6 text-sm'>
                <div className='flex gap-5'>
                  <Badge color='green'>
                    <Avatar
                      size='lg'
                      circle={true}
                      src='https://scontent.shezlong.com/therapist_profile_pictures/47164-f77d757bedb7b0f4ae9ecc5da5069600.webp'
                      alt='@superman66'
                    />
                  </Badge>
                  <article className='grow'>
                    <p>Mohamed Abdelwareth</p>
                    <div className='flex justify-between text-xs my-1 text-cyan'>
                      <section>Psychiatrist</section>
                      <section>
                        <BsPersonSquare /> <span>25+</span>
                        <span>Sessions</span>
                      </section>
                    </div>
                    <Rate size='xs' defaultValue={3} />
                    <div className='text-xs'>5(3 Reviews)</div>
                  </article>
                </div>
                <p className='my-2'>Interests:</p>
                <div className='flex flex-wrap gap-2 text-xs'>
                  {['Communication Disorders', 'PTSD']?.map((el) => {
                    return (
                      <section key={Math.random()} className='bg-green/10 text-green rounded-xl px-3 py-1'>
                        {el}
                      </section>
                    );
                  })}
                </div>
                <div className='my-2 flex items-center text-xs gap-1'>
                  <i className='text-xl text-cyan flex items-center'>
                    <GiAlarmClock />
                  </i>
                  <span>Nearest session : Thursday, Jul. 27 at 10:00 AM </span>
                </div>
                <div className='flex items-center gap-1'>
                  <i className='text-xl text-cyan flex items-center'>
                    <GiCash />
                  </i>
                  <span className='text-cyan font-bold'> EGP 450 </span>
                  <span>/ 30 mins </span>
                  <span className='text-cyan font-bold'>
                    EGP 900
                  </span>
                  <span>/ 60 mins </span>
                </div>
                <Stack justifyContent='space-around' className='mt-5'>
                  <Button>View Profile</Button>
                  <Button appearance='primary'>Book Now</Button>
                </Stack>
              </section>
          );
        })}
        </>
    );
}

export default TherapistsCard;