import React, { useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiInstagram } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

import { useHover } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { searckList } from '../../assets/constants';
import SearchIcon from '@rsuite/icons/Search';
function SearchDeskTop() {
  const [ref, hovering] = useHover();
  const [ref2, hovering2] = useHover();
  const [active, setActive] = useState([]);
  const [search, setSearch] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [search]);
  return (
    <>
      <main className="bg-[#EFF8FC] relative">
        <div className="container h-[70px]">
          {search ? (
            <section className="flex justify-between [&>article]:py-5 text-xl">
              <article className="grow">
                <input ref={inputRef} placeholder="Search Here" className="input-unset text-3xl" />
              </article>
              <article className="text-3xl flex items-center gap-2">
                <SearchIcon className="text-cyan cursor-pointer" />
                <RxCross2 onClick={() => setSearch(false)} className="cursor-pointer" />
              </article>
            </section>
          ) : (
            <section className="flex justify-between [&>article]:py-5">
              <article className="flex items-center cursor-pointer lg:flex-[1_1_33%]" ref={ref}>
                <span>Expolore By Topics</span>
                <span className="flex items-center">
                  <FiChevronDown />
                </span>
              </article>
              <article className="flex justify-center gap-10 items-center text-xl lg:flex-[1_1_33%]">
                <a target="_blank" href="https://www.facebook.com/ShezlongApp/" rel="noreferrer">
                  <FaFacebookF />
                </a>
                <a target="_blank" href="https://www.linkedin.com/company/shezlong/?originalSubdomain=ae" rel="noreferrer">
                  <FaLinkedinIn />
                </a>
                <a target="_blank" href="https://www.linkedin.com/company/shezlong/?originalSubdomain=ae" rel="noreferrer">
                  <FiInstagram />
                </a>
              </article>
              <article
                className=" inline-flex justify-end items-center gap-2 cursor-pointer lg:flex-[1_1_33%]"
                onClick={() => {
                  setSearch(true);
                }}
              >
                <SearchIcon />
                <span className="mt-[3px]">Search</span>
              </article>
            </section>
          )}
        </div>
        <div
          ref={ref2}
          className={clsx(
            'absolute bg-[var(--rs-bg-card)] bottom-0 transform translate-y-[100%] w-full shadow-xl flex items-center h-[80px] z-20',
            !search && (hovering || hovering2) ? 'block' : 'hidden',
          )}
        >
          <section className="container">
            <ul className="list-none p-0 font-bold flex gap-5 rounded-xl mb-0">
              {searckList?.map((el, i) => {
                return (
                  <li
                    onClick={() => {
                      if (active.includes(i)) {
                        setActive(active.filter((el) => el !== i));
                      } else {
                        setActive([...active, i]);
                      }
                    }}
                    className={clsx(
                      'border border-gray border-solid px-5 py-2 rounded-3xl cursor-pointer hover:outline-1 hover:outline',
                      active?.includes(i) ? 'bg-gray text-white' : '',
                    )}
                    key={Math.random()}
                  >
                    {el}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

export default SearchDeskTop;
