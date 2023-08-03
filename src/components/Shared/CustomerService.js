import React, { useState } from 'react';
import { Avatar, AvatarGroup, Badge } from 'rsuite';
import { IoMdSend } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { BiMessageAltDetail } from 'react-icons/bi';
import Card from './Card';
import { CgClose } from 'react-icons/cg';
import logo_white from '../../assets/images/logo_white.png';
import cs1 from '../../assets/images/cs1.jpg';
import cs2 from '../../assets/images/cs2.png';
import cs3 from '../../assets/images/cs3.jpg';
import clsx from 'clsx';
import { MdArrowBackIosNew } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { closeChat } from '../../features/theme/themeSlice';
function CustomerService() {
  const dispatch = useDispatch();
  const [activeTabe, setActiveTabe] = useState(1);
  const { isChatOpen } = useSelector((state) => state?.theme);
  return (
    <div className={clsx('fixed top-0 left-0 h-[100vh] w-full bg-white z-[51]', isChatOpen ? 'block' : 'hidden')}>
      <aside className={clsx(activeTabe === 1 ? 'block' : 'hidden')}>
        <section className="text-white bg-cyan px-5 p-10">
          <article onClick={() => dispatch(closeChat())} className="flex justify-between items-center">
            <img width="50px" height="50px" src={logo_white} alt="intercomcdn" />
            <CgClose />
          </article>
          <article className="mt-10 mb-4">
            <AvatarGroup stack>
              <Avatar circle key={cs1} src={cs1} alt="cs1" />
              <Avatar circle key={cs2} src={cs2} alt="cs2" />
              <Avatar circle key={cs3} src={cs3} alt="cs3" />
            </AvatarGroup>
          </article>
          <article>
            <h4 className="text-white/60">Hi Saeed !</h4>
            <h4>How We Can Help You</h4>
          </article>
        </section>
        <section className="px-5 pt-1 pb-5 bg-gradient-to-b from-cyan to-white">
          <Card className="text-gray rounded-[10px] py-4">
            <aside className="flex justify-between items-center">
              <div>
                <strong className="text-[14px]">Send Us a message</strong>
                <p className="text-gray/60 text-[14px]">We typically reply in under a minute</p>
              </div>
              <div className="text-cyan flex items-center">
                <IoMdSend />
              </div>
            </aside>
          </Card>
        </section>
        <section className="absolute bottom-0 py-6 shadow-[#00000024_0px_0px_25px] w-full border-t border-b-0 border-r-0 border-l-0  border-solid border-gray/5 flex justify-evenly text-3xl">
          <aside onClick={() => setActiveTabe(1)} className="grid text-center text-cyan">
            <span className=" flex justify-center h-[30px]">
              <AiFillHome />
            </span>
            <strong className="text-sm">Home</strong>
          </aside>
          <aside className="grid text-center" onClick={() => setActiveTabe(2)}>
            <span className="flex justify-center h-[30px]">
              <Badge content={1}>
                <BiMessageAltDetail />
              </Badge>
            </span>
            <strong className="text-sm">messages</strong>
          </aside>
        </section>
      </aside>
      <aside className={clsx(activeTabe === 2 ? 'block' : 'hidden')}>
        <section className="bg-cyan px-5 text-white">
          <article className="flex items-center justify-between">
            <MdArrowBackIosNew />
            <h4>Customer Suport</h4>
            <RxCross2 />
          </article>
        </section>
      </aside>
    </div>
  );
}

export default CustomerService;
