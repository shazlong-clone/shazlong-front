import React from 'react';
import { Icon } from '@rsuite/icons';
import { MdDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';

export const appNavs = [
  {
    eventKey: 'profile',
    icon: <Icon as={BsFillPersonFill} />,
    title: 'Profile',
    to: 'profile',
  },
  {
    eventKey: 'slots',
    icon: <Icon as={BsFillPersonFill} />,
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
