import React from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
function InternalHeader({ className, ...props }) {
  return (
    <section className={twMerge('flex justify-between items-center lg:mb-10 my-2 lg:my-5', className)}>
      <h3>
        <Link to={props?.link || '/'} className="flex items-center text-gray">
          <BsArrowLeftCircle />
        </Link>
      </h3>
      <h3>{props?.children}</h3>
      {props.icon ? <h3>{props.icon}</h3> : <h3>&nbsp; &nbsp;</h3>}
    </section>
  );
}

export default InternalHeader;
