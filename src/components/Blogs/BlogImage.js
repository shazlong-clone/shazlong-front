import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

function BlogImage({ className, ...rest }) {
  return (
    <article className={twMerge('h-[250px] relative group', className)} {...rest}>
      <img
        width="100%"
        height="100%"
        className="object-cover rounded-t-lg"
        src="https://blog.shezlong.com/wp-content/uploads/2023/04/67-1.jpg"
        alt="dd"
      />
      <div className="absolute bg-[var(--rs-gray-100)]0 top-0 left-0 w-full h-full text-white rounded-t-lg overflow-hidden">
        <span className="bg-[var(--rs-bg-card)] text-cyan rounded-3xl font-bold px-3 py-2 absolute left-3 top-3 text-sm">
          welness
        </span>
        <div className="absolute bottom-0 left-0 p-2 translate-y-[100%] group-hover:translate-y-[0%] transition">
          <span className="text-sm">shred on:</span>
          <p className="flex items-center gap-2">
            <aside className="transition p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-blue-700 hover:text-white">
              <FaFacebookF />
            </aside>
            <aside className="transition p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-[#006cb3] hover:text-white">
              <FaLinkedinIn className="scale-[1.2]" />
            </aside>
            <aside className="transition p-2 rounded-full border border-white border-solid w-[30px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-sky-400 hover:text-white">
              <FaTwitter className="scale-[1.2]" />
            </aside>
          </p>
        </div>
      </div>
    </article>
  );
}

export default BlogImage;
