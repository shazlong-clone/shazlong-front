import React, { useEffect, useRef, useState } from 'react';
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
import shazlong from '../../assets/images/shazlong.png';
import { Link } from 'react-router-dom';
import EmojiDropdown from './EmojiDropdown';
import { useMediaQuery } from '@uidotdev/usehooks';
import therapist from '../../assets/images/therapist.webp';
function CustomerService() {
  const dispatch = useDispatch();
  const [activeTabe, setActiveTabe] = useState(1);
  const { isChatOpen } = useSelector((state) => state?.theme);

  const [message, setMessage] = useState('');
  const textAreaRef = useRef();

  const handleChange = (evt) => {
    const val = evt.target?.value;

    setMessage(val);
  };
  const lg = useMediaQuery('lg');
  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, message]);

  return (
    <>
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
        <aside
          className={clsx(
            activeTabe === 2
              ? open
                ? 'grid grid-rows-[auto_auto_1fr_auto] h-full'
                : 'grid grid-rows-[auto_1fr_auto] h-full'
              : 'hidden',
          )}
        >
          <section className="bg-cyan p-5 text-white">
            <article className="flex items-center justify-between text-xl">
              <span onClick={() => setActiveTabe(1)}>
                <MdArrowBackIosNew />
              </span>
              <h4>Customer Suport</h4>
              <span onClick={() => dispatch(closeChat())}>
                <RxCross2 />
              </span>
            </article>
            <article className="text-center py-5">
              <img className="rounded-full w-[60px] mb-3" src={shazlong} alt="s" />
              <br />
              <strong>Active over 1w ago</strong>
              <br />
              <small>Giza, Egypt</small>
            </article>
          </section>
          {open && (
            <section className="px-5 py-2 mt-5">
              <Card className="shadow-md relative border border-solid border-gray/20 rounded-md">
                <span className="absolute top-3 right-3" onClick={() => setOpen(false)}>
                  <RxCross2 />
                </span>
                <article className="flex items-center gap-3">
                  <img className="rounded-full w-[30px]" src={shazlong} alt="s" />
                  <small>Customer Support from Shazlong.</small>
                </article>
                <h5 className="text-cyan text-center mt-5">Need a session today.</h5>
                <p className="mt-2 text-center">
                  <strong className="text-[12px]">
                    Click <Link to="/therapists">here</Link> to check out our Available therapists.
                  </strong>
                </p>
              </Card>
            </section>
          )}
          <section className="overflow-y-scroll p-5">
            <div className="flex max-w-[80%] items-end gap-1  mt-1 ml-auto justify-end">
              <span className="bg-cyan rounded-md p-2 text-white">Hi</span>
              <img src={therapist} className="w-[20px] mb-1 h-[20px] rounded-full" alt="" />
            </div>

            <div className="flex items-end gap-1 max-w-[80%] mt-1">
              <img src={therapist} className="w-[20px] mb-1 h-[20px] rounded-full opacity-0" alt="" />
              <span className="bg-gray/5 rounded-md p-2 text-gray">Hi</span>
            </div>
            <div className="flex items-end gap-1 max-w-[80%] mt-1">
              <img src={therapist} className="w-[20px] mb-1 h-[20px] rounded-full" alt="" />
              <span className="bg-gray/5 rounded-md p-2 text-gray">
                at the moment there are no group therapy, however we will inform you once there is dear
              </span>
            </div>
          </section>
          <section className={clsx('shadow-[0px_-17px_30px_0px_rgba(0,0,0,0.1)] pb-[50]', lg && 'mb-0')}>
            <article className="flex py-3 items-center px-5 gap-5 bg-gray/5 border border-solid border-gray/5 border-t-1 border-b-0 border-r-0 border-l-0">
              <textarea
                id="review-text"
                onChange={handleChange}
                placeholder="Send us message..."
                ref={textAreaRef}
                rows={1}
                value={message}
                className="min-h-[27px] max-h-[100px]  resize-none grow bg-transparent active:border-none focus:outline-none border-none"
              />
              <div className="flex items-center gap-2">
                {lg ? <EmojiDropdown onEmojiSelect={handleEmojiSelect} /> : ''}
                <IoMdSend className="flex items-center cursor-pointer" />
              </div>
            </article>
          </section>
        </aside>
      </div>
    </>
  );
}

export default CustomerService;
