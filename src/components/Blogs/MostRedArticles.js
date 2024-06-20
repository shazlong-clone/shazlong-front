import React, { useEffect, useState } from 'react';
import BlogClollection from './BlogClollection';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getBlogs } from '../../features/blog/blogAction';

function MostRedArtiles() {
  const [t] = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(
      getBlogs({
        size: 3,
        page: 1,
        sort: '-numOfReader',
        fields: 'createdAt,title,category,durationOfReading,numOfReader,cover',
      }),
    )
      .then((res) => {
        setBlogs(res?.payload?.result?.data);
      })
      .finally(() => setLoading(false));
  }, []);
  return <BlogClollection loading={loading} title={t('Most_Red')} blogs={blogs} />;
}

export default MostRedArtiles;
