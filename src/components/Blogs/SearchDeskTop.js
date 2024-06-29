import React, { useEffect } from 'react';

import {} from '@uidotdev/usehooks';
import clsx from 'clsx';
import SearchIcon from '@rsuite/icons/Search';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialization } from '../../features/shared/sharedActions';
import Slider from 'react-slick';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Input, InputGroup } from 'rsuite';
import withBlog from '../../hooks/withblog';

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={clsx(
        'text-[var(--rs-gray-800)] bg-[var(--rs-gray-50)] hover:bg-[var(--rs-gray-100)] active:bg-[var(--rs-gray-300)] border border-solid border-[var(--rs-gray-500)] size-[50px] flex items-center justify-center rounded-full text-4xl top-[50%] absolute right-[-48px] z-50 translate-y-[-40%] cursor-pointer',
      )}
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowRight />
    </div>
  );
}
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={clsx(
        'text-[var(--rs-gray-800)] bg-[var(--rs-gray-50)] size-[50px] rounded-full flex items-center justify-center hover:bg-[var(--rs-gray-100)] active:bg-[var(--rs-gray-300)] border border-solid border-[var(--rs-gray-500)] text-4xl top-[50%] absolute left-[-51px] z-50 translate-y-[-40%] cursor-pointer',
      )}
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowLeft />
    </div>
  );
}
function SearchDeskTop(props) {
  const { params, setParams, getSearchedBlogs } = props;
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const {
    t,
    i18n: { resolvedLanguage: locale },
  } = useTranslation();

  const specializationList = useSelector((state) => state?.shared?.specializationList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpecialization());
  }, []);
  return (
    <>
      <main className="relative bg-[var(--rs-primary-100)]">
        <div className="container">
          <section className="py-5">
            <InputGroup>
              <Input
                onChange={(value) => setParams({ ...params, name: value })}
                value={params?.name}
                placeholder={t('Search')}
                size="lg"
              />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </section>
        </div>
        <div className={clsx('bg-[var(--rs-bg-card)] bottom-0 transform w-full flex items-center  z-20')}>
          <section className="container py-5">
            <Slider {...settings}>
              {specializationList?.map((spec, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (params?.category?.includes(spec?.id)) {
                        setParams({ ...params, category: params?.category?.filter((categoryId) => categoryId !== spec?.id) });
                      } else {
                        setParams({ ...params, category: [...params.category, spec?.id] });
                      }
                    }}
                  >
                    <div
                      style={{ minHeight: '86px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      className={clsx(
                        'active:bg-[var(--rs-gray-50)] m-[2px] border border-[var(--rs-gray-500)] border-solid px-5 py-2 rounded-3xl cursor-pointer hover:outline-1 hover:outline',
                        params?.category?.includes(spec?.id)
                          ? 'bg-[var(--rs-gray-500)] text-white active:bg-[var(--rs-gray-400)]'
                          : '',
                      )}
                    >
                      {locale === 'ar' ? spec?.ar_name : spec?.name}
                    </div>
                  </div>
                );
              })}
            </Slider>
          </section>
        </div>
      </main>
    </>
  );
}

export default withBlog(SearchDeskTop);
