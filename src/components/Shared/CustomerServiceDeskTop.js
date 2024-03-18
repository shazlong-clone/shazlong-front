import React from 'react';
import { MdSupportAgent } from 'react-icons/md';
import { Button, Popover, Whisper } from 'rsuite';
import CustomerService from './CustomerService';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { openChat } from '../../features/theme/themeSlice';
import useMediaQuery from '../../utils/useMediaQuery';

const DefaultPopover = React.forwardRef(({ close, ...props }, ref) => {
  return (
    <div className="customer-service-desktop">
      <Popover className="p-0" style={{ padding: '0px', left: '50%' }} arrow={false} ref={ref} {...props}>
        <CustomerService close={close} />
      </Popover>
    </div>
  );
});

function CustomerServiceDeskTop() {
  const { isChatOpen } = useSelector((state) => state?.theme);

  const { t } = useTranslation();
  const triggerRef = React.useRef();
  const close = () => triggerRef.current.close();
  const dispatch = useDispatch();
  const lg = useMediaQuery('lg');

  return (
    <>
      <Whisper
        ref={triggerRef}
        preventOverflow={true}
        className="p-0"
        trigger="click"
        placement="top"
        controlId="control-id-top"
        open={isChatOpen && lg}
        speaker={<DefaultPopover close={close} />}
      >
        <Button
          onClick={() => dispatch(openChat())}
          className="fixed flex gap-2 end-[200px] bottom-[50px] shadow-2xl rounded-full"
          appearance="primary"
          color="green"
        >
          <span className="font-bold">{t('Customer_Service')}</span>
          <span className="text-2xl mb-[3px]">
            <MdSupportAgent className="flex items-center" />
          </span>
        </Button>
      </Whisper>
    </>
  );
}

export default CustomerServiceDeskTop;
