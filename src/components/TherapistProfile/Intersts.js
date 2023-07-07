import React from 'react';
import Card from '../Shared/Card.js';

function Intersts(props) {
  const interstes = [
    'Mood disorders (depression)',
    'Anxiety disorders and obsessions',
    'Psychotic disorders',
  ];
  return (
    <Card>
      <h5 className='text-cyan font-normal mb-3'>Intersts</h5>
      <section>
        {interstes?.map((el) => {
          return (
            <span
              key={Math.random()}
              className='bg-green/10 mb-2 text-sm px-3 py-1 rounded-3xl text-green inline-block'
            >
              {el}
            </span>
          );
        })}
      </section>
    </Card>
  );
}

export default Intersts;
