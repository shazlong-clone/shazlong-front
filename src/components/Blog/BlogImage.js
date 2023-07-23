import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

function BlogImage({ className, ...rest }) {
  return (
    <article className={twMerge('h-[400px] relative', className)} {...rest}>
      <img
        width="100%"
        height="100%"
        className="object-cover rounded-lg"
        src="https://blog.shezlong.com/wp-content/uploads/2023/04/67-1.jpg"
        alt="dd"
      />
      <div className="absolute bg-gray/50 top-0 left-0 w-full h-full text-white rounded-lg ">
        <span className="bg-white text-cyan rounded-3xl font-bold px-3 py-2 absolute left-3 top-3 text-sm">welness</span>
        <div className="absolute bottom-0 left-0 p-2">
          <span className="text-sm">shred on:</span>
          <p className="flex items-center gap-2">
            <aside className="p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
              <FaFacebookF />
            </aside>
            <aside className="p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
              <FaLinkedinIn className="scale-[1.2]" />
            </aside>
            <aside className="p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
              <FaTwitter className="scale-[1.2]" />
            </aside>
          </p>
        </div>
      </div>
    </article>
  );
}

export default BlogImage;
