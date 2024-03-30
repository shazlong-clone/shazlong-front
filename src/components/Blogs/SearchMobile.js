import React, { useEffect, useRef } from 'react';
import InternalHeader from '../Shared/InternalHeader';
import { Animation, Button } from 'rsuite';
import AlignJustifyIcon from '@rsuite/icons/legacy/AlignJustify';
import CloseIcon from '@rsuite/icons/Close';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import clsx from 'clsx';
import SearchIcon from '@rsuite/icons/Search';
import { FaFacebookF } from 'react-icons/fa';
import { GrLinkedinOption } from 'react-icons/gr';
import { FiInstagram } from 'react-icons/fi';
import { searckList } from '../../assets/constants';
function SearchMobile() {
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const inputRef = useRef();
  const onChange = () => setShow(!show);
  const Drop = React.forwardRef((props, ref) => (
    <div {...props} ref={ref}>
      <div className="text-gray bg-[#EFF8FC]">
        <ul className="list-none  font-[600] [&>li]:py-2 text-sm ">
          {searckList?.map((el) => {
            return (
              <li className="cursor-pointer" key={Math.random()}>
                {el}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  ));
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);
  return (
    <>
      <div className="container">
        <InternalHeader
          className="py-2"
          icon={
            <Button className="flex items-center text-xl font-bold text-gray p-4 bg-transparent" block onClick={onChange}>
              {
                <>
                  <AlignJustifyIcon className={clsx('absolute', !show ? 'animate-scallup' : 'animate-scalldown')} />
                  <CloseIcon className={clsx('absolute', show ? 'animate-scallup' : 'animate-scalldown')} />
                </>
              }
            </Button>
          }
        >
          Blogs
        </InternalHeader>
      </div>

      <div className="font-bold">
        <Animation.Collapse in={show}>
          {(props, ref) => (
            <main {...props} ref={ref}>
              <div className="text-gray bg-[#EFF8FC] px-4 py-5">
                <section className="flex items-center justify-between gap-2 mb-5 text-3xl">
                  <input ref={inputRef} className="input-unset text-base placeholder-opacity-5" placeholder="Search" />
                  <SearchIcon className="font-normal cursor-pointer text-3xl" />
                </section>
                <section onClick={() => setOpen(!open)} className="flex justify-between cursor-pointer mb-5">
                  <span>Seciality </span>
                  <span>
                    <ArrowDownLineIcon className={clsx(open ? 'animate-rclock' : 'animate-raclock')} />
                  </span>
                </section>
                <Animation.Collapse in={open}>{(props, ref) => <Drop {...props} ref={ref} />}</Animation.Collapse>
                <section className="flex divide-y-0 divide-x divide-solid [&>a]:px-10 [&>a]:grow text-center mt-10 text-2xl">
                  <a href="https://www.facebook.com/ShezlongApp/">
                    <FaFacebookF />
                  </a>
                  <a href="https://www.linkedin.com/company/shezlong/?originalSubdomain=ae">
                    <GrLinkedinOption />
                  </a>
                  <a href="https://www.linkedin.com/company/shezlong/?originalSubdomain=ae">
                    <FiInstagram />
                  </a>
                </section>
              </div>
            </main>
          )}
        </Animation.Collapse>
      </div>
    </>
  );
}

export default SearchMobile;
