import React, { Fragment, memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Calendar, Panel } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import AddSlot from './components/AddSlot';
import UpdateSlot from './components/UpdateSlot';

import { getSlots } from '../../../features/doctor/doctorActions';
import moment from 'moment';
function Slots() {
  const { slots } = useSelector((state) => state?.doctor);
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
    <main className="px-5 lg:px-36">
      <Breadcrumb>
        <Breadcrumb.Item as={Link} to="/doctor">
          Doctor
        </Breadcrumb.Item>
        <Breadcrumb.Item active as={Link} to="slots">
          Slots
        </Breadcrumb.Item>
      </Breadcrumb>
      <Panel className="bg-white">
        <Calendar className="slot-calender" bordered renderCell={renderCell} />
      </Panel>
    </main>
  );
}

export default memo(Slots);
