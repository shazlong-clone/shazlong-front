import React, { useState } from 'react';
import Card from '../components/Shared/Card';
import InternalHeader from '../components/Shared/InternalHeader';
import therapits from '../assets/images/therapist.webp'
import clsx from 'clsx';
import { Button, Steps } from 'rsuite';
import { Link } from 'react-router-dom';
 function MyTherapy() {
    const [activeTabe, setActiveTabe] = useState(1);
    const tabs = [
        {
            id:1,
            name:'Up Coming',
            content:'sssss'
        },
        {
            id:2,
            name:'Previouse',
            content:'sssss'

        },

    ]

    return (
        <main className='bg-gray/5 py-3'>
            <div className='container'>
                <InternalHeader>My Therapy</InternalHeader>
                <Card className='px-0 rounded-none border border-solid border-gray/20'>
                    <section className='text-center'>
                        <img src={therapits} alt='therapits' className='w-[100px] h-[100px] rounded-full' />
                        <h5 className='mt-2'>John Doe</h5>
                    </section>
                    <section>
                        <article>
                            <hr className='my-3' />
                                <ul className='px-0 mb-0 flex gap-2 list-none'>
                                    {
                                        tabs?.map(el => {
                                            return <li onClick={()=> setActiveTabe(el?.id)} className={clsx(activeTabe === el?.id && 'border-solid border-cyan border-b-2 border-x-0 border-t-0', 'py-2 px-3 cursor-pointer font-[500]' )}>{el?.name}</li>
                                        })
                                    }
                                </ul>
                            <hr className='my-0' />
                        </article>
                    </section>
                    <section className='py-5 px-2'>
                        <h6 className='mb-2'>Let's help you book your first session</h6>
                        <p>How to book your first session?</p>
                        <Card className='rounded-none border border-solid border-gray/20 mt-5'>
                            <Steps current={0} currentStatus='wait' vertical className='font-[500] text-xs'>
                                <Steps.Item title="Choose your therapist from our therapist list" description=" Choose your therapist from therapist list or let Shezlong chooses for you " />
                                <Steps.Item title="Reserve a session" description=" Choose time and date suit you " />
                                <Steps.Item title="Payment" description=" Choose your payment method among 3 different payment methods " />
                                <Steps.Item title={<Link to='/therapists'>Start your session</Link>} description=" Talk to your therapist online privately " />
                            </Steps>
                            <Button appearance='primary' className='mt-3' block>Book Your First Session</Button>
                        </Card>
                    </section>
                </Card>
            </div>
        </main>
    );
}

export default MyTherapy;