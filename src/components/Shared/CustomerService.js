import React, { useState } from 'react';
import { IconButton } from 'rsuite';
import { MdSupportAgent } from 'react-icons/md';
import clsx from 'clsx';

function CustomerService() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-[100px] right-[100px]">
      <IconButton onClick={() => setOpen(!open)} icon={<MdSupportAgent className="text-[45px]" />} appearance="primary" circle />
      <section
        className={clsx(
          'absolute w-[300px] bottom-[60px] right-[60px]  bg-gray text-white scale-0 origin-bottom-right',
          open ? 'animate-openchat' : 'animate-closechat',
        )}
      >
        <p>tjis is bg</p>
        <p>tjis is bg</p>
        <p>tjis is bg</p>
        <p>tjis is bg</p>
        <p>tjis is bg</p>
        <p>tjis is bg</p>
      </section>
    </div>
  );
}

export default CustomerService;
