import React, { useEffect, useState } from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import BlogHeader from '../components/Blog/BlogHeader';
import BlogSlider from '../components/Blog/BlogSlider';
import BlogComments from '../components/Blog/BlogComments.js';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getBlog } from '../features/blog/blogAction';
import { Loader } from 'rsuite';

import NoDataFound from '../components/Shared/NoDataFound';
import { useTranslation } from 'react-i18next';
function Blog() {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { i18n: { resolvedLanguage: locale } } = useTranslation();
  useEffect(() => {
    setLoading(true);
    dispatch(getBlog(id))
      .then((res) => {
        setBlog(res?.payload?.result);
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return (
      <div className="h-svh flex items-center justify-center">
        <Loader size="lg" content={t('loading')} vertical />
      </div>
    );
  }
  return (
    <main className="py-5">
      <div className="container">
        <InternalHeader>{t('Blog')}</InternalHeader>
        <div className="py-5">
          {
            !blog?.title ?
              <>
                <NoDataFound>
                  {t('Blog_NotFound')}
                </NoDataFound>
                <div className='text-center'>
                  <Link to={'/' + locale + '/blogs'}>{t('Blog')}</Link>
                </div>
              </>
              : <>
                <BlogHeader blog={blog} />
                <BlogSlider blog={blog} />
                <BlogComments />
              </>
          }

        </div>
      </div>
    </main>
  );
}

export default Blog;
