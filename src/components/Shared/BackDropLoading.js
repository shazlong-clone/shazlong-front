import { useSelector } from 'react-redux';
import { Loader } from 'rsuite';

const Loading = () => {
  const locale = useSelector((state) => state?.theme?.locale);
  return <Loader size="lg" backdrop content={locale === 'ar' ? 'جاري التحميل ...' : 'loading...'} vertical />;
};
export default Loading;
