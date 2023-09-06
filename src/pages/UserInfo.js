import React, { useState } from 'react';
import Card from '../components/Shared/Card';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { useToaster, Message, Uploader, Loader, Grid, Col, Row } from 'rsuite';
import { useTranslation } from 'react-i18next';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import { API_BASE_URL } from '../config/enviroment.config';
import PersonalInfo from '../components/UserInfo/PersonalInfo';
import PaymentInfo from '../components/UserInfo/PaymentInfo';

function UserInfo() {
  const { user = {} } = useSelector((state) => state?.auth);

  const { t } = useTranslation();
  const toaster = useToaster();

  const [activeTabe, setActiveTabe] = useState(1);

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
  const props = {
    name: 'photo',
    fileListVisible: false,
    listType: 'picture',
    action: `${API_BASE_URL}/api/v1/users/uploadPhoto`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    onUpload: (file) => {
      setUploading(true);
      previewFile(file.blobFile, (value) => {
        setFileInfo(value);
      });
    },
    onSuccess: () => {
      setUploading(false);
      toaster.push(<Message type="success">Uploaded successfully</Message>);
    },
    onError: () => {
      setFileInfo(null);
      setUploading(false);
      toaster.push(<Message type="error">Upload failed</Message>);
    },
  };
  return (
    <main className="bg-cyan/10 py-5">
      <div className="container">
        <Grid className="lg:my-10">
          <Row gutter={24}>
            <Col xs={24} lg={8}>
              <Card className="rounded-none text-center">
                <div className="relative inline-block p-2">
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
                  <div
                    onClick={() => setActiveTabe(1)}
                    className={clsx(
                      'grow px-5 py-4 capitalize border-solid border-t-0 border-r-0 border-l-0 font-semibold cursor-pointer',
                      activeTabe === 1 ? 'border-b-2 border-cyan text-cyan' : 'border-b border-gray',
                    )}
                  >
                    {t('Personal_Info')}
                  </div>
                  <div
                    onClick={() => setActiveTabe(2)}
                    className={clsx(
                      'grow px-5 py-4 capitalize  border-solid border-t-0 border-r-0 border-l-0 font-semibold cursor-pointer',
                      activeTabe === 2 ? 'border-b-2 border-cyan text-cyan' : 'border-b border-gray',
                    )}
                  >
                    {t('Payment_Info')}
                  </div>
                </article>
                <article className="h-[460px] p-5">{activeTabe === 1 ? <PersonalInfo /> : <PaymentInfo />}</article>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    </main>
  );
}

export default UserInfo;
