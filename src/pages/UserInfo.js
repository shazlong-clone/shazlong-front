import React, { useState } from 'react';
import Card from '../components/Shared/Card';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useToaster, Message, Uploader, Loader, Grid, Col, Row } from 'rsuite';
import { useTranslation } from 'react-i18next';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import { API_BASE_URL } from '../config/enviroment.config';
import PersonalInfo from '../components/UserInfo/PersonalInfo';
import PaymentInfo from '../components/UserInfo/PaymentInfo';
import { getMe } from '../features/auth/authAction';
import MyTherapy from '../components/UserInfo/MyTherapy';
import { useSearchParams } from 'react-router-dom';
import { MY_THERAPY, PAYMENT_INFO, PERSONAL_INFO } from '../assets/constants';

function UserInfo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? PERSONAL_INFO;
  const { user = {} } = useSelector((state) => state?.auth);
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const toaster = useToaster();

  const [activeTabe, setActiveTabe] = useState(tab);
  const tabs = [
    {
      label: t('Personal_Info'),
      key: PERSONAL_INFO,
      content: <PersonalInfo />,
    },
    {
      label: t('Payment_Info'),
      key: PAYMENT_INFO,
      content: <PaymentInfo />,
    },
    {
      label: t('My_Therapy'),
      key: MY_THERAPY,
      content: <MyTherapy />,
    },
  ];
  function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }
  const { token } = useSelector((state) => state?.auth);
  const [uploading, setUploading] = React.useState(false);

  const [fileInfo, setFileInfo] = React.useState(user?.photo ?? null);
  const dispatch = useDispatch();
  const props = {
    name: 'photo',
    accept: 'image/*',
    fileListVisible: false,
    listType: 'picture',
    action: `${API_BASE_URL}/api/v1/users/uploadPhoto`,
    headers: {
      authorization: `Bearer ${token}`,
      'Accept-Language': locale,
    },
    onUpload: (file) => {
      setUploading(true);
      previewFile(file.blobFile, (value) => {
        setFileInfo(value);
      });
    },
    onSuccess: () => {
      setUploading(false);
      dispatch(getMe());
      toaster.push(<Message type="success">{t('updated_successfuly')}</Message>);
    },
    onError: (err) => {
      setFileInfo(null);
      setUploading(false);
      toaster.push(<Message type="error"> {err?.response?.message || t('internal_server_error')}</Message>);
    },
  };
  const onTabChange = (key) => {
    setActiveTabe(key);
    setSearchParams({ tab: key });
  };
  return (
    <main className="bg-[var(--rs-gray-50)] py-5">
      <div className="container">
        <Grid className="lg:my-10">
          <Row gutter={24}>
            <Col xs={24} lg={8}>
              <Card className="roundeu-none text-center">
                <div className="relative inline-block p-2 ">
                  <Uploader {...props}>
                    <button style={{ width: 100, height: 100, borderRadius: '50%' }}>
                      {uploading && <Loader backdrop center />}
                      {fileInfo ? <img src={fileInfo} width="100%" height="100%" /> : <CameraRetroIcon />}
                    </button>
                  </Uploader>
                </div>
                <p className="mt-5 text-cyan capitalize">
                  {user.name}
                  <br />
                  <span className="text-gray">{user.role === 1 ? `(${t('User')})` : `(${t('Doctor')})`}</span>
                </p>
              </Card>
            </Col>
            <Col xs={24} lg={16}>
              <Card className="rounded-none mt-5 p-0 pb-5 lg:mt-0 lg:w-[600px]">
                <article className="flex">
                  {tabs?.map((tab) => (
                    <div
                      key={tab.key}
                      onClick={() => onTabChange(tab.key)}
                      className={clsx(
                        'grow px-5 py-4 capitalize border-solid border-t-0 border-r-0 border-l-0 font-semibold cursor-pointer text-sm lg:text-lg',
                        activeTabe === tab.key ? 'border-b-2 border-cyan text-cyan' : 'border-b border-gray',
                      )}
                    >
                      {tab.label}
                    </div>
                  ))}
                </article>
                <article className="p-5">{tabs?.find((tab) => tab?.key === activeTabe)?.content}</article>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    </main>
  );
}

export default UserInfo;
