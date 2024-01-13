import { useSelector } from 'react-redux';
import { Loader } from 'rsuite';

const Loading = () => {
  const locale = useSelector((state) => state?.theme?.locale);
  return <div className='fixed h-[100vh] flex justify-center w-full items-center'>
    <Loader size="lg" backdrop content={locale === 'ar' ? 'جاري التحميل...' : 'loading...'} vertical />;
  </div>
  
};
export default Loading;
