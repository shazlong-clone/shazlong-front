import React, { useEffect, useState } from 'react';
import BlogClollection from './BlogClollection';
import { useDispatch } from 'react-redux';
import { getBlogs } from '../../features/blog/blogAction';
import { useTranslation } from 'react-i18next';

function LatestArticles() {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(
      getBlogs({ size: 3, page: 1, sort: '-createdAt', fields: 'createdAt,title,durationOfReading,category,numOfReader,cover' }),
    )
      .then((res) => {
        setBlogs(res?.payload?.result?.data);
      })
      .finally(() => setLoading(false));
  }, []);
  return <BlogClollection loading={loading} title={t('Latest_Articles')} blogs={blogs} />;
}

export default LatestArticles;
