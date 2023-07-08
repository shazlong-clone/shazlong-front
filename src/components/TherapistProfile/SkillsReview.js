import React from 'react';
import Card from '../Shared/Card';
import { Rate, Slider } from 'rsuite';
import { AiFillStar } from 'react-icons/ai';
function SkillsReview(props) {
    const sliderSkills = [
        {
            name:'Communication',
            percent:4.5
        },
        {
            name:'Understanding of the situation',
            percent:4.2
        },
        {
            name:'Understanding of the situation',
            percent:4
        },
        {
            name:'Providing effective solutions',
            percent:3.5
        },
        {
            name:'Commitment to start and end times',
            percent:0.2
        }
    ]
  return (
    <Card className='slider-skills mb-5'>
      <section className='flex items-center gap-5'>
        <Rate size='xs' defaultValue={5} readOnly />
        <article className='flex gap-2 items-center'>
          <i className='bg-green rounded-full text-white w-5 h-5 inline-flex items-center justify-center'>
            <AiFillStar />
          </i>
          <aside className='text-xs'>48.1(943 reviews)</aside>
        </article>
      </section>
      <section className='grid'>
        {
            sliderSkills?.map(el => {
                return <article key={Math.random()} className='grid grid-cols-[1fr_30px] mt-2'>
                <span>
                  <h6 className='text-xs'>{el?.name}</h6>
                  <div className='flex justify-between items-center gap-2'>
                    <Slider className='grow' progress defaultValue={(el?.percent / 5).toFixed(2) *100} readOnly />
                    <aside>{el?.percent}</aside>
                  </div>
                </span>
                <span></span>
              </article>
            })
        }

      </section>
    </Card>
  );
}

export default SkillsReview;
