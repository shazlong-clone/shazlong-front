import React, { useContext, useEffect, useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';

import {} from '@uidotdev/usehooks';
import clsx from 'clsx';
import SearchIcon from '@rsuite/icons/Search';
import { BlogContext } from './BlogSearch';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialization } from '../../features/shared/sharedActions';
import Slider from 'react-slick';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Input, InputGroup } from 'rsuite';

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
function SearchDeskTop() {
  const inputRef = useRef();
  const { params, setParams } = useContext(BlogContext);
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
              <Input placeholder={t('Search')} size="lg" />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </section>
        </div>
        <div className={clsx('bg-[var(--rs-bg-card)] bottom-0 transform w-full flex items-center  z-20')}>
          <section className="container py-5">
            <Slider {...settings}>
              {specializationList?.map((el, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (params?.category.includes(i)) {
                        setParams({ ...params, category: params?.category.filter((el) => el !== i) });
                      } else {
                        setParams({ ...params, category: [...params.category, i] });
                      }
                    }}
                  >
                    <div
                      style={{ minHeight: '86px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      className={clsx(
                        'active:bg-[var(--rs-gray-50)] m-[2px] border border-[var(--rs-gray-500)] border-solid px-5 py-2 rounded-3xl cursor-pointer hover:outline-1 hover:outline',
                        params?.category?.includes(i) ? 'bg-[var(--rs-gray-500)] text-white active:bg-[var(--rs-gray-400)]' : '',
                      )}
                    >
                      {locale === 'ar' ? el?.ar_name : el?.name}
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

export default SearchDeskTop;
