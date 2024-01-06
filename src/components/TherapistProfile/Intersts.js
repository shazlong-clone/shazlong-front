import React from 'react';
import Card from '../Shared/Card.js';

function Intersts() {
  const interstes = [
    'Mood disorders (depression)',
    'Anxiety disorders and obsessions',
    'Psychotic disorders',
    'Psychotic disorders',
    'Psychotic disorders',
    'Psychotic',
  ];
  return (
    <Card className="mb-5">
      <h5 className="text-cyan font-normal mb-3">Intersts</h5>
      <section className="flex gap-1 flex-wrap">
        {interstes?.map((el) => {
          return (
            <span
              key={Math.random()}
              className="bg-[var(--rs-green-100)] mb-2 text-xs font-bold px-3 py-1 rounded-3xl text-green/60 inline-block"
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
