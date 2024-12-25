import React from 'react';
import Image from './Image';
import SignLogo from './SignLogo';
import SignUpForm from './SignUpForm';
import { useTranslation } from 'react-i18next';
import Back from '../Shared/Back';
function SignUpComp() {
  const { t } = useTranslation();
  return (
    <main className="lg:px-0 lg:w-full">
      <Back />
      <div className="lg:grid lg:grid-cols-[1fr_1.5fr] items-start">
        <section data-aos="fade-up" data-aos-duration="1000" className="mb-5 mx-auto lg:max-w-sm py-5 container">
          <SignLogo />
            <strong className="block">{t('All_fields_marked_with_*_are_required')}</strong>
          <SignUpForm />
        </section>
        <section>
          <Image />
        </section>
      </div>
    </main>
  );
}

export default SignUpComp;
