import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Col, Grid, Panel, Row, Tooltip, Whisper } from 'rsuite';
import { AiOutlineMail, AiOutlineHome } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { GiEarthAfricaEurope } from 'react-icons/gi';
import Certifications from './components/Certifications';
import Interstes from './components/Interstes/index';
import Education from './components/Education';
import Experience from './components/Experience';
import EditModal from '../components/EditModal';
import Viewer from 'react-viewer';
import { useDispatch, useSelector } from 'react-redux';
import { getMeAsDoctor } from '../../../features/auth/authAction';
import { genders } from '../../../assets/constants';

function DoctorProfile() {
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
  } = useSelector((state) => state?.doctor.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeAsDoctor());
  }, []);
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
      icon: <GiEarthAfricaEurope />,
    },
    {
      id: 5,
      key: 'Feez',
      value: feez?.at(0)?.amount ? `EGY ${feez?.at(0)?.amount}/30 mins | EGY ${feez?.at(1)?.amount}/60 mins` : '-',
      icon: <GiEarthAfricaEurope />,
    },
    {
      id: 6,
      key: 'Country',
      value: countries?.find((el) => el?.id === country)?.country_name,
      icon: <GiEarthAfricaEurope />,
    },
    {
      id: 7,
      key: 'Country',
      value: doctorLang?.map((langId) => languages?.find((el) => el?.id == langId)?.name)?.join(','),
      icon: <GiEarthAfricaEurope />,
    },

    {
      id: 8,
      key: 'CV',
      value: (
        <a className="cursor-pointer" onClick={() => setVisible(true)}>
          View
        </a>
      ),
      icon: <GiEarthAfricaEurope />,
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
          <Panel className="bg-white overflow-visible relative">
            <div className="lg:flex gap-10">
              <article className="absolute top-[-30px] left-[50%] translate-x-[-50%] lg:static lg:translate-x-0">
                <img
                  src="https://avatars.githubusercontent.com/u/8225666"
                  className="border-[5px] border-white border-solid rounded-md object-cover w-[120px] h-[120px]"
                />
              </article>
              <article className="mt-[80px] lg:mt-0 grow relative">
                <h4>{fullEnName}</h4>
                <div className="lg:flex gap-5">
                  <section className="xl:grid xl:grid-cols-2 2xl:grid-cols-4 gap-x-10">
                    {info?.map((el) => {
                      return (
                        <div key={el?.id} className="flex gap-2">
                          <article className="flex gap-2 items-center">
                            <i className="text-md text-cyan flex items-center">{el?.icon}</i>
                            <span className="font-[500] lg:text-[14px]">{el?.key}:</span>
                          </article>
                          <article className="font-[700] text-sm lg:text-[14px] pt-1 flex items-center pb-1">{el?.value}</article>
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
      <Viewer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        images={[{ src: cv, alt: 'cv' }]}
      />
    </>
  );
}

export default DoctorProfile;
