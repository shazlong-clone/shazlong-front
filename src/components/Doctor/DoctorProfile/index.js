import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Col, Grid, Loader, Message, Panel, Row, Uploader, useToaster } from 'rsuite';
import { AiOutlineMail, AiOutlineHome } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { ImEarth } from 'react-icons/im';
import Certifications from './components/Certifications';
import Interstes from './components/Interstes/index';
import Education from './components/Education';
import Experience from './components/Experience';
import EditModal from '../components/EditModal';
import Viewer from 'react-viewer';
import { useDispatch, useSelector } from 'react-redux';
import { getMeAsDoctor } from '../../../features/auth/authAction';
import { genders } from '../../../assets/constants';
import { LuSubtitles, LuLanguages } from 'react-icons/lu';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { CgFileDocument } from 'react-icons/cg';
import { API_BASE_URL } from '../../../config/enviroment.config';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import { useTranslation } from 'react-i18next';

function DoctorProfile() {
  const { doctorToken } = useSelector((state) => state?.auth);
  const [uploading, setUploading] = React.useState(false);
  const { profile = {} } = useSelector((state) => state?.doctor);
  const { t } = useTranslation();
  function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }
  const toaster = useToaster();
  const [fileInfo, setFileInfo] = React.useState(profile?.photo ?? null);
  const props = {
    name: 'photo',
    accept: 'image/*',
    fileListVisible: false,
    listType: 'picture',
    action: `${API_BASE_URL}/api/v1/doctors/update-photo`,
    headers: {
      authorization: `Bearer ${doctorToken}`,
    },
    onUpload: (file) => {
      setUploading(true);
      previewFile(file.blobFile, (value) => {
        setFileInfo(value);
      });
    },
    onSuccess: () => {
      setUploading(false);
      dispatch(getMeAsDoctor());
      toaster.push(<Message type="success">{t('update_successfuly')}</Message>);
    },
    onError: () => {
      setFileInfo(null);
      setUploading(false);
      toaster.push(<Message type="error">{t('internal_server_error')}</Message>);
    },
  };
  const [visible, setVisible] = useState(false);
  const { countries, languages } = useSelector((state) => state?.shared);
  const {
    fullEnName,
    prefix,
    email,
    gender,
    phone,
    feez,
    cv,
    country,
    languages: doctorLang,
  } = useSelector((state) => state?.doctor?.profile) ?? {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeAsDoctor());
  }, []);
  useEffect(() => {
    setFileInfo(profile?.photo);
  }, [profile]);
  const info = [
    {
      id: 1,
      key: 'Email',
      value: email ?? '-',
      icon: <AiOutlineMail />,
    },
    {
      id: 2,
      key: 'Phone',
      value: phone ?? '-',
      icon: <BsTelephone />,
    },

    {
      id: 3,
      key: 'Gender',
      value: genders?.find((el) => el?.id === gender)?.name ?? '-',
      icon: <AiOutlineHome />,
    },
    {
      id: 4,
      key: 'Prefix',
      value: prefix,
      icon: <LuSubtitles />,
    },
    {
      id: 5,
      key: 'Feez',
      value: feez?.at(0)?.amount ? `EGY ${feez?.at(0)?.amount}/30 mins | EGY ${feez?.at(1)?.amount}/60 mins` : '-',
      icon: <AiOutlineDollarCircle />,
    },
    {
      id: 6,
      key: 'Country',
      value: countries?.find((el) => el?.id === country)?.country_name,
      icon: <ImEarth />,
    },
    {
      id: 7,
      key: 'Languages',
      value: doctorLang?.map((langId) => languages?.find((el) => el?.id == langId)?.name)?.join(','),
      icon: <LuLanguages />,
    },

    {
      id: 8,
      key: 'CV',
      value: (
        <a className="cursor-pointer" onClick={() => setVisible(true)}>
          View
        </a>
      ),
      icon: <CgFileDocument />,
    },
  ];
  return (
    <>
      <Breadcrumb className="px-5 lg:px-36">
        <Breadcrumb.Item as={Link} to="/doctor">
          Doctor
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className="relative">
        <section className="px-5 lg:px-36  relative  mb-[24px]">
          <Panel className="bg-[var(--rs-bg-card)] overflow-visible relative">
            <div className="lg:flex gap-5">
              <article className="absolute top-[-30px] left-[50%] translate-x-[-50%] lg:static lg:translate-x-0">
                <div className="relative inline-block p-2 ">
                  <Uploader {...props}>
                    <button style={{ width: 120, height: 120, margin: '0px' }}>
                      {uploading && <Loader backdrop center />}
                      {fileInfo ? <img src={fileInfo} width="100%" height="100%" /> : <CameraRetroIcon />}
                    </button>
                  </Uploader>
                </div>
              </article>
              <article className="mt-[80px] lg:mt-0 grow relative">
                <h4 className="max-lg:text-center">{fullEnName}</h4>
                <div className="lg:flex gap-5">
                  <section className="xl:grid xl:grid-cols-2 2xl:grid-cols-4 gap-x-10">
                    {info?.map((el) => {
                      return (
                        <div key={el?.id} className="flex gap-2">
                          <article className="flex gap-2 items-center">
                            <i className="text-md text-cyan flex items-center">{el?.icon}</i>
                            <span className="font-[500] lg:text-[14px]">{el?.key}:</span>
                          </article>
                          <article className="font-[700] text-sm lg:text-[14px] pt-1 flex items-center pb-1 wrap-anywhere">
                            {el?.value}
                          </article>
                        </div>
                      );
                    })}
                  </section>
                </div>
              </article>
            </div>
            <div className="absolute top-[20px] end-[20px]">
              <EditModal />
            </div>
          </Panel>
        </section>
        <section className="px-5 lg:px-36">
          <Grid fluid>
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Interstes />
                <Certifications />
              </Col>
              <Col xs={24} md={16}>
                <Education />
                <Experience />
              </Col>
            </Row>
          </Grid>
        </section>
      </div>
      {cv ? (
        <Viewer
          dir="ltr"
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          images={[{ src: cv, alt: 'cv' }]}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default DoctorProfile;
