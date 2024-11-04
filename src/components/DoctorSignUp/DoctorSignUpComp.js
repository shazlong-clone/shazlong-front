import React from 'react';
import Image from './Image';
import SignLogo from '../Sign/SignLogo';
import DocSignUpForm from './DocSignUpForm';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { Button } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import Back from '../Shared/Back';
function SignUpComp() {
  const { t, i18n } = useTranslation();
  const { doctorVerificationCode } = useSelector((state) => state?.auth);
  return (
    <main className="lg:px-0 lg:w-full">
      <Back />
      <div className="lg:grid lg:grid-cols-[1fr_1.5fr] items-start">
        {!doctorVerificationCode ? (
          <section data-aos="fade-up" data-aos-duration="1000" className="mb-5 mx-auto lg:max-w-sm py-5 container">
            <SignLogo />
            <strong className="mt-8 block text-cyan text-center">
              {t('Registration_Step')}
              {i18next.resolvedLanguage === 'ar' ? ` ${(3).toLocaleString('ar-EG')}/${(1).toLocaleString('ar-EG')}` : '1/2'}
            </strong>
            <strong className="mt-4 block text-center">{t('All_fields_marked_with_*_are_required')}</strong>
            <DocSignUpForm />
          </section>
        ) : (
          <section className="text-center flex h-[100vh] items-center flex-col justify-center font-[500]">
            <article className="text-[var(--rs-green-900)] text-[30px]">
              <BsFillPatchCheckFill />
            </article>
            <article>{t('First_Step_Done')}</article>
            <article className="my-5">{t('First_Step')}</article>
            <Link to={`/${i18n.resolvedLanguage}/therapist-verify-email-registration`}>
              <Button appearance="primary" color="green">
                {t('Continue')}
              </Button>
            </Link>
          </section>
        )}
        <section>
          <Image />
        </section>
      </div>
    </main>
  );
}

export default SignUpComp;
