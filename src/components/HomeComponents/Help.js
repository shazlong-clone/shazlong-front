import React from 'react';
import agent1 from '../../assets/images/agent1.webp';
import agent2 from '../../assets/images/agent2.webp';
import agent3 from '../../assets/images/agent3.webp';
import agent4 from '../../assets/images/agent4.webp';
import needHelp from '../../assets/images/need-help.svg';
import clsx from 'clsx';
import { Button } from 'rsuite';

const agents = [agent1, agent2, agent3, agent4];
function Help() {
  return (
    <main className=' lg:bg-cyan/20 bg-white  rounded-lg lg:rounded-none '>
      <div className={clsx( 'p-4 lg:p-10 lg:container m-auto')}>
        <h3 className='lg:text-center text-gray/80 text-[20px] lg:text-[30px] lg:mb-9'>
          Still need help?
        </h3>
        <div className='lg:flex'>
          <section className='lg:flex-[1_1_50%]'>
            <h5 className='text-[13px] font-normal lg:font-bold lg:text-[20px] lg:mb-10'>
              Our customer support team is always here to answer your
              non-clinical questions
            </h5>
            <p className='hidden lg:block lg:font-extralight mb-10'>
              Contact them anytime anywhere to get the desired help, use the
              button below or the blue circle on the bottom right side.
            </p>
            <div>
              <article className='flex text-center mt-5 justify-center gap-3 lg:justify-start'>
                {agents?.map((agent, i) => {
                  return (
                    <img
                      className='w-[50px] lg:w-[75px]'
                      key={Math.random()}
                      src={agent}
                      alt='img'
                    />
                  );
                })}
              </article>
              <article className='flex justify-center lg:justify-start mt-5'>
                <Button appearance='primary'>Chat with Support Team</Button>
              </article>
            </div>
          </section>
          <section className='hidden lg:block lg:flex-[1_1_50%] text-center'>
            <img className='lg:w-[450px]' src={needHelp} alt='img' />
          </section>
        </div>
      </div>
    </main>
  );
}

export default Help;
