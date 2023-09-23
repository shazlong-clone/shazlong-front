import React from 'react';
import { Icon } from '@rsuite/icons';
import { MdDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';

export const appNavs = [
  {
    eventKey: 'profile',
    icon: <Icon as={BsFillPersonFill} />,
    title: 'Profile',
    to: '/doctor',
  },
  {
    eventKey: 'dashboard',
    icon: <Icon as={MdDashboard} />,
    title: 'Slots',
    to: 'slots',
  },
  {
    eventKey: 'Home',
    icon: <Icon as={AiOutlineHome} />,
    title: 'Home',
    to: '/',
  },
];
