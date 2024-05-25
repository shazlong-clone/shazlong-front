import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarGroup, Badge, DOMHelper, IconButton } from 'rsuite';
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
import EmojiDropdown from './EmojiDropdown';
import { useMediaQuery } from '@uidotdev/usehooks';
import therapist from '../../assets/images/therapist.webp';
import { useTranslation } from 'react-i18next';
const { addClass, removeClass } = DOMHelper;

function CustomerService({ close, isMobile = false }) {
  const dispatch = useDispatch();
  const [activeTabe, setActiveTabe] = useState(1);
  const { i18n, t } = useTranslation();
  const [message, setMessage] = useState('');
  const textAreaRef = useRef();
  const { user } = useSelector((state) => state?.auth);

  const handleChange = (evt) => {
    const val = evt.target?.value;

    setMessage(val);
  };
  const lg = useMediaQuery('lg');
  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };
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
  const { isChatOpen } = useSelector((state) => state?.theme);
  const ref = useRef();
  const handelClose = () => {
    if (isMobile) {
      removeClass(ref.current, 'animate__backInUp');
      addClass(ref.current, 'animate__backOutDown');
      setTimeout(() => {
        dispatch(closeChat());
      }, [500]);
    } else {
      dispatch(closeChat());
    }
  };
  useEffect(() => {
    addEventListener(
      'load',
      function () {
        window.scrollTo(1, 0);
      },
      false,
    );
  }, []);
  return (
    <>
      <div
        ref={ref}
        className={clsx(
          'fixed top-0 left-0 h-[100dvh] duration-100 overflow-hidden w-full bg-[var(--rs-bg-card)] z-[51] lg:static lg:h-[80vh] lg:w-[400px] lg:rounded-md animate__animated animate__faster',
          isChatOpen && isMobile && 'animate__backInUp',
        )}
      >
        {activeTabe === 1 && (
          <aside className={clsx(activeTabe === 1 ? 'block animate__animated animate__fadeIn' : 'hidden')}>
            <section className="text-white bg-[var(--rs-primary-700)] px-5 p-10 lg:rounded-t-md xl:py-5">
              <article onClick={handelClose} className="flex justify-between items-center">
                <img width="50px" height="50px" src={logo_white} alt="intercomcdn" />
                <span onClick={close} className="cursor-pointer">
                  <IconButton style={{ padding: '10px' }} className="bg-transparent" appearance="primary">
                    <CgClose className="text-[20px]" />
                  </IconButton>
                </span>
              </article>
              <article className="mt-5 xl:mt-10 mb-4">
                <AvatarGroup stack>
                  <Avatar circle key={cs1} src={cs1} alt="cs1" />
                  <Avatar circle key={cs2} src={cs2} alt="cs2" />
                  <Avatar circle key={cs3} src={cs3} alt="cs3" />
                </AvatarGroup>
              </article>
              <article>
                <h3 className="text-white/60">
                  {t('Hi')} 👋 {i18n.resolvedLanguage === 'ar' ? user?.fullArName : user?.fullEnName}
                </h3>
                <h3>{t('How_We_Can_Help_You')}</h3>
              </article>
            </section>
            <section className="px-5 pt-1 pb-5 bg-gradient-to-b from-[var(--rs-primary-700)] to-white">
              <Card className="text-gray rounded-[10px] py-4">
                <aside className="flex justify-between items-center">
                  <div>
                    <strong className="text-[16px] font-extrabold">{t('Send_Us_A_Message')}</strong>
                    <p className="text-gray/60 text-[14px]">{t('we_typically_reply_in_under_a_minute')}</p>
                  </div>
                  <div className="flex items-center text-xl cursor-pointer rtl:rotate-180">
                    <IconButton onClick={() => setActiveTabe(2)} appearance="link" style={{ padding: '10px' }}>
                      <IoMdSend className="text-[20px]" />
                    </IconButton>
                  </div>
                </aside>
              </Card>
            </section>
            <section className="fixed bottom-0 shadow-[#00000024_0px_0px_25px] w-full border-t border-b-0 border-r-0 border-l-0  border-solid border-[var(--rs-gray-100)] flex text-3xl">
              <aside
                onClick={() => setActiveTabe(1)}
                className="grow grid cursor-pointer text-center text-cyan text-[var(--rs-primary-700)] hover:bg-[var(--rs-btn-subtle-hover-bg)]  active:bg-[var(--rs-btn-subtle-hover-bg)]  duration-300 p-6"
              >
                <span className=" flex justify-center h-[30px]">
                  <AiFillHome />
                </span>
                <strong className="text-sm">{t('Home')}</strong>
              </aside>
              <aside
                className="grow grid cursor-pointer text-center active:text-[var(--rs-primary-400)] hover:bg-[var(--rs-btn-subtle-hover-bg)]  active:bg-[var(--rs-btn-subtle-hover-bg)]  duration-300 p-6"
                onClick={() => setActiveTabe(2)}
              >
                <span className="flex justify-center h-[30px]">
                  <Badge content={1}>
                    <BiMessageAltDetail />
                  </Badge>
                </span>
                <strong className="text-sm">{t('Messages')}</strong>
              </aside>
            </section>
          </aside>
        )}

        {activeTabe && (
          <aside
            className={clsx(
              activeTabe === 2 ? 'grid grid-rows-[auto_1fr_auto] h-full animate__animated animate__fadeIn' : 'hidden',
            )}
          >
            <section className="bg-[var(--rs-primary-700)] p-5 text-white lg:rounded-t-md">
              <article className="flex items-center justify-between text-xl">
                <span className="cursor-pointer rtl:rotate-180 flex items-center" onClick={() => setActiveTabe(1)}>
                  <IconButton onClick={close} style={{ padding: '10px' }} className="bg-transparent" appearance="primary">
                    <MdArrowBackIosNew className="text-[20px]" />
                  </IconButton>
                </span>
                <h4 className="pt-2">Customer Suport</h4>
                <span className="cursor-pointer flex items-center" onClick={handelClose}>
                  <IconButton onClick={close} style={{ padding: '10px' }} className="bg-transparent" appearance="primary">
                    <RxCross2 className="text-[20px]" />
                  </IconButton>
                </span>
              </article>
              <article className="text-center py-5 text-[16px]">
                <img className="rounded-full w-[60px] mb-3" src={shazlong} alt="s" />
                <br />
                <strong>Active over 1w ago</strong>
                <br />
                <small>Giza, Egypt</small>
              </article>
            </section>
            <section className="overflow-y-auto p-5 text-base">
              <div className="flex max-w-[80%] items-end gap-1  mt-1 justify-end ms-auto">
                <span className="bg-[var(--rs-primary-700)] rounded-md p-2 text-white">Hi</span>
                <img src={therapist} className="w-[20px] mb-1 h-[20px] rounded-full" alt="" />
              </div>

              <div className="flex items-end gap-1 max-w-[80%] mt-1">
                <img src={therapist} className="w-[20px] mb-1 h-[20px] rounded-full opacity-0" alt="" />
                <span className="bg-[var(--rs-gray-100)] rounded-md p-2 text-gray">Hi</span>
              </div>
              <div className="flex items-end gap-1 max-w-[80%] mt-1">
                <img src={therapist} className="w-[20px] mb-1 h-[20px] rounded-full" alt="" />
                <span className="bg-[var(--rs-gray-100)] rounded-md p-2 text-gray">
                  at the moment there are no group therapy, however we will inform you once there is dear
                </span>
              </div>
            </section>
            <section className={clsx('shadow-[0px_-17px_30px_0px_rgba(0,0,0,0.1)]', lg && 'mb-0')}>
              <article className="text-base flex py-3 items-end px-5 gap-1 bg-[var(--rs-gray-50)] border border-solid border-[var(--rs-gray-100)] border-t-1 border-b-0 border-r-0 border-l-0">
                <textarea
                  id="review-text"
                  onChange={handleChange}
                  placeholder="Send us message..."
                  ref={textAreaRef}
                  rows={1}
                  value={message}
                  className="min-h-[27px] max-h-[100px]  resize-none grow bg-transparent active:border-none focus:outline-none border-none"
                />
                <div className="flex items-center gap-1">
                  <span className="hidden lg:block">
                    <EmojiDropdown onEmojiSelect={handleEmojiSelect} />
                  </span>
                  <IconButton style={{ padding: '10px' }} circle appearance="primary">
                    <IoMdSend className="flex items-center cursor-pointer rtl:rotate-180" />
                  </IconButton>
                </div>
              </article>
            </section>
          </aside>
        )}
      </div>
    </>
  );
}

export default CustomerService;
