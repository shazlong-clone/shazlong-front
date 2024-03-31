import React, { Fragment, memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Calendar, Panel } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import AddSlot from './components/AddSlot';
import UpdateSlot from './components/UpdateSlot';

import { getSlots } from '../../../features/doctor/doctorActions';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
function Slots() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const { slots, profile } = useSelector((state) => state?.doctor);
  function renderCell(date) {
    return (
      <>
        <AddSlot date={date} />
        <div className="grid gap-2 mt-5">
          {slots
            ?.filter((slot) => !slot?.isDeleted)
            ?.map((slot, i) => {
              return moment(date?.toISOString()).isSame(slot?.from, 'day') ? (
                <Fragment key={i}>
                  <UpdateSlot date={date} slot={slot} />
                </Fragment>
              ) : null;
            })}
        </div>
      </>
    );
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSlots());
  }, []);
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item as={Link} to={`${locale}/doctor`}>
          {locale === 'ar' ? profile?.fullArName : profile?.fullEnName}
        </Breadcrumb.Item>
        <Breadcrumb.Item active as={Link} to="slots">
          {t('Slots')}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Panel className="bg-[var(--rs-bg-card)]">
        <Calendar className="slot-calender" bordered renderCell={renderCell} />
      </Panel>
    </>
  );
}

export default memo(Slots);
