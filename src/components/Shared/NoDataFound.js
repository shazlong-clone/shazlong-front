import React from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import noData from '../../assets/images/no-data.svg';

function NoDataFound(props) {
  const { t } = useTranslation();
  const { className, ...restProps } = props;
  return (
    <div className={twMerge('text-center mt-20', className)} {...restProps}>
      <img src={noData} />
      <p className="my-3">{props.children ?? t('NO_Data_Found')}</p>
    </div>
  );
}

export default NoDataFound;
