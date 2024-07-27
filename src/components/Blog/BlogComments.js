import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { Button, ButtonToolbar, Form, Heading, Input, Loader, Message, toaster } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { creatComment, getComments } from '../../features/blog/blogAction';
import EditComment from './EditComment';
import LoadReplies from './LoadReplies';
const { Group, Control, ControlLabel } = Form;
const Textarea = React.forwardRef((props, ref) => <Input style={{ wudth: '100%' }} {...props} as="textarea" ref={ref} />);

function BlogComments() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState();
    const [totalPages, setTotalPages] = useState();
    let [allComments, setComments] = useState([])
    const [loading, setLoading] = useState();
    const [addLoading, setAddLoading] = useState();
    const [formValue, setFormValue] = useState({
        message: '',
    });
    const onSubmit = () => {
        if (!formValue?.message?.trim()) return;
        const params = {
            text: formValue?.message,
        }
        setAddLoading(true);
        creatComment(params, id).then((res) => {
            if (res.status) {

                allComments.unshift(res?.comment)
                setFormValue({
                    message: ''
                });
            } else {
                toaster.push(
                    <Message type="error" closable showIcon>
                        {res?.message || t('internal_server_error')}
                    </Message>,
                );
            }
        }).catch((err) => {
            toaster.push(
                <Message type="error" closable showIcon>
                    {t('internal_server_error')}
                </Message>,
            );
        }).finally(() => {
            setAddLoading(false)
        });
    };

    const handelGetComments = async (id, params) => {
        setLoading(true);
        getComments(id, params).then((res) => {
            if (res.status) {
                const newcomments = allComments?.concat(res?.result?.data ?? []);
                setComments(newcomments);
                setCurrentPage(res?.result?.currentPage);
                setTotalPages(res?.result?.totalPages);
            }
        }).catch(() => {
            toaster.push(
                <Message type="error" closable showIcon>
                    {t('internal_server_error')}
                </Message>,
            );
        }).finally(() => {
            setLoading(false);
        });
    }


    useEffect(() => {
        allComments = [];
        handelGetComments(id, { page: 1, size: 5 })
    }, []);


    const renderComments = (comments, isReply, com) => {
        if (isReply && comments?.length && comments?.every(co => typeof (co) === 'object')) {
            comments.at(-1).lastReply = true
        }
        return <ul className={clsx('list-none [&>li]:mb-2 comments', isReply ? 'ps-[calc(40px)' : 'ps-0')}>
            {
                comments?.every(co => typeof (co) === 'object') ? comments?.map((comment) => {
                    return <li key={comment?._id} className={
                        clsx('relative', isReply && 'reply', comment?.replies?.length || comment?.replying ? 'comment' : '')
                    }>
                        <div className={clsx(comment?.lastReply && 'last-comment')}>
                            {
                                comment?.isEdited ?
                                    <EditComment
                                        comment={comment}
                                        allComments={allComments}
                                        setComments={setComments} />
                                    : <Comment
                                        replies={comments}
                                        allComments={allComments}
                                        setComments={setComments}
                                        comment={comment} />
                            }
                            {comment?.replies?.length ? renderComments(comment?.replies, true, comment) : null}
                        </div>
                    </li>
                }) : <LoadReplies allComments={allComments} setComments={setComments} comment={com} />
            }
        </ul>

    }


    return (
        <div>
            <>
                <section className="mt-10">
                    <article className="mb-5">
                        <Form fluid onChange={setFormValue} formValue={formValue}>
                            <Group controlId="message">
                                <ControlLabel>{t('Leave_Comment')}</ControlLabel>
                                <Control className="w-full" placeholder={t('Comment')} rows={5} name="message" accepter={Textarea} />
                            </Group>
                            <Group>
                                <ButtonToolbar>
                                    <Button loading={addLoading} disabled={addLoading || !formValue?.message?.trim()} onClick={onSubmit} appearance="primary">
                                        {t('Add')}
                                    </Button>
                                </ButtonToolbar>
                            </Group>
                        </Form>
                    </article>
                </section>
            </>
            <Heading level={3}>{t('Comments')}</Heading>
            <hr />
            {
                allComments?.length ? renderComments(allComments, false) : ''
            }
            {
                loading ?
                    <div className='flex justify-center'><Loader /></div> :
                    currentPage === totalPages ? '' : <Link className='text-center block' onClick={() => {
                        handelGetComments(id, { size: 5, page: currentPage + 1 })
                    }}>
                        {t('Load_More')}
                    </Link>
            }

        </div>
    );
}

export default BlogComments;