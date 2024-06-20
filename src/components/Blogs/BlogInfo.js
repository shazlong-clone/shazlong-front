import moment from 'moment';
import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { VscBook } from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

function BlogInfo({ className, blog, ...rest }) {
  return (
    <>
      <aside className={twMerge('flex gap-2 my-2 text-sm font-[500]', className)} {...rest}>
        <span className="pt-1">{moment(blog?.createdAt)?.isValid() ? moment(blog?.createdAt)?.format('MMMM D, YYYY') : ''}</span>
        <span className="flex items-center gap-1">
          <span className="pt-1">{blog?.numOfReader}</span>
          <AiFillEye className="text-xl" />
        </span>
        <span className="flex items-base gap-1">
          <span className="pt-1">{blog?.durationOfReading}</span>
          <VscBook className="text-xl text-gray" />
        </span>
      </aside>
    </>
  );
}

export default BlogInfo;
