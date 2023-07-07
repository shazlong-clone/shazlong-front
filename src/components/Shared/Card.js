import React from 'react';

function Card(props) {
  return <div className='bg-white mb-3 py-6 px-3 rounded-3xl'>
    {props.children}
  </div>;
}

export default Card;
