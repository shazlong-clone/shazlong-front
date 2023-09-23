import React, { useRef } from 'react';
import { IconButton, Popover, Radio, RadioGroup, Whisper } from 'rsuite';
import { AiOutlineSetting } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { lngs } from '../../assets/constants/index';

const WhisperComp = ({ placement }) => {
  const { locale } = useSelector((state) => state?.theme);
  const { i18n } = useTranslation();
  const triggerRef = useRef();
  const close = () => triggerRef.current.close();
  return (
    <Whisper
      trigger="click"
      placement={placement}
      ref={triggerRef}
      controlId={`control-id-${placement}`}
      speaker={
        <Popover title="language">
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
        </Popover>
      }
    >
      <IconButton className="bg-transparent" icon={<AiOutlineSetting className="text-xl" />} />
    </Whisper>
  );
};

export default WhisperComp;
