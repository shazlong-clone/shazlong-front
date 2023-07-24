import React from 'react';
import BlogClollection from './BlogClollection';

function LatestArticles() {
  const blogs = [
    {
      body: 'How to Stay Healthy and Safe While Fasting During Ramadan:',
    },
    {
      body: '6 Ways to Deal with Getting Laid Off',
    },
    {
      body: '6 Ways to Deal with Getting Laid Off',
    },
    {
      body: 'How to Stay Healthy and Safe While Fasting During Ramadan:',
    },
  ];
  return <BlogClollection title="Latest Articles" blogs={blogs} />;
}

export default LatestArticles;
