import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

function InternalHeader({ className, iconClassName, ...props }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <section className={twMerge('flex justify-between items-center gap-3 lg:mb-10  lg:my-5', className)}>
      <h3>
        <Link onClick={goBack} className={twMerge('flex items-center text-gray', iconClassName ?? '')}>
          {i18n.resolvedLanguage === 'ar' ? <BsArrowRightCircle /> : <BsArrowLeftCircle />}
        </Link>
      </h3>
      <h5 className="capitalize lg:text-[25px]">{props?.children}</h5>
      {props.icon ? <h3>{props.icon}</h3> : <h3>&nbsp; &nbsp;</h3>}
    </section>
  );
}

export default InternalHeader;
