import React from 'react';
import shezlongLogoLight from '../../assets/images/shezlong-logo-light.svg';
import shezlongLogoLightAr from '../../assets/images/shezlong-logo-light-ar.svg';
import ssl from '../../assets/images/secure-ssl.svg';
import ismho from '../../assets/images/ismho-grey.webp';
import SVLogoFill from '../../assets/images/SVLogoFill.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function Footer() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const { user } = useSelector((state) => state?.auth);
  return (
    <div className="bg-[var(--rs-gray-800)] text-white py-10  md:px-10 md:py-16">
      <div className="container">
        <section className="lg:grid grid-cols-[8fr_1px_10fr] lg:gap-16">
          <article
            className="
            text-center lg:text-start mb-5 lg:mb-0 border-b border-t-0 border-r-0 
            border-l-0 border-b-white border-solid 
            lg:flex-[1_1_50%] lg:border-b-0 "
          >
            <img
              src={locale === 'ar' ? shezlongLogoLightAr : shezlongLogoLight}
              className="w-[50%] md:w-[40%] mb-4 lg:w-[60%]"
              alt="logo-light"
            />
            <p className="text-center my-5  lg:text-start lg:text-xl">{t('Shezlong_Is_Number_One')}</p>
            <div className="flex gap-4 items-center justify-center mb-10">
              <img src={ssl} className="h-[25px] border" alt="ssl" />
              <img src={ismho} className="h-[40px]" alt="ismho" />
            </div>
          </article>
          <article className="w-[1px] bg-[var(--rs-bg-card)]"></article>
          <article className="md:flex-[1_1_50%] text-sm lg:max-w-fit">
            <div className="flex max-lg:justify-between lg:gap-32">
              <section>
                <h4 className="mb-4 font-bold">{t('Shezlong')}</h4>
                <p>
                  <Link className='text-[var(--rs-gray-100)] hover:text-[var(--rs-gray-100)]' to="/">{t('Emergency_Numbers')}</Link>
                </p>
                <p>
                  <Link className='text-[var(--rs-gray-100)] hover:text-[var(--rs-gray-100)]' to="/"> {t('Privacy_And_Policy')}</Link>
                </p>
              </section>
              <section>
                <h4 className="mb-4 font-bold">{t('Resources')}</h4>
                <p>
                  <Link className='text-[var(--rs-gray-100)] hover:text-[var(--rs-gray-100)]' to="/test">{t('Psychological_Tests')}</Link>
                </p>
                <p>
                  <Link className='text-[var(--rs-gray-100)] hover:text-[var(--rs-gray-100)]' to="/blogs">{t('Blog')}</Link>
                </p>
                <p>
                  <Link className='text-[var(--rs-gray-100)] hover:text-[var(--rs-gray-100)]' to="/">{t('Emergency_Numbers')}</Link>
                </p>
              </section>
            </div>
            <div className="text-center mt-10">
              <h2 className="text-3xl lg:text-xl lg:text-start lg:mb-5">{t('Join_Us')}</h2>
              <div className="inline">
                <article className="lg:flex items-center gap-2">
                  {!user?._id ? (
                    <>
                      <Link to="/sign-up" className="hover:no-underline active:no-underline grow">
                        <button
                          className="
                        min-w-[250px]
                        font-bold border mt-5 lg:mt-0 rounded-lg border-white text-white bg-opacity-0
                        bg-transparent py-3 px-14  md:block md:w-full"
                        >
                          {t('Join_As_A_Client')}
                        </button>
                      </Link>
                      <div className="my-3">{t('Or')}</div>
                    </>
                  ) : (
                    ''
                  )}

                  <Link to="/doctor" className="hover:no-underline active:no-underline grow">
                    <button
                          className="
                          min-w-[250px]
                        font-bold border lg:mt-0 rounded-lg border-white text-white bg-opacity-0
                        bg-transparent py-3 px-14  md:block md:w-full"
                        >
                      {t('Join_As_A_Therapist')}
                    </button>
                  </Link>
                </article>
                <div className="mt-5">
                  {t('Have_Account')}
                  <Link to="/sign-in" className="text-white hover:text-white underline px-1 inline-block">
                    {t('Sign_In')}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
      <div className="text-center mt-5">
        {t('Made_By', { year: new Date().getFullYear() })} <img className="w-[30px] text-cyan" src={SVLogoFill} alt="d" />{' '}
        <a className='text-[var(--rs-gray-100)] hover:text-[var(--rs-gray-100)] underline' href="https://saeedkhal.github.io/saeed-khaled-portfolio/">
          {t('Saeed_Khaled')}
          <br />
        </a>
      </div>
    </div>
  );
}

export default Footer;
