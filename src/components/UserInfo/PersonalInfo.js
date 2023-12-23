import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  Button,
  ButtonToolbar,
  DatePicker,
  Form,
  InputGroup,
  InputPicker,
  Radio,
  RadioGroup,
  useToaster,
  FlexboxGrid,
  Message,
} from 'rsuite';
import { genders } from '../../assets/constants';
import { updateMe } from '../../features/auth/authAction';
import { FiEdit2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { getCountries } from '../../features/shared/sharedActions';

const { Group, HelpText, Control } = Form;
function PersonalInfo() {
  const [plainText, setPlainText] = useState(true);
  const formRef = useRef();
  const { user = {} } = useSelector((state) => state?.auth);
  const initalFormValues = {
    name: user?.name || '',
    email: user?.email || '',
    countryId: user?.countryId || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    birthDate: new Date(user?.birthDate),
    countryCode: user?.countryCode,
  };
  const [formValue, setFormValues] = useState(initalFormValues);
  const { countries } = useSelector((state) => state?.shared);

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

  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState(user?.countryCode || '');
  const toaster = useToaster();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!formRef.current.check()) return;
    if (formValue?.password !== formValue.passwordConfirm) {
      return toaster.push(
        <Message closable showIcon type="error">
          {t('password_passwordconfirm_ne')}
        </Message>,
        {
          duration: 5000,
        },
      );
    }
    try {
      setLoading(true);
      const params = {
        ...formValue,
        countryCode,
      };
      const res = await dispatch(updateMe(params));
      if (res?.payload?.status) {
        toaster.push(
          <Message closable showIcon type="success">
            {t('update_successfuly')}
          </Message>,
          {
            duration: 5000,
          },
        );
        setPlainText(true);
      } else {
        toaster.push(
          <Message closable showIcon type="error">
            {res?.payload?.message}
          </Message>,
          {
            duration: 5000,
          },
        );
      }
    } catch (err) {
      toaster.push(
        <Message closable showIcon type="error">
          {t('internal_server_error')}
        </Message>,
        {
          duration: 5000,
        },
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getCountries());
  }, []);
  return (
    <article className="relative">
      {plainText ? (
        <a className="cursor-pointer absolute end-0 top-0 mt-5 mx-3 z-20" onClick={() => setPlainText(false)}>
          {t('Edit')} <FiEdit2 />
        </a>
      ) : (
        ''
      )}

      <Form plaintext={plainText} ref={formRef} formValue={formValue} onChange={setFormValues} fluid className="sign-form">
        <Group controlId="name">
          <Form.ControlLabel>{t('Name')}</Form.ControlLabel>
          <Control size="lg" placeholder={t('Name')} name="name" block="true" />
          {!plainText ? <HelpText>{t('Name_Helper_Text')}</HelpText> : ''}
        </Group>
        <Group controlId="email">
          <Form.ControlLabel>{t('Email')}</Form.ControlLabel>
          <Control size="lg" block="true" placeholder={t('Email')} name="email" />
        </Group>
        <Group controlId="countryId">
          <Form.ControlLabel>{t('Country')}</Form.ControlLabel>
          <Control
            onSelect={(id) => {
              setCountryCode(countries?.find((el) => el?.id === id)?.country_code);
            }}
            placeholder={t('Country')}
            menuMaxHeight={300}
            menuStyle={{ maxWidth: '10px' }}
            block
            name="countryId"
            accepter={InputPicker}
            data={countriesData}
            size="lg"
          />
        </Group>
        <Group controlId="birthDate">
          <Form.ControlLabel>{t('Birth_Date')}</Form.ControlLabel>
          <Control placeholder={t('Birth_Date')} accepter={DatePicker} style={{ width: '100%' }} name="birthDate" block />
        </Group>
        <Group controlId="phone">
          <Form.ControlLabel>{t('Phone')}</Form.ControlLabel>

          {plainText ? (
            <Control name="phone" placeholder={t('Phone')} size="lg" />
          ) : (
            <InputGroup>
              <InputGroup.Addon>{countryCode}</InputGroup.Addon>
              <Control name="phone" placeholder={t('Phone')} size="lg" />
            </InputGroup>
          )}
        </Group>
        <Group controlId="gender">
          <Form.ControlLabel>{t('Gender')}</Form.ControlLabel>
          <Control accepter={RadioGroup} name="gender" inline>
            {genders?.map((el) => {
              return (
                <Radio key={el?.id} value={el?.id}>
                  {t(el?.name)}
                </Radio>
              );
            })}
          </Control>
        </Group>

        {plainText ? (
          ''
        ) : (
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <Group controlId="submit">
                <ButtonToolbar>
                  <Button disabled={loading} onClick={handleSubmit} appearance="primary" type="submit" loading={loading}>
                    <strong className="pb-[1px] mx-[2px]">{t('Update')}</strong>
                  </Button>
                  <Button
                    onClick={() => {
                      setPlainText(true);
                      setFormValues(initalFormValues);
                    }}
                  >
                    {t('Cancel')}
                  </Button>
                </ButtonToolbar>
              </Group>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        )}
      </Form>
    </article>
  );
}

export default PersonalInfo;
