import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Message, toaster } from 'rsuite';

function withSubmit(WrappedComponent) {
  return function (props) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState();

    const onSubmit = async (formValues) => {
      try {
        setLoading(true);
        const res = '';
        if (res?.payload?.status) {
          toaster.push(
            <Message type="success" closable showIcon>
              {t('updated_successfuly')}
            </Message>,
            { duration: 5000 },
          );
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
    return <WrappedComponent {...props} onSubmit={onSubmit} loading={loading} />;
  };
}

export default withSubmit;
