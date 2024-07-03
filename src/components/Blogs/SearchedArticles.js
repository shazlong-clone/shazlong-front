import React, { useEffect, useState } from 'react';
import BlogClollection from './BlogClollection';
import { useDispatch } from 'react-redux';
import { getBlogs } from '../../features/blog/blogAction';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Pagination } from 'rsuite';
import { LiaRedoAltSolid } from 'react-icons/lia';
import { RemoveNullKeys } from '../../utils/fn';
import clsx from 'clsx';

function SearchedArticles({ params }) {
  const limitOptions = [5, 10, 20];
  const {
    t,
    i18n: { resolvedLanguage: locale },
  } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState([]);
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setLoading(true);
    params.category =
      params?.category && params?.category?.length && typeof params?.category === 'object' ? params?.category?.join(',') : '';
    dispatch(getBlogs(params))
      .then((res) => {
        setErr(false);
        setBlogs(res?.payload?.result?.data);
        setTotal(res?.payload?.result?.total ?? 0);
        setTotal(res?.payload?.result?.total ?? 0);
      })
      .catch(() => setErr(true))
      .finally(() => setLoading(false));
  }, [params]);
  const navigate = useNavigate();
  return err ? (
    <div className="container">
      <h4 className="text-center pb-[100px]">
        {t('internal_server_error')}
        <div className="mt-5">
          <Link to={`/${locale}/blogs`}>
            <Button appearance="primary">
              {t('Reload')}
              <LiaRedoAltSolid />
            </Button>
          </Link>
        </div>
      </h4>
    </div>
  ) : (
    <>
      <BlogClollection
        loading={loading}
        title={
          <article className="text-start">
            <span className="underline underline-offset-8">{t('Search_Result')}</span>
          </article>
        }
        blogs={blogs}
      />
      <div className={clsx('flex justify-center items-center py-10', !blogs?.length ? 'hidden' : '')}>
        <Pagination
          layout={['total', 'pager']}
          prev
          last
          next
          first
          size="md"
          total={total}
          limit={params?.size}
          activePage={params?.page}
          limitOptions={limitOptions}
          onChangeLimit={(limit) => {
            navigate({
              search: `?${createSearchParams(RemoveNullKeys({ ...params, size: limit }))}`,
            });
          }}
          onChangePage={(page) => {
            navigate({
              search: `?${createSearchParams(RemoveNullKeys({ ...params, page }))}`,
            });
          }}
        />
      </div>
    </>
  );
}

export default SearchedArticles;
