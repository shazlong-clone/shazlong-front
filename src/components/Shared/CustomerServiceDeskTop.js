import React from 'react';
import { MdSupportAgent } from 'react-icons/md';
import { Button, Popover, Whisper } from 'rsuite';
import CustomerService from './CustomerService';

const DefaultPopover = React.forwardRef(({ close, ...props }, ref) => {
  return (
    <div className="customer-service-desktop">
      <Popover className="p-0" style={{ padding: '0px' }} arrow={false} ref={ref} {...props}>
        <CustomerService close={close} />
      </Popover>
    </div>
  );
});
function CustomerServiceDeskTop() {
  const triggerRef = React.useRef();
  const close = () => triggerRef.current.close();
  return (
    <>
      <Whisper
        ref={triggerRef}
        preventOverflow={true}
        style={{ padding: '0px' }}
        className="p-0"
        trigger="click"
        placement="top"
        controlId="control-id-top"
        speaker={<DefaultPopover close={close} />}
      >
        <Button className="fixed flex gap-2 right-[10%] bottom-[50px] shadow-2xl rounded-full" appearance="primary" color="green">
          <span className="font-bold">Customer Service</span>
          <span className="text-2xl">
            <MdSupportAgent className="flex items-center" />
          </span>
        </Button>
      </Whisper>
    </>
  );
}

export default CustomerServiceDeskTop;
