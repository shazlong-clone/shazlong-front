import React from 'react';
import Card from '../Shared/Card';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

function Certificates({ title, data }) {
  const { i18n } = useTranslation();
  return (
    <div className="mb-2">
      <Card className="text-sm grid gap-3" key={Math.random()}>
        <h6 className="text-cyan pb-3">{title}</h6>
        {data?.map((item) => {
          return (
            <div key={Math.random()}>
              <section className="flex gap-3">
                <article className="min-w-[4px] lg:w-1 rounded-md bg-[var(--rs-primary-700)]" />
                <article>
                  <img className="w-[50px] h-[50px] object-contain" src={item?.company_logo} />
                </article>
                <article>
                  <div>{i18n.resolvedLanguage === 'ar' ? item?.ar_title : item?.title}</div>
                  <div className="italic font-light">
                    {i18n.resolvedLanguage === 'ar' ? item?.ar_description : item?.description}
                  </div>
                  <div className="text-[var(--rs-primary-700)]">
                    {moment(item?.time[0]).isValid() ? moment(item?.time[0]).format('MMM YYYY') : ''}
                    <span className="px-2">-</span>
                    {moment(item?.time[1]).isValid() ? moment(item?.time[1]).format('MMM YYYY') : ''}
                  </div>
                </article>
              </section>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

export default Certificates;
