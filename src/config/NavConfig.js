import React from 'react';
import { Icon } from '@rsuite/icons';
import { MdDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';

export const appNavs = [
  {
    eventKey: 'Bookings',
    icon: <Icon as={BsFillPersonFill} />,
    title: 'Bookings',
    to: 'bookings',
  },
  {
    eventKey: 'profile',
    icon: <Icon as={MdDashboard} />,
    title: 'Profile',
    to: 'slots',
  },
  {
    eventKey: 'Home',
    icon: <Icon as={AiOutlineHome} />,
    title: 'Home',
    to: '/',
  },
];
