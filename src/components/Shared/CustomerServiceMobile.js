import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CustomerService from './CustomerService';

function CustomerServiceMobile() {
  const { isChatOpen } = useSelector((state) => state?.theme);
  useEffect(() => {
    const body = document.querySelector('body');
    if (isChatOpen) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }
  }, [isChatOpen]);
  if (isChatOpen) {
    return (
      <div className={clsx(isChatOpen ? 'block' : 'hidden')}>
        <CustomerService isMobile={true} />
      </div>
    );
  }
  return '';
}

export default CustomerServiceMobile;
