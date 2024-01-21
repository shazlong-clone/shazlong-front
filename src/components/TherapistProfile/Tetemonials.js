import React from 'react';

import { Button, Rate } from 'rsuite';

import Card from '../Shared/Card';

const data = [
  {
    to: 'Mohamed Rashad',
    stars: 4.5,
    time: 'a Day ago',
    message: '  Thanks Dr. Basmaaaaaa 🥰  ',
  },
  {
    to: 'Saeed Khaled',
    stars: 4.5,
    time: '2 Days ago',
    message: '  first session, it was good 🤍   ',
  },
  {
    to: 'Saeed Khaled',
    stars: 4.5,
    time: '2 Days ago',
    message: '  first session, it was good 🤍   ',
  },
];

function Tetemonials() {
  return (
    <div>
      <section className="text-center">
        <Card className="text-start">
          <h4 className="text-center">Tetemonials</h4>
          {data?.map((el) => {
            return (
              <div key={el?.message} className="py-2">
                <Rate size="xs" defaultValue={3} readOnly />
                <section>{el?.message}</section>
                <section className="flex justify-between items-center">
                  <article>
                    <span>sae...</span>{' '}
                  </article>
                  <article className="text-gray/60 font-light">aday ago</article>
                </section>
                <hr className="m-0" />
              </div>
            );
          })}
          <section className="text-center">
            <Button className="no-underline active:no-underline focus:no-underline" appearance="link">
              view more review
            </Button>
          </section>
        </Card>
      </section>
    </div>
  );
}

export default Tetemonials;
