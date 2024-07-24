import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar } from 'rsuite';
import React, { memo, useState } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import Reply from './Reply';

const Comment = ({ comment, handelGetComments }) => {
    const { t } = useTranslation();
    const [active, setActive] = useState(false);

    return <section className={clsx('grid grid-cols-[40px_1fr] gap-2 relative')}>
        <Avatar src={comment?.auther?.photo} circle className='z-10' />
        <article>
            <div className='bg-[var(--rs-gray-100)] rounded-xl p-2 block'>
                <b>{comment?.auther?.name}</b>
                <div>
                    {
                        comment?.text
                    }
                </div>
            </div>
            <div className='flex gap-5 [&>a]:text-[var(--rs-gray-500)] mt-2'>
                <Link>{moment(comment?.date)?.fromNow()}</Link>
                <Link onClick={() => {
                    setActive(!active);
                }}>{t('Reply')}</Link>
            </div>
            <div className={clsx(!active && 'hidden')}>
                <Reply replyTo={comment?._id} handelGetComments={handelGetComments} active={active} setActive={setActive} />
            </div>

        </article>
    </section>

}

export default memo(Comment);