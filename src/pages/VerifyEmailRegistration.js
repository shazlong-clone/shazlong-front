import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, DatePicker, Form, Grid, InputNumber, InputPicker, Row, TagPicker, Uploader } from 'rsuite';
import logo from '../assets/images/shezlong-logo.svg';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
const { Control, HelpText, Group } = Form;
function VerifyEmailRegistration() {
  const [countries, setCountries] = useState([]);
  const formRef = useRef();
  const [formValue, setFormValue] = useState({});
  const onSubmit = () => {
    if (!formRef.current.check()) return;
  };
  const [lang, setLang] = useState([]);
  const { i18n } = useTranslation();
  const data = lang.map((item) => ({ label: i18n?.resolvedLanguage === 'ar' ? item.ar_name : item?.name, value: item?.id }));
  const countriesData = countries?.map((item) => ({
    label: (
      <div key={item?.id} className="flex gap-1">
        <span className={clsx(item?.country_flag, 'min-w-[1.3em]')} />
        <span>{item?.country_name}</span>
        <strong className="text-gray/25">{item?.country_code}</strong>
      </div>
    ),
    value: item?.id,
  }));
  const prefixData = ['Dr', 'PsyD', 'Prof', 'MBPsS', 'Mr', 'Mrs', 'Ms'].map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  useEffect(() => {
    fetch('/api/lang.json').then((res) => {
      res.json().then((resJson) => {
        setLang(resJson);
      });
    });
    fetch('/api/countries.json').then((res) => {
      res.json().then((resJosn) => {
        setCountries(resJosn);
      });
    });
  }, []);

  return (
    <main className="bg-gray/5 min-h-screen">
      <div className="container">
        <div className="text-center pt-5 mb-[60px]">
          <img src={logo} alt="" />
          <p className="font-[500] text-[20px] mt-5">
            Registration <span className="text-cyan">Step 2/3</span>
          </p>
          <div className="w-[50px] h-[3px] bg-cyan m-auto mt-5" />
        </div>
        <Form ref={formRef} formValue={formValue} onChange={setFormValue} fluid>
          <Grid>
            <Row gutter={16}>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Full Name In English *</HelpText>
                  <Control placeholder="Full Name" name="en_name" />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Full Name In Arabic *</HelpText>
                  <Control placeholder="الاسم" name="ar_name" />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Experience year *</HelpText>
                  <Control accepter={InputNumber} placeholder="الاسم" name="experience_year" />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Country *</HelpText>
                  <Control data={countriesData} className="w-full" accepter={InputPicker} placeholder="Country" name="country" />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Birth Date *</HelpText>
                  <Control className="w-full" accepter={DatePicker} placeholder="Birth Date" name="birthDate" />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Language *</HelpText>
                  <Control data={data} className="w-full" accepter={TagPicker} placeholder="language" name="lang" />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-5">
                <Group>
                  <HelpText>Prefix *</HelpText>
                  <Control data={prefixData} className="w-full" accepter={InputPicker} placeholder="prefix" name="prefix" />
                </Group>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Uploader listType="picture-text" action="//jsonplaceholder.typicode.com/posts/" />
              </Col>
              <Col>
                <Button onClick={onSubmit} type="submit" appearance="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </Grid>
        </Form>
      </div>
    </main>
  );
}

export default VerifyEmailRegistration;
