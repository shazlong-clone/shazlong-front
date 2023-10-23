import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Calendar, Panel } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import CellAddModal from './components/CellAddModal';
import { getSlots } from '../../../features/doctor/doctorActions';
import moment from 'moment';
import { MdArrowRightAlt } from 'react-icons/md';
function Slots() {
  const { slots } = useSelector((state) => state?.doctor);
  function renderCell(date) {
    return (
      <>
        <CellAddModal date={date} />
        <div className="grid gap-2 mt-5">
          {slots?.map((slot, i) => {
            return moment(date?.toISOString()).isSame(slot?.from, 'day') ? (
              <Button key={i} className="py-0">
                {moment(slot.from).format('hh:mm a')} <MdArrowRightAlt className="text-xl" /> {moment(slot.to).format('hh mm a')}
              </Button>
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
