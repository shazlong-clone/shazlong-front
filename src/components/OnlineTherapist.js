import React from 'react';
import doc1 from '../assets/images/doc1.webp';
import doc2 from '../assets/images/doc2.webp';
import doc3 from '../assets/images/doc3.jpg';
import { AvatarGroup, Avatar } from 'rsuite';
import useMediaQuery from '../utils/useMediaQuery';
import {useTranslation} from 'react-i18next'
const users = [
  {
    avatar: doc1,
    name: 'superman66',
  },
  {
    avatar: doc2,
    name: 'SevenOutman',
  },
  {
    avatar: doc3,
    name: 'hiyangguo',
  },
];
const max = 3;

function OnlineTherapist() {
  const {t} = useTranslation();
  
  return (
    <div className='bg-white p-5 rounded-3xl xl:p-8'>
      <h1 className='text-gray/90 text-xl md:mb-6 lg:mb-10 lg:text-3xl'>
        {t('Online_Therapist_Online_Header')}
      </h1>
      <section className='flex flex-col lg:flex-row items-center gap-3 justify-between'>
        <AvatarGroup stack size={useMediaQuery('lg') ? 'lg' : 'md'}>
          {users
            .filter((user, i) => i < max)
            .map((user) => (
              <Avatar
                circle
                key={user.name}
                src={user.avatar}
                alt={user.name}
              />
            ))}
          {users.length <= max ? (
            ''
          ) : (
            <Avatar circle style={{ background: '#111' }}>
              +{users.length - max}
            </Avatar>
          )}
        </AvatarGroup>
        <article>
          <p className='text-gray/60 font-light text-center my-4 lg:text-xl xl:my-8'>
            <span className='inline-block w-3 h-3 bg-green rounded-full mr-5'></span>
            {t('Online_Therapist', {count: 3} )}
          </p>
        </article>
        <article>
          <button className='border block rounded-lg border-cyan/90 hover:border-cyan bg-white text-cyan/90 hover:text-cyan transition-all text-sm lg:text-xl px-10 py-2 w-[250px] m-auto'>
            {t('Learn_More')}
          </button>
        </article>
      </section>
    </div>
  );
}

export default OnlineTherapist;
