import React from 'react';
import agent1 from '../assets/images/agent1.webp';
import agent2 from '../assets/images/agent2.webp';
import agent3 from '../assets/images/agent3.webp';
import agent4 from '../assets/images/agent4.webp';
import needHelp from '../assets/images/need-help.svg';
import { Button } from 'rsuite';
import clsx from 'clsx';
import useMediaQuery from '../utils/useMediaQuery';

const agents = [agent1, agent2, agent3, agent4]
function Help() {
    const lg = useMediaQuery('lg')
    return (
        <div className={clsx('lg:bg-cyan/20 p-4 bg-white rounded-lg lg:p-10')}>
            <h3 className='lg:text-center text-gray/80 text-[20px] lg:text-[30px] lg:mb-9'>
                Still need help?
            </h3>
            <div className='flex'>
                <section className='lg:flex-[1_1_50%]'>
                    <h5 className='text-[13px] font-normal lg:font-bold lg:text-[20px] lg:mb-10'>
                    Our customer support team is always here to answer your non-clinical questions
                    </h5>
                    <p className='hidden lg:block lg:font-extralight mb-10'>
                    Contact them anytime anywhere to get the desired help, use the button below or the blue circle on the bottom right side.
                    </p>
                    <div>

                    <article className='flex text-center mt-5 justify-center gap-3 lg:justify-start'>
                        {
                            agents?.map((agent,i) => {
                                return <img className='w-[50px] lg:w-[75px]' key={i} src={agent} alt='img'  />
                            })
                        }
                    </article>
                    <article className='flex justify-center lg:justify-start'>
                    <button className='border block rounded-lg border-cyan/90 hover:border-cyan bg-white text-cyan/90 hover:text-cyan transition-all text-sm lg:text-md px-14 py-3 lg:mt-14'>
                    Chat with Support Team
                     </button>
                    </article>
                    </div>
                </section>
                <img className='hidden lg:block lg:flex-[1_1_50%]' src={needHelp} alt='img' />
            </div>
        </div>
    );
}

export default Help;