import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Loader } from 'rsuite';
import Card from '../components/Shared/Card';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';
import { localizeNum } from '../assets/constants';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useSubmition from '../hooks/useSubmit';
import { getUserTestById } from '../features/user/userActions';
import moment from 'moment';
import InternalHeader from '../components/Shared/InternalHeader';
function UserTest() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const test = useSelector((state) => state?.test?.test);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [userTest, setUserTest] = useState({});
  const submit = useSubmition();
  useEffect(() => {
    setLoading(true);
    submit(getUserTestById, id, { showLoader: false, showToast: false })
      .then((res) => {
        setUserTest(res?.payload?.data?.at(0));
      })
      .catch(() => {
        setErr(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <main className="bg-[var(--rs-gray-50)] py-5">
      <div className="container">
        <InternalHeader>{t('My_Answers')}</InternalHeader>
        <section className="my-5 mx-auto">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-2">
            <article>
              <Card className="rounded-none relative min-h-[100px] box-content">
                {loading ? (
                  <div className="flex justify-center items-center w-[calc(100%-12px)] h-[calc(100%-48px)] absolute">
                    <Loader speed="low" size="sm" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <h5>{t('Test_Title')}:</h5>
                      <span>{userTest?.test?.[locale === 'ar' ? 'ar_name' : 'name']}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <h5>{t('Result')}:</h5>
                      <span>{userTest?.result}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <h5>{t('Test_Date')}:</h5>
                      <span>
                        {moment(userTest?.createdAt)?.isValid()
                          ? moment(userTest?.createdAt)?.format('Do MMMM YYYY h:mm A')
                          : t('InValid_Date')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <h5>{t('Repeat_Test')}:</h5>
                      <span>
                        <Link to={'/' + locale + '/psychotest/' + userTest?.test?._id}>{t('Here')}</Link>
                      </span>
                    </div>
                  </>
                )}
              </Card>
            </article>
            <article className="bg-[var(--rs-primary-100)] py-2 min-h-[300px] relative px-3 pb-5 border border-solid border-[var(--rs-gray-300)]">
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
                  {userTest?.test?.questions?.map((question, index) => {
                    const anserId = userTest?.answers?.find((ans) => ans?.question_id === question?._id)?.answer_id;
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
                                  className={twMerge(
                                    clsx(
                                      'rounded-md shadow-md py-3 cursor-not-allowed inline-block text-base lg:text-xl text-[var(--rs-gray-700)]',
                                      index === activeQuestion && !loading ? 'animate__animated animate__slideInLeft' : '',
                                      anserId === answer?._id ? 'bg-[var(--rs-green-50)] ring-2 ring-[var(--rs-green-200)]' : '',
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
                                'text-[var(--rs-green-500)]',
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
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

export default UserTest;
