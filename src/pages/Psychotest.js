import React, { useState } from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import Card from '../components/Shared/Card';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Progress } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { localizeNum } from '../assets/constants';
function Psychotest() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  return (
    <>
      <main className="bg-[var(--rs-primary-700)] py-5">
        <div className="container">
          <section>
            <InternalHeader className="text-white mb-5" iconClassName="text-white">
              pshco Test
            </InternalHeader>
            <article className="lg:flex lg:gap-24 lg:justify-center">
              <Card className="max-w-[400px]">
                <p className="text-[var(--rs-green-900)] font-[500] mb-3 capitalize">caoution</p>
                Please read the scale items and choose the best answer that fits during the last 2 weeks. There are no right or
                wrong answers, and you do not need to spend too much time answering any of them.
              </Card>
              <Card className="max-w-[400px]">
                <p className="text-red-500 font-[500] mb-3 capitalize">Caoution</p>
                Please read the scale items and choose the best answer that fits during the last 2 weeks. There are no right or
                wrong answers, and you do not need to spend too much time answering any of them.
              </Card>
            </article>
          </section>
        </div>
      </main>
      <main>
        <div className="container">
          <section className="border border-solid border-[var(--rs-gray-50)] my-5 max-w-3xl mx-auto">
            <h6 className="px-5 text-center my-5">
              Please read the test sentences and choose the best answer that fits you during the{' '}
            </h6>
            <Progress.Line percent={30} strokeColor="#3591a6" />
            <article className="bg-[var(--rs-primary-100)] py-2">
              {Array(5)
                .fill('')
                .map((question, index, arr) => {
                  return (
                    <div key={Math.random()} className={clsx(index === activeQuestion ? '' : 'hidden')}>
                      <h6 className="text-center py-5 text-[var(--rs-gray-800)] text-3xl font-bold">I found it hard to wind down</h6>
                      <aside className="p-2 text-center flex flex-col">
                        {Array(5)
                          .fill('')
                          .map((answer, i) => {
                            return (
                              <div key={Math.random()}>
                                <Card
                                  onClick={() => {
                                    if (index + 1 !== arr?.length) {
                                      setActiveQuestion(index + 1);
                                    }
                                  }}
                                  className={twMerge(
                                    clsx(
                                      'rounded-md shadow-md py-3 cursor-pointer  inline-block text-xl text-[var(--rs-gray-700)]',
                                      index === activeQuestion ? 'animate__animated animate__slideInLeft' : '',
                                    ),
                                  )}
                                  style={{ animationDuration: `${300 * (i + 1)}ms` }}
                                >
                                  Did not apply to me at all {index}
                                </Card>
                              </div>
                            );
                          })}
                      </aside>
                    </div>
                  );
                })}
              <aside className="flex gap-1 mx-2 justify-center text-white flex-wrap">
                {Array(50)
                  .fill('')
                  .map((el, i) => {
                    return (
                      <span
                        onClick={() => setActiveQuestion(i)}
                        key={Math.random}
                        className={twMerge(
                          clsx(
                            'cursor-pointer w-5 h-5 rounded-full text-center flex-wrap text-[var(--rs-gray-500)] font-bold',
                            i <= activeQuestion && 'text-[var(--rs-green-500)]',
                            i === activeQuestion && 'underline underline-offset-2',
                          ),
                        )}
                      >
                        {localizeNum(locale, i + 1)}
                      </span>
                    );
                  })}
              </aside>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}

export default Psychotest;
