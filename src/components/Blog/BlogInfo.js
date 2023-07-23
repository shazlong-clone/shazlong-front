import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { VscBook } from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

function BlogInfo({ className, ...rest }) {
  return (
    <>
      <aside className={twMerge('flex gap-2 mt-2 text-sm font-[500]', className)} {...rest}>
        <span>April 10, 2023</span>
        <span className="flex items-center">
          337 <AiFillEye className="text-xl" />
        </span>
        <span className="flex items-center">
          5min <VscBook className="text-xl text-gray" />
        </span>
      </aside>
    </>
  );
}

export default BlogInfo;
