import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar } from 'rsuite';
import React, { memo, useState } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import Reply from './Reply';
import { useSelector } from 'react-redux';

const Comment = ({ comment, handelGetComments, allComments, setComments }) => {
    const { t } = useTranslation();
    const [active, setActive] = useState(false);
    const { user } = useSelector(state => state?.auth);
    const cancelEdit = (commnets) => {
        commnets.forEach(element => {
            element.isEdited = false
        });
        if (commnets?.replies?.length) {
            cancelEdit(commnets?.replies)
        }
    }
    const handelEdit = () => {
        cancelEdit(allComments);
        if (comment) {
            comment.isEdited = true;
            setComments(allComments);
        }
    }
    return <section className={clsx('grid grid-cols-[40px_1fr] gap-2 relative')}>
        <Avatar src={comment?.auther?.photo} circle className='z-10' />
        <article>
            <div className='bg-[var(--rs-gray-100)] rounded-xl p-2 block'>
                <b>{comment?.auther?.name}</b>
                <div className={clsx(comment?.isEdited && 'text-red-500')}>
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
                {
                    user?._id === comment?.auther?._id ? <Link onClick={handelEdit}>{t('Edit')}</Link> : ''
                }
            </div>
            <div className={clsx(!active && 'hidden')}>
                <Reply
                    replyTo={comment?._id}
                    handelGetComments={handelGetComments}
                    active={active}
                    setActive={setActive} />
            </div>

        </article>
    </section>

}

export default memo(Comment);