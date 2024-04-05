import React from 'react';
import { Icon } from '@rsuite/icons';
import { MdDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiAlarm } from 'react-icons/bi';

export const appNavs = [
  {
    eventKey: 'profile',
    icon: <Icon as={BsFillPersonFill} />,
    title: 'Profile',
    to: 'profile',
  },
  {
    eventKey: 'slots',
    icon: <Icon as={BiAlarm} />,
    title: 'Slots',
    to: 'slots',
  },
  {
    eventKey: 'Bookings',
    icon: <Icon as={MdDashboard} />,
    title: 'Bookings',
    to: 'bookings',
  },
];
