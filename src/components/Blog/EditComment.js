import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Avatar, Loader, Message, toaster } from 'rsuite';
import { editComment } from '../../features/blog/blogAction';
import { IoSend } from 'react-icons/io5';


function EditComment({ handelGetComments, comment, setComments, allComments }) {
    const [commentText, setCommentText] = useState(comment?.text);
    const textArea = useRef(null);
    const { user } = useSelector(state => state?.auth);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const handelCreateComment = async () => {
        const params = {
            text: commentText,
        }
        setLoading(true)
        editComment(params, comment?._id).then((res) => {
            if (res.status) {
                handelGetComments(comment?.blog, ()=>setLoading(false));
            }
        }).catch(() => {
            toaster.push(
                <Message type="error" closable showIcon>
                    {t('internal_server_error')}
                </Message>,
            );
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
    }, []);


    const handelCancel = () => {
        comment.isEdited = false;
        setComments([...allComments]);
    }

    return (
        <div className={clsx('flex gap-2')}>
            <Avatar circle src={user?.photo} className='z-10' />
            <section className={clsx('bg-[var(--rs-gray-100)] inline-flex items-end mb-5 relative rounded-xl flex-grow xl:max-w-[500px]')}>
                <textarea style={{ resize: 'none' }} cols="20" onChange={(e) => setCommentText(e.target.value)} value={commentText} ref={textArea}
                    className='flex-grow bg-transparent border-none focus-within:border-none focus-within:outline-none p-2 xl:h-[73px]' />
                <div className='absolute bottom-2 end-2 flex gap-2'>
                    <small className='cursor-pointer' onClick={handelCancel}>
                        {t('Cancel')}
                    </small>
                    {
                        loading ? <Loader />
                            : <IoSend onClick={handelCreateComment} className={clsx('cursor-pointer rtl:rotate-180', !commentText?.trim() ? 'text-[var(--rs-gray-500)] cursor-not-allowed' : '')} />
                    }
                </div>
            </section>
        </div>
    );
}

export default EditComment