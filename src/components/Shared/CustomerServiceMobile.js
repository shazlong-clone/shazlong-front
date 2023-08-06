import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import CustomerService from './CustomerService';

function CustomerServiceMobile() {
  const { isChatOpen } = useSelector((state) => state?.theme);

  return (
    <div className={clsx(isChatOpen ? 'block' : 'hidden')}>
      <CustomerService />
    </div>
  );
}

export default CustomerServiceMobile;
