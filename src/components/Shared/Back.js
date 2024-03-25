import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Button } from 'rsuite';

function Back() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  return (
    <div>
      <div className="absolute top-5 start-3 hidden lg:block">
        <Button appearance="link" size="lg" className="text-3xl" onClick={() => navigate(-1)}>
          {i18n.resolvedLanguage === 'ar' ? <BsArrowRightCircle /> : <BsArrowLeftCircle />}
        </Button>
      </div>
    </div>
  );
}

export default Back;
