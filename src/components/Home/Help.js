import React from 'react';
import agent1 from '../../assets/images/agent1.webp';
import agent2 from '../../assets/images/agent2.webp';
import agent3 from '../../assets/images/agent3.webp';
import agent4 from '../../assets/images/agent4.webp';
import needHelp from '../../assets/images/need-help.svg';
import clsx from 'clsx';
import { Button } from 'rsuite';
import { useTranslation } from 'react-i18next';

const agents = [agent1, agent2, agent3, agent4];
function Help() {
  const { t } = useTranslation();
  return (
    <main className=" lg:bg-[var(--rs-primary-100)] bg-[var(--rs-bg-card)]  rounded-lg lg:rounded-none ">
      <div className={clsx('p-4 lg:p-10 lg:container m-auto')}>
        <h3 className="lg:text-center text-gray/80 text-[20px] lg:text-[30px] lg:mb-9">{t('Still_Need_Help')}</h3>
        <div className="lg:flex">
          <section className="lg:flex-[1_1_50%]">
            <h5 className="text-[13px] font-normal lg:font-bold lg:text-[20px] lg:mb-10">{t('Suportive_Team')}</h5>
            <p className="hidden lg:block mb-10 opacity-70">{t('Contact_them')}</p>
            <div>
              <article className="flex text-center mt-5 justify-center gap-3 lg:justify-start">
                {agents?.map((agent) => {
                  return <img className="w-[50px] lg:w-[75px]" key={Math.random()} src={agent} alt="img" />;
                })}
              </article>
              <article className="flex justify-center lg:justify-start mt-5">
                <Button appearance="primary">{t('Chat_With_Support_Team')}</Button>
              </article>
            </div>
          </section>
          <section className="hidden lg:block lg:flex-[1_1_50%] text-center">
            <img className="lg:w-[450px]" src={needHelp} alt="img" />
          </section>
        </div>
      </div>
    </main>
  );
}

export default Help;
