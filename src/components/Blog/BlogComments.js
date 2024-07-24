import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { Button, ButtonToolbar, Form, Input, Loader, Message, Schema, toaster } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { creatComment, getComments } from '../../features/blog/blogAction';
const { Group, Control, ControlLabel } = Form;
const Textarea = React.forwardRef((props, ref) => <Input style={{ wudth: '100%' }} {...props} as="textarea" ref={ref} />);

function BlogComments() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [comments, setComments] = useState()
    const [loading, setLoading] = useState();
    const [formValue, setFormValue] = useState({
        message: '',
    });
    const model = Schema.Model({
        message: Schema.Types.StringType().isRequired(t('required')),
    });
    const onSubmit = (isValid) => {
        if (!isValid) return;
        const params = {
            text: formValue?.message,
        }
        creatComment(params, id).then((res) => {
            if (res.status) {
                handelGetComments(id);
                setFormValue({
                    message: ''
                });
            }
        }).catch(() => {
            toaster.push(
                <Message type="error" closable showIcon>
                    {t('internal_server_error')}
                </Message>,
            );
        });
    };
    const handelGetComments = async (id) => {
        getComments(id).then((res) => {
            if (res.status) {
                setComments(res?.data ?? []);
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
        setLoading(true);
        handelGetComments(id).finally(() => {
            setLoading(false);
        })
    }, []);

    const renderComments = (comments, isReply) => {
        if (isReply && comments?.length) {
            comments.at(-1).lastReply = true
        }
        return <ul className={clsx('list-none [&>li]:mb-2 comments', isReply ? 'ps-[calc(40px + 0.5rem)' : 'ps-0')}>
            {
                comments?.map((comment) => {
                    if (comment?.replies?.length) {
                        return <li key={comment?._id} className={clsx('relative', isReply && 'reply', 'comment')}>
                            <div className={clsx(comment?.lastReply && 'last-comment')}>
                                <Comment handelGetComments={handelGetComments} comment={comment} />
                                {comment?.replies?.length ? renderComments(comment?.replies, true) : null}
                            </div>
                        </li>
                    } else {
                        return <li key={comment?._id} className={clsx(isReply ? 'reply relative' : '')}>
                            <div className={clsx(comment?.lastReply && 'last-comment')}>
                                <Comment handelGetComments={handelGetComments} comment={comment} />
                            </div>
                        </li>
                    }

                })
            }
        </ul>

    }


    return (
        <div>
            <hr />

            {
                loading ?
                    <div className='flex justify-center'><Loader /></div>
                    : comments?.length ? renderComments(comments, false)
                        : <h1></h1>
            }

            <>
                <section className="mt-10">
                    <article className="mb-5">
                        <Form fluid onChange={setFormValue} formValue={formValue} model={model}>
                            <Group controlId="message">
                                <ControlLabel>{t('Leave_Comment')}</ControlLabel>
                                <Control className="w-full" placeholder={t('Comment')} rows={5} name="message" accepter={Textarea} />
                            </Group>
                            <Group>
                                <ButtonToolbar>
                                    <Button loading={loading} disabled={loading} onClick={onSubmit} appearance="primary">
                                        {t('Add')}
                                    </Button>
                                </ButtonToolbar>
                            </Group>
                        </Form>
                    </article>
                </section>
            </>
        </div>
    );
}

export default BlogComments;