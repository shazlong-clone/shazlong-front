import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Col, Grid, Panel, Row } from 'rsuite';
import { AiOutlineMail, AiOutlineHome } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { GiEarthAfricaEurope } from 'react-icons/gi';
import Certifications from './components/Certifications';
import Interstes from './components/Interstes/index';
import Education from './components/Education';
import Experience from './components/Experience';

function DoctorProfile() {
  const info = [
    {
      id: 1,
      key: 'Email',
      value: 'ellarbae@coolmail.io',
      icon: <AiOutlineMail />,
    },
    {
      id: 2,
      key: 'Phone',
      value: '+2010096495258',
      icon: <BsTelephone />,
    },

    {
      id: 3,
      key: 'Address',
      value: 'Los Angeles, CA',
      icon: <AiOutlineHome />,
    },

    {
      id: 4,
      key: 'Website',
      value: 'ellarbae.io',
      icon: <GiEarthAfricaEurope />,
    },
    {
      id: 5,
      key: 'Feez',
      value: 'EGY 750/30 mins | EGY 1000/60 mins',
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
          <Panel className="bg-white overflow-visible">
            <div className="lg:flex gap-10">
              <article className="absolute top-[-30px] left-[50%] translate-x-[-50%] lg:static lg:translate-x-0">
                <img
                  src="https://avatars.githubusercontent.com/u/8225666"
                  className="border-[5px] border-white border-solid rounded-md object-cover w-[120px] h-[120px]"
                />
              </article>
              <article className="mt-[80px] lg:mt-0 grow">
                <h4>Ella Robinson</h4>
                <div className="lg:flex gap-5">
                  <section>
                    <p className="text-gray/50 mb-4 text-sm lg:max-w-[200px] xl:max-w-[250px]">
                      It is a long established fact that a reader will be distracted.
                    </p>
                  </section>
                  <section className="xl:grid grid-cols-2 gap-x-10">
                    {info?.map((el) => {
                      return (
                        <div key={el?.id} className="grid grid-cols-[1fr_2fr]">
                          <article className="flex gap-2 items-center">
                            <i className="text-md text-cyan">{el?.icon}</i>
                            <span className="font-[500] lg:text-[14px]">{el?.key}:</span>
                          </article>
                          <article className="font-[700] text-sm lg:text-[14px] pt-1">{el?.value}</article>
                        </div>
                      );
                    })}
                  </section>
                </div>
              </article>
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
    </>
  );
}

export default DoctorProfile;
