import React, { useEffect, useMemo, useState } from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import Card from '../components/Shared/Card';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Button, Loader, Message, Placeholder, Progress, toaster } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { localizeNum } from '../assets/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestById } from '../features/test/testAction';
import { updateTest } from '../features/test/testSlice';

function Psychotest() {
  const bol = true;
  const [activeQuestion, setActiveQuestion] = useState(0);
  const { i18n, t } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const test = useSelector((state) => state?.test?.test);
  const percent = useMemo(() => {
    const total = test?.questions?.length;
    const answered = test?.questions?.filter((q) => Boolean(q.userAnswer))?.length;
    if (total > 0 && answered > 0) {
      return Math.ceil((answered / total) * 100);
    } else {
      return 0;
    }
  }, [test]);
  const handelGetTests = () => {
    setLoading(true);
    dispatch(getTestById(id))
      .then((res) => {
        if (!res?.payload?.status) {
          setErr(true);
          return toaster.push(
            <Message type="error" closable showIcon>
              {res?.payload?.message || t('internal_server_error')}
            </Message>,
          );
        }
      })
      .catch(() => {
        setErr(true);
        return toaster.push(
          <Message type="error" closable showIcon>
            {t('internal_server_error')}
          </Message>,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    handelGetTests();
  }, []);
  return (
    <>
      <main className="bg-[var(--rs-primary-700)] py-5">
        <div className="container">
          <section>
            <InternalHeader className="text-white mb-5 text-[16px]" iconClassName="text-white">
              {locale === 'ar' ? test?.ar_name : test?.name}
            </InternalHeader>
            <article className="lg:flex lg:gap-24 lg:justify-center">
              <Card className="lg:w-[400px]">
                {loading ? (
                  <Placeholder.Paragraph active rows={6} />
                ) : (
                  <>
                    <p className="text-[var(--rs-green-900)] font-[500] mb-3 capitalize max-sm:text-lg">{t('Instructions')}</p>
                    <span className="text-base lg:text-lg">{t('Instruction_Info')}</span>
                  </>
                )}
              </Card>
              <Card className="lg:w-[400px]">
                {loading ? (
                  <Placeholder.Paragraph active rows={6} />
                ) : (
                  <>
                    <p className="text-red-500 font-[500] mb-3 capitalize max-sm:text-lg">{t('Disclaimer')}</p>
                    <span className="text-base lg:text-lg">{t('Disclaimer_Info')}</span>
                  </>
                )}
              </Card>
            </article>
          </section>
        </div>
      </main>
      <main>
        <div className="container">
          <section className="border border-solid border-[var(--rs-gray-300)] my-5 max-w-3xl mx-auto">
            <h5 className="px-5 text-center my-5 text-[16px]">{t('Test_Caution')}</h5>
            <Progress.Line percent={percent} strokeColor="#3591a6" />
            <article className="bg-[var(--rs-primary-100)] py-2 min-h-[300px] relative px-3 pb-5">
              {loading ? (
                <div className="flex justify-center items-center w-full h-[100%] absolute">
                  <Loader speed="low" size="lg" />
                </div>
              ) : err ? (
                <div className="flex justify-center items-center w-full h-[100%] absolute text-red-500">
                  {t('internal_server_error')}
                </div>
              ) : (
                <>
                  {test?.questions?.map((question, index, arr) => {
                    return (
                      <div key={question?._id} className={clsx(index === activeQuestion ? '' : 'hidden')}>
                        <h6 className="text-center py-5 text-[var(--rs-gray-800)] lg:text-3xl font-bold">
                          {locale === 'ar' ? question?.ar_question : question?.question}
                        </h6>
                        <aside className="p-2 text-center flex flex-col text-sm">
                          {test?.answers?.map((answer, i) => {
                            return (
                              <div key={answer?._id}>
                                <Card
                                  onClick={() => {
                                    if (index + 1 !== arr?.length) {
                                      setActiveQuestion(index + 1);
                                    } else {
                                      setActiveQuestion(0);
                                    }
                                    dispatch(updateTest({ question_id: question?._id, answer_id: answer?._id }));
                                  }}
                                  className={twMerge(
                                    clsx(
                                      'rounded-md shadow-md py-3 cursor-pointer  inline-block text-base lg:text-xl text-[var(--rs-gray-700)]',
                                      index === activeQuestion && !loading ? 'animate__animated animate__slideInLeft' : '',
                                      question?.userAnswer && question?.userAnswer === answer?._id
                                        ? 'bg-[var(--rs-green-50)] ring-2 ring-[var(--rs-green-200)]'
                                        : 'hover:bg-[var(--rs-gray-100)] hover:ring-2 hover:ring-[var(--rs-gray-500)]',
                                    ),
                                  )}
                                  style={{ animationDuration: `${300 * (i + 1)}ms` }}
                                >
                                  {locale === 'ar' ? answer?.ar_answer : answer?.answer}
                                </Card>
                              </div>
                            );
                          })}
                        </aside>
                      </div>
                    );
                  })}
                  {err ? (
                    ''
                  ) : (
                    <aside className="flex gap-1 mx-2 justify-center text-white flex-wrap">
                      {test?.questions?.map((question, i) => {
                        return (
                          <span
                            onClick={() => setActiveQuestion(i)}
                            key={Math.random}
                            className={twMerge(
                              clsx(
                                'cursor-pointer w-5 h-5 rounded-full text-center flex-wrap text-[var(--rs-gray-500)] font-bold',
                                question?.userAnswer && 'text-[var(--rs-green-500)]',
                                i === activeQuestion && 'underline underline-offset-2',
                              ),
                            )}
                          >
                            {localizeNum(locale, i + 1)}
                          </span>
                        );
                      })}
                    </aside>
                  )}
                </>
              )}
              <aside className="mt-10 flex justify-center">
                <Button color="green" disabled={!test?.questions?.every((q) => Boolean(q?.userAnswer))} appearance="primary">
                  {t('View_Result')}
                </Button>
              </aside>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}

export default Psychotest;
