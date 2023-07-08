import React from 'react';
import { twMerge } from 'tailwind-merge'

function Card({className, ...props}) {
  return <div {...props} className={twMerge('bg-white mb-3 py-6 px-3 rounded-3xl', className)}>
    {props.children}
  </div>;
}

export default Card;
