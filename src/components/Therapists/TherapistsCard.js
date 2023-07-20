import React from 'react';
import { Avatar, Badge, Button, Rate } from 'rsuite';

import { BsPersonSquare } from 'react-icons/bs';
import { GiAlarmClock } from 'react-icons/gi';
import { GiCash } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import therapist from '../../assets/images/therapist.webp';

function TherapistsCard() {
  return (
    <>
      <main className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-2">
        {Array(5)
          .fill({ id: 1 })
          ?.map((el) => {
            return (
              <section key={Math.random()} className="bg-white rounded-3xl mt-3 p-6 text-sm lg:mb-5 lg:mt-0">
                <div className="flex gap-5">
                  <Link to={`/thearpist-profile/${el?.id}`}>
                    <Badge color="green">
                      <Avatar size="lg" circle={true} src={therapist} alt="@superman66" />
                    </Badge>
                  </Link>
                  <article className="grow">
                    <p>Mohamed Abdelwareth</p>
                    <div className="flex justify-between text-xs my-1 text-cyan">
                      <section>Psychiatrist</section>
                      <section>
                        <BsPersonSquare /> <span>25+</span>
                        <span>Sessions</span>
                      </section>
                    </div>
                    <Rate size="xs" defaultValue={3} />
                    <div className="text-xs">5(3 Reviews)</div>
                  </article>
                </div>
                <p className="my-2">Interests:</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Communication Disorders', 'PTSD']?.map((el) => {
                    return (
                      <section key={Math.random()} className="bg-green/10 text-green rounded-xl px-3 py-1">
                        {el}
                      </section>
                    );
                  })}
                </div>
                <div className="my-2 flex items-center text-xs gap-1">
                  <i className="text-xl text-cyan flex items-center">
                    <GiAlarmClock />
                  </i>
                  <span>Nearest session : Thursday, Jul. 27 at 10:00 AM </span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="text-xl text-cyan flex items-center">
                    <GiCash />
                  </i>
                  <span className="text-cyan font-bold"> EGP 450 </span>
                  <span>/ 30 mins </span>
                  <span className="text-cyan font-bold">EGP 900</span>
                  <span>/ 60 mins </span>
                </div>
                <div className="mt-5">
                  <Link to={`/thearpist-profile/${el?.id}`} className="block">
                    <Button appearance="primary" block>
                      View Profile
                    </Button>
                  </Link>
                </div>
              </section>
            );
          })}
      </main>
    </>
  );
}

export default TherapistsCard;
