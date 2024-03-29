import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Message, useToaster } from 'rsuite';

const useSubmition = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toaster = useToaster();
  return async (dispatcher, params, { showToast = true, showLoader = true } = {}) => {
    try {
      if (showLoader) {
        toaster.push(t('loading'), { duration: 3000, type: 'info' });
      }
      const res = await dispatch(dispatcher(params));
      if (res?.payload?.status) {
        if (showToast) {
          toaster.push(<Message type="success">{res?.message ?? t('success')}</Message>, { duration: 3000 });
        }
      } else {
        if (showToast) {
          toaster.push(<Message type="error">{res?.message ?? t('internal_server_error')}</Message>, {
            duration: 3000,
          });
        }
      }
      return res;
    } catch (e) {
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
