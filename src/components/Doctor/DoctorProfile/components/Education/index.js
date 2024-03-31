import React from 'react';
import { Col, FlexboxGrid, Panel } from 'rsuite';
import EditModal from './components/EditModal';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Empty from '../../../../Shared/Empty';
import { useTranslation } from 'react-i18next';

function Education() {
  const {t, i18n} = useTranslation()
  const locale = i18n.resolvedLanguage;
  const { profile } = useSelector((state) => state?.doctor);
  return (
    <Panel
      className="bg-[var(--rs-bg-card)] mb-6"
      header={
        <FlexboxGrid justify="space-between" align="middle">
          <FlexboxGrid.Item>
            <h5 className="capitalize text-gray/80">{t('Education')}</h5>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <EditModal />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      }
    >
      {!profile?.educations?.length ? (
        <Empty />
      ) : (
        <div className="flex gap-2 flex-wrap">
          {profile?.educations?.map((el) => {
            return (
              <FlexboxGrid key={Math.random()} align="middle" className="mb-2 w-full">
                <FlexboxGrid.Item as={Col} className=" bg-[var(--rs-primary-700)]/90 h-[90%] rounded-lg w-[5px] p-0"></FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col}>
                  <p className="font-[500] mt-0">{locale === 'ar'? el?.ar_title : el?.title}</p>
                  <p className="text-sm">{locale === 'ar'? el?.ar_place : el?.place }</p>
                  <a className="text-sm">
                    {moment(el?.time?.at(0)).format('MMM YYYY')}-{moment(el?.time?.at(1)).format('MMM YYYY')}
                  </a>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            );
          })}
        </div>
      )}
    </Panel>
  );
}

export default Education;
