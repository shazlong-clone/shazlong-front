import React from 'react';
import { Icon } from '@rsuite/icons';
import { MdDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiAlarm } from 'react-icons/bi';
import { FaUserEdit } from 'react-icons/fa';
import { GrArticle } from 'react-icons/gr';

export const appNavs = [
  {
    eventKey: 'Profile',
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
  {
    eventKey: 'Blog',
    icon: <Icon as={FaUserEdit} />,
    title: 'Write_Blog',
    to: 'blog',
  },
  {
    eventKey: 'MyBlogs',
    icon: <Icon as={GrArticle} />,
    title: 'My_Blogs',
    to: 'my-blogs',
  },
];
