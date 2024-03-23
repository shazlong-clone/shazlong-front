import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Message, toaster } from 'rsuite';
import { getSlotsByIds, serveSlots } from '../../features/shared/sharedActions';

function withSubmit(WrappedComponent) {
  return function (props) {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const slots_ids = searchParams.get('slots_ids');
    const onSubmit = async () => {
      try {
        setLoading(true);
        const res = await dispatch(
          serveSlots({
            slotIds: slots_ids?.split(',') ?? [],
          }),
        );
        if (res?.payload?.status) {
          toaster.push(
            <Message type="success" closable showIcon>
              {t('Booked_Success', { count: slots_ids?.length })}
            </Message>,
            { duration: 5000 },
          );
          dispatch(getSlotsByIds(slots_ids));
          setOpen(false);
        } else {
          toaster.push(
            <Message type="error" closable showIcon>
              {res.payload.message}
            </Message>,
            { duration: 5000 },
          );
        }
      } catch (err) {
        toaster.push(
          <Message closable showIcon type="error">
            {t('internal_server_error')}
          </Message>,
          {
            duration: 5000,
          },
        );
      } finally {
        setLoading(false);
      }
    };
    return <WrappedComponent {...props} onSubmit={onSubmit} loading={loading} open={open} setOpen={setOpen} />;
  };
}

export default withSubmit;
