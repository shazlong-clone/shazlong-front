import React, { useEffect } from 'react';
import doc1 from '../../assets/images/doc1.webp';
import doc2 from '../../assets/images/doc2.webp';
import doc3 from '../../assets/images/doc3.jpg';
import { AvatarGroup, Avatar } from 'rsuite';
import useMediaQuery from '../../utils/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { Button } from 'rsuite';
import { getOnlineDoctors } from '../../features/shared/sharedActions';
import { useDispatch, useSelector } from 'react-redux';
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
  {
    avatar: doc3,
    name: 'hiyangguo',
  },
];
const max = 3;

function OnlineTherapist() {
  const { t } = useTranslation();
  const { onlineDoctors } = useSelector((state) => state?.shared);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOnlineDoctors());
  }, []);
  return (
    <div className="bg-[var(--rs-bg-card)] p-5 rounded-3xl xl:p-8">
      <h1 className="text-[var(--rs-gray-900)] text-xl md:mb-6 lg:mb-10 lg:text-3xl mb-6">
        {t('Online_Therapist_Online_Header')}
      </h1>
      <section className="flex flex-col lg:flex-row items-center gap-3 justify-between">
        <AvatarGroup stack size={useMediaQuery('lg') ? 'lg' : 'md'}>
          {onlineDoctors
            ?.filter((user, i) => i < max)
            ?.map((user) => (
              <Avatar circle key={user.name} src={user.photo} alt="img" />
            ))}
          {onlineDoctors?.length <= max ? (
            ''
          ) : (
            <Avatar className={users?.length > 0 ? 'd-none' : ''} circle style={{ background: '#111' }}>
              +{onlineDoctors?.length - max}
            </Avatar>
          )}
        </AvatarGroup>
        <article>
          <p className="text-[var(--rs-gray-700)] font-bold text-center my-4 lg:text-xl xl:my-8">
            {users?.length > 0 ? (
              <span className="inline-block w-3 h-3 bg-green rounded-full mx-5"></span>
            ) : (
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mx-5"></span>
            )}
            {t('Online_Therapist', { count: users?.length })}
          </p>
        </article>
        <article>
          <Button appearance="ghost" className="w-[250px]">
            {t('Learn_More')}
          </Button>
        </article>
      </section>
    </div>
  );
}

export default OnlineTherapist;
