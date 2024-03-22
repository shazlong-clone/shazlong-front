import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonToolbar, Rate, Radio, RadioGroup, FlexboxGrid, Form, RangeSlider, TagPicker } from 'rsuite';
import { getAllDoctors, getCountries, getLangs } from '../../features/shared/sharedActions';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { availability, genders } from '../../assets/constants';
import { setDoctorSearchParams, setDoctorSearchLoading, setSearchTherapistSideBarOpen } from '../../features/shared/sharedSlice';
import { pageSize } from './TherapistsCard';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { RemoveNullKeys } from '../../utils/fn';
export const initalSearchParams = {
  amount: [0, 500],
  availability: 'all',
  country: [],
  specialization: [],
  gender: null,
  languages: [],
  rate: null,
  name: '',
  sortBy: '',

};

function FilterForm() {
  const { i18n, t } = useTranslation();
  const { countries, specializationList, languages, doctorSearchLoading, searchTherapistSideBarOpen } =
    useSelector((state) => state?.shared);
  const countriesOptions = countries.map((item) => ({
    label: (
      <div key={item?.id} className="flex gap-1">
        <span className={clsx(item?.country_flag, 'min-w-[1.3em]')} />
        <span className="max-w-[250px] lg:max-w-[220px] whitespace-nowrap overflow-hidden text-ellipsis">
          {item?.country_name}
        </span>
      </div>
    ),
    value: item?.id,
  }));
  const specializationOptions = specializationList.map((item) => ({
    label: i18n?.resolvedLanguage === 'ar' ? item?.ar_name : item?.name,
    value: item?.id,
  }));
  const langOptions = languages?.map((lang) => {
    return {
      label: i18n.resolvedLanguage === 'ar' ? lang?.ar_name : lang?.name,
      value: lang?.id,
    };
  });
  const formRef = useRef();
  const [searchParams] = useSearchParams();
  
  const search = useMemo(() => {
    const amount = searchParams.getAll('amount')?.map((el) => Number(el));
    return {
      amount: amount?.length ? amount : [10, 500],
      availability: searchParams.get('availability') ?? 'all',
      country: searchParams.getAll('country')?.map((el) => Number(el)) ?? [],
      specialization: searchParams.getAll('specialization')?.map((el) => Number(el)) ?? [],
      gender: Number(searchParams.get('gender')) || null,
      languages: searchParams.getAll('languages')?.map((el) => Number(el)) ?? [],
      rate: Number(searchParams.get('rate')) ?? null,
      name: searchParams.get('name') ?? null,
      sortBy: Number(searchParams.get('sortBy')) ?? '',
      sort: searchParams.get('sort') ?? 'ASC',
    };
  }, [searchParams]);


  const [formValues, setFormValues] = useState(search);
  const navigate = useNavigate();
  const onSubmit = async () => {
    if (!formRef.current.check()) return;
    dispatch(setDoctorSearchLoading(true));
    navigate({
      search: `?${createSearchParams(RemoveNullKeys(formValues))}`,
    });
    await dispatch(getAllDoctors({ ...formValues, page: 1, size: pageSize }));
    dispatch(setDoctorSearchParams({ ...formValues, page: 1, size: pageSize }));

    dispatch(setDoctorSearchLoading(false));
    if (searchTherapistSideBarOpen) {
      dispatch(setSearchTherapistSideBarOpen(false));
    }
  };

  const onCancel = async () => {
    dispatch(setDoctorSearchLoading(true));
    dispatch(setDoctorSearchParams(initalSearchParams));
    setFormValues(initalSearchParams);
    navigate({
      search: `?${createSearchParams(RemoveNullKeys(initalSearchParams))}`,
    });
    await dispatch(getAllDoctors(initalSearchParams));
    dispatch(setDoctorSearchLoading(false));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getLangs());
    dispatch(getAllDoctors(search));
    setDoctorSearchParams(search);
  }, []);

  return (
    <div className="lg:bg-[var(--rs-bg-card)] lg:p-5 lg:rounded-3xl">
      <h3 className="text-center hidden lg:block">{t('Filter')}</h3>
      <hr className="hidden lg:block" />
      <Form ref={formRef} formValue={formValues} onChange={setFormValues} fluid>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan">{t('Availability')}</Form.ControlLabel>
          <Form.Control name="availability" accepter={RadioGroup}>
            {availability?.map((el) => {
              return (
                <Radio key={el?.id} value={el?.id}>
                  {t(el?.name)}
                </Radio>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="selectPicker">
          <Form.ControlLabel className="font-bold text-lg text-cyan">{t('Country')}</Form.ControlLabel>
          <Form.Control
            preventOverflow
            palcement="bottomStart"
            menuMaxHeight={200}
            name="country"
            accepter={TagPicker}
            data={countriesOptions}
            block
          />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan mb-3">{t('Areas_Of_Interest')}</Form.ControlLabel>
          <Form.Control name="specialization" accepter={TagPicker} data={specializationOptions} block />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan">{t('Gender')}</Form.ControlLabel>
          <Form.Control name="gender" inline accepter={RadioGroup}>
            {genders?.map((el) => {
              return (
                <Radio key={el?.id} value={el?.id}>
                  {i18n.resolvedLanguage === 'ar' ? el?.ar_name : el?.name}
                </Radio>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan">{t('Language')}</Form.ControlLabel>
          <Form.Control block name="languages" accepter={TagPicker} data={langOptions} />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan">{t('Rate')}</Form.ControlLabel>
          <Form.Control name="rate" accepter={Rate} />
        </Form.Group>

        <Form.Group controlId="slider">
          <Form.ControlLabel className="font-bold text-lg text-cyan b">
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item>{t('Feez')}:</FlexboxGrid.Item>
              <FlexboxGrid.Item>{t('Egy')}</FlexboxGrid.Item>
            </FlexboxGrid>
          </Form.ControlLabel>
          <Form.Control
            className="slider-custom mt-10"
            accepter={RangeSlider}
            step={10}
            min={10}
            max={2000}
            name="amount"
            label="Level"
          />
        </Form.Group>
        <ButtonToolbar className="flex justify-center">
          <Button loading={doctorSearchLoading} appearance="primary" type="submit" onClick={onSubmit}>
            {t('Search')}
          </Button>
          <Button appearance="ghost" type="reset" onClick={onCancel}>
            {t('Cancel')}
          </Button>
        </ButtonToolbar>
      </Form>
    </div>
  );
}

export default FilterForm;
