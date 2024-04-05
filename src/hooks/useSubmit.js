import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Loader, Message, toaster, useToaster } from 'rsuite';

const useSubmition = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loadingTaoster = useToaster();
  return async (dispatcher, params, { showToast = true, showLoader = true } = {}) => {
    let loadingTaostId;
    try {
      if (showLoader) {
        loadingTaostId = loadingTaoster.push(
          <Message type="info">{<Loader className="custom-loader" content={t('loading')} />}</Message>,
          {
            duration: 1000000,
          },
        );
      }

      const res = await dispatch(dispatcher(params));
      if (loadingTaostId) {
        loadingTaoster.remove(loadingTaostId);
      }
      if (res?.payload?.status) {
        if (showToast) {
          toaster.push(
            <Message type="success" closable showIcon>
              {res?.payload?.message ?? t('success')}
            </Message>,
            { duration: 3000 },
          );
        }
      } else {
        if (showToast) {
          toaster.push(
            <Message type="error" closable showIcon>
              {res?.payload?.message ?? t('internal_server_error')}
            </Message>,
            {
              duration: 3000,
            },
          );
        }
      }
      return res;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      if (showToast) {
        toaster.push(<Message type="error">{e?.message ?? t('internal_server_error')}</Message>, {
          duration: 3000,
        });
      }
    }
  };
};
export default useSubmition;
