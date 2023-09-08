import React, { createContext, useState } from 'react';
import Image from './Image';
import SignLogo from '../Sign/SignLogo';
import DocSignUpForm from './DocSignUpForm';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { Button } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
export const SignUpCompContext = createContext();
function SignUpComp() {
  const [pass, setPass] = useState(true);
  const { t } = useTranslation();
  return (
    <SignUpCompContext.Provider value={{ setPass }}>
      <main className="lg:px-0 lg:w-full">
        <div className="lg:grid lg:grid-cols-[1fr_1.5fr] items-start">
          {!pass ? (
            <section data-aos="fade-up" data-aos-duration="1000" className="mb-5 mx-auto lg:max-w-sm py-10 container">
              <SignLogo />
              <strong className="mt-8 block text-cyan text-center">Registration Step 1/3</strong>
              <strong className="mt-4 block text-center">All fields marked with * are required</strong>
              <DocSignUpForm />
            </section>
          ) : (
            <section className="text-center flex h-[100vh] items-center flex-col justify-center font-[500]">
              <article className="text-green text-[30px]">
                <BsFillPatchCheckFill />
              </article>
              <article>{t('First_Step_Done')}</article>
              <article className="my-5">{t('First_Step')}</article>
              <Link to="/therapist-verify-email-registration">
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
    </SignUpCompContext.Provider>
  );
}

export default SignUpComp;
