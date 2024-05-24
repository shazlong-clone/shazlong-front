import React, { useRef } from 'react';
import { Divider, IconButton, Popover, Radio, RadioGroup, Whisper } from 'rsuite';
import { AiOutlineSetting } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { lngs } from '../../../assets/constants/index';
import { doctorSignOut } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const WhisperComp = ({ placement }) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const triggerRef = useRef();
  const close = () => triggerRef.current.close();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    close();
    dispatch(doctorSignOut());
    navigate('/');
  };
  const { doctor } = useSelector((state) => state?.auth);
  return (
    <Whisper
      trigger="click"
      placement={placement}
      ref={triggerRef}
      controlId={`control-id-${placement}`}
      speaker={
        <Popover title={i18n?.resolvedLanguage === 'ar' ? doctor?.fullArName : doctor?.fullEnName}>
          <Divider className="my-0" />
          <RadioGroup defaultValue={locale || 'en'} name="radioList">
            {Object.keys(lngs)?.map((key) => {
              return (
                <Radio
                  key={key}
                  value={key}
                  onChange={(lang) => {
                    close();
                    setTimeout(() => {
                      i18n.changeLanguage(lang);
                    }, 300);
                  }}
                >
                  {lngs[key]?.nativeName}
                </Radio>
              );
            })}
          </RadioGroup>
          <Divider className="my-0" />
          <div onClick={signOut} className="text-center text-red-500 font-bold pt-[10px] cursor-pointer">
            {t('Sign_Out')}
          </div>
        </Popover>
      }
    >
      <IconButton className="bg-transparent" icon={<AiOutlineSetting className="text-xl" />} />
    </Whisper>
  );
};

export default WhisperComp;
