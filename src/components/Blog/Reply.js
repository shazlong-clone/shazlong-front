import clsx from 'clsx';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Avatar, Loader, Message, toaster } from 'rsuite';
import { IoSend } from 'react-icons/io5';
import { t } from 'i18next';
import { creatComment } from '../../features/blog/blogAction';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Reply({ active, setActive, replyTo, allComments, setComments, comment }) {
    const [commentText, setCommentText] = useState('');
    const textArea = useRef(null);
    const { id } = useParams();
    const { user } = useSelector(state => state?.auth);
    const [loading, setLoading] = useState(false);

    const handelCreateComment = () => {
        const params = {
            text: commentText,
            replyTo
        }
        setLoading(true)
        creatComment(params, id).then((res) => {
            if (res.status) {
                setCommentText('');
                setActive(false);
                comment.replies.unshift(res?.comment);
                setComments([...allComments])
            }
        }).catch(() => {
            toaster.push(
                <Message type="error" closable showIcon>
                    {t('internal_server_error')}
                </Message>,
            );
        }).finally(() => {
            setLoading(false)
        });
    }
    useEffect(() => {
        textArea?.current?.addEventListener('input', function () {
            // Reset the height to auto to calculate the new height
            this.style.height = 'auto';
            // Set the height to the scroll height
            this.style.height = `${this.scrollHeight}px`;
        });
    }, []);
    useEffect(() => {
        textArea.current.focus();
    }, [active]);

    return (
        <main className={clsx(!comment?.replies?.length && 'last-comment', 'relative start-[-0.5rem]')}>
            <div className={clsx('flex gap-2 reply ')}>
                <Avatar circle src={user?.photo} className='z-10' />
                <section className={clsx('bg-[var(--rs-gray-100)] inline-flex items-end mb-5 relative rounded-xl flex-grow xl:max-w-[500px]')}>
                    <textarea style={{ resize: 'none' }} cols="20" onChange={(e) => setCommentText(e.target.value)} value={commentText} ref={textArea}
                        className='flex-grow bg-transparent border-none focus-within:border-none focus-within:outline-none p-2 xl:h-[73px]' />
                    <div className='absolute bottom-2 end-2 flex gap-2'>
                        <small onClick={() => {
                            setActive(false);
                            comment.replying = false;
                            setComments([...allComments])
                        }} className='cursor-pointer'>
                            {t('Cancel')}
                        </small>
                        {
                            loading ? <Loader />
                                : <IoSend onClick={handelCreateComment} className={clsx('cursor-pointer rtl:rotate-180', !commentText?.trim() ? 'text-[var(--rs-gray-500)] cursor-not-allowed' : '')} />
                        }

                    </div>
                </section>
            </div>
        </main>
    );
}

export default memo(Reply);