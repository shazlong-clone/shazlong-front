import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Col, Grid, Panel, Placeholder, Row } from 'rsuite';
import { AiOutlineMail, AiOutlineHome } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { GiEarthAfricaEurope } from 'react-icons/gi';

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
  ];
  return (
    <>
      <Breadcrumb className="px-5 lg:px-10">
        <Breadcrumb.Item as={Link} to="/doctor">
          Doctor
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className="relative">
        <img
          className="w-full absolute left-[0px] top-0 h-[150px] lg:h-[200px]"
          src="https://emilus.themenate.net/img/others/img-12.jpg"
        />
        <section className="px-5 lg:px-10  relative top-[70px] lg:top-[120px] mb-[150px]">
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
                        <div key={el?.id} className="grid grid-cols-2">
                          <article className="flex gap-2 items-center">
                            <i className="text-2xl text-cyan">{el?.icon}</i>
                            <span className="text-gray/50">{el?.key}:</span>
                          </article>
                          <article className="font-bold">{el?.value}</article>
                        </div>
                      );
                    })}
                  </section>
                </div>
              </article>
            </div>
          </Panel>
        </section>
        <section className="px-5 lg:px-10">
          <Grid fluid>
            <Row gutter={16}>
              <Col xs={8}>
                <Panel className="bg-white mb-6">
                  <Placeholder rows={15} />
                </Panel>
                <Panel className="bg-white">
                  <Placeholder rows={5} />
                </Panel>
              </Col>
              <Col xs={16}>
                <Panel className="bg-white mb-6">
                  <Placeholder rows={8} />
                </Panel>
                <Panel className="bg-white">
                  <Placeholder rows={20} />
                </Panel>
              </Col>
            </Row>
          </Grid>
        </section>
      </div>
    </>
  );
}

export default DoctorProfile;
