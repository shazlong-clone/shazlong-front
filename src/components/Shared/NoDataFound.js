import React from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

function NoDataFound(props) {
  const { t } = useTranslation();
  const { className, ...restProps } = props;
  return (
    <div className={twMerge('text-center mt-20', className)} {...restProps}>
      <img src="https://www.jobhai.com/static/no-data.svg" />
      <p className="my-3">{props.children ?? t('NO_Data_Found')}</p>
    </div>
  );
}

export default NoDataFound;
