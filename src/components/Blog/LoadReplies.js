import clsx from 'clsx';
import { useState } from 'react';
import { Loader, Message, toaster } from 'rsuite';
import { getCommentReplies } from '../../features/blog/blogAction';
import { useTranslation } from 'react-i18next';

const LoadReplies = ({ comment, setComments, allComments }) => {
    const { t } = useTranslation();
    const [repliesReload, setRepliesReload] = useState();
    const handelGetReplies = (comment) => {
        setRepliesReload(true);
        getCommentReplies(comment?._id).then((res) => {
            if (res.status) {
                comment.replies = res?.result;
                setComments([...allComments])
            }
        }).catch(() => {
            toaster.push(
                <Message type="error" closable showIcon>
                    {t('internal_server_error')}
                </Message>,
            );
        }).finally(() => {
            setRepliesReload(false);
        });
    }
    return <li className={
        clsx('relative ps-5 more-replies reply',)
    }>
        <div onClick={() => handelGetReplies(comment)} className='last-comment cursor-pointer flex gap-3'>
            <span>
                {t('View_Replies', { count: comment?.replies?.length })}
            </span>
            {repliesReload ? <Loader /> : ''}
        </div>
    </li>
}
export default LoadReplies