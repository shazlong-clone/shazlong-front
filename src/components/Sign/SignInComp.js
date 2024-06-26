import React, { useState } from 'react';
import 'aos/dist/aos.css';
import Image from './Image';
import SignLogo from './SignLogo';
import SignInForm from './SignInForm';
import user1 from '../../assets/images/user-1.svg';
import user2 from '../../assets/images/user-2.svg';
import therapist1 from '../../assets/images/therapist-1.svg';
import therapist2 from '../../assets/images/therapist-2.svg';
import { useTranslation } from 'react-i18next';
import Back from '../Shared/Back';
function SignInComp() {
  const [isUser, setIsUser] = useState(true);
  const { t } = useTranslation();
  return (
    <main className="lg:px-0 lg:w-full">
      <Back />
      <div className="lg:grid lg:grid-cols-[1fr_1.5fr] items-start">
        <section data-aos="fade-up" data-aos-duration="1000" className="mb-5 mx-auto lg:max-w-sm py-5 container">
          <SignLogo />
          <div className="mb-5 mt-2 text-center">
            <strong>{t('sign_in_as')}</strong>
          </div>
          <article className="flex gap-5 justify-center text-center">
            {isUser ? (
              <>
                <div className="cursor-pointer">
                  <img onClick={() => setIsUser(true)} className="w-[80px]" src={user2} alt="user2" />
                  <p>{t('User')}</p>
                </div>
                <div className="cursor-pointer">
                  <img onClick={() => setIsUser(false)} className="w-[80px]" src={therapist1} alt="therapist1" />
                  <p>{t('Doctor')}</p>
                </div>
              </>
            ) : (
              <>
                <div className="cursor-pointer">
                  <img onClick={() => setIsUser(true)} className="w-[80px]" src={user1} alt="user1" />
                  <p>{t('User')}</p>
                </div>
                <div className="cursor-pointer">
                  <img onClick={() => setIsUser(false)} className="w-[80px]" src={therapist2} alt="therapist2" />
                  <p>{t('Doctor')}</p>
                </div>
              </>
            )}
          </article>
          <SignInForm isSignAsUse={isUser} />
        </section>
        <section>
          <Image />
        </section>
      </div>
    </main>
  );
}

export default SignInComp;
