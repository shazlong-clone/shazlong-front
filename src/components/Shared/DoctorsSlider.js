import React, { useEffect } from 'react';
import therapist from '../../assets/images/therapist-1.svg';
import Card from './Card';
import Slider from 'react-slick';
import { GiCash } from 'react-icons/gi';
import { Rate, Button } from 'rsuite';
import { BsPlayFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getFeaturedDoctor, getPrefix } from '../../features/shared/sharedActions';
import { Link } from 'react-router-dom';

function DoctorsSlider() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const dispatch = useDispatch();
  const featuredDoctorsList = useSelector((state) => state?.shared?.featuredDoctors) ?? [];
  const { prefixesList } = useSelector((state) => state?.shared);

  useEffect(() => {
    dispatch(
      getFeaturedDoctor({
        sortBy: 'stars',
        page: 1,
        size: 5,
      }),
    );
    dispatch(getPrefix());
  }, []);
  return (
    <>
      <article className="slick-blog slick-container slick-articel mt-10 xl:mt-0 bg-[var(--rs-primary-700)]/30 border border-solid border-cyan py-5 px-1  pb-8 rounded-lg">
        <Card className="xl:mb-0 rounded-lg">
          <h3 className="text-center mb-3">{t('Get_Help')}</h3>
          <Slider {...settings}>
            {featuredDoctorsList?.map((doctor) => {
              const prefixNam = prefixesList?.find((el) => el?.id === doctor?.prefix);
              return (
                <div className="border-x-2 border-white border-solid text-center" key={Math.random()}>
                  <article className="text-center">
                    <Link target="" to={`/${locale}/thearpist-profile/${doctor?._id}`}>
                      <img
                        className="rounded-full m-auto border border-cyan border-solid p-1 bg-[var(--rs-primary-700)]/10"
                        width="100px"
                        height="100px"
                        src={doctor?.photo ?? therapist}
                      />
                    </Link>
                  </article>
                  <article className="text-center">
                    <h5 className="text-center text-cyan">{locale === 'ar' ? doctor?.fullArName : doctor?.fullEnName}</h5>
                    <aside className="text-center">
                      <Rate readOnly color="yellow" allowHalf={true} size="sm" defaultValue={3.5} />
                      <div>({t('Reviews', { count: doctor?.nReviews })})</div>
                    </aside>
                    <small>{locale === 'ar' ? prefixNam?.ar_name : prefixNam?.en_name}</small>
                    <aside className="flex items-center gap-5 justify-center">
                      <div className="flex items-center gap-2">
                        <GiCash className="text-2xl text-cyan" />{' '}
                        <span className="text-sm">
                          {doctor.feez[0].amount} <br /> {t('Egy')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsPlayFill className="text-3xl text-cyan" />{' '}
                        <span className="text-sm">
                          {doctor?.sessions} + <br /> {t('Sessions', { count: doctor?.sessions }).replace(/\d+/, '')}
                        </span>
                      </div>
                    </aside>
                  </article>
                  <Link to={`/${locale}/thearpist-profile/${doctor?._id}`}>
                    <Button appearance="primary" className="mt-5">
                      {t('View_Profile')}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </Card>
      </article>
    </>
  );
}

export default DoctorsSlider;
