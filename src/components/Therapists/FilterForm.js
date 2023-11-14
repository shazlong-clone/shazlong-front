import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonToolbar, Rate, Radio, RadioGroup, FlexboxGrid, Form, InputPicker, RangeSlider, TagPicker } from 'rsuite';
import { getAllDoctors, getCountries, getLangs } from '../../features/shared/sharedActions';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { genders } from '../../assets/constants';
const NOW = 0;
const TODAY = 1;
const THIS_WEEK = 7;
function FilterForm({ setLoading, loading }) {
  const { i18n } = useTranslation();
  const { countries, specializationList, languages } = useSelector((state) => state?.shared);
  const countriesOptions = countries.map((item) => ({
    label: (
      <div key={item?.id} className="flex gap-1">
        <span className={clsx(item?.country_flag, 'min-w-[1.3em]')} />
        <span className="max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis">{item?.country_name}</span>
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
  const [formValue, setFormValue] = useState({
    amount: [0, 500],
    availability: null,
    country: [],
    specialization: [],
    gender: null,
    languages: [],
    rate: null,
  });

  const onSubmit = async () => {
    if (!formRef.current.check()) return;

    let params = { ...formValue };
    if (formValue?.availability === NOW) {
      params.isOnline = true;
      delete params['availability'];
    }
    if (formValue?.amount) {
      params.minAmount = formValue.amount[0];
      params.maxAmount = formValue.amount[1];
      delete params['amount'];
    }
    if (formValue?.languages) {
      params['languages'] = formValue?.languages?.join(',');
    }
    if (formValue?.country) {
      params['country'] = formValue?.country?.join(',');
    }
    if (formValue?.specialization) {
      params['specialization'] = formValue?.specialization?.join(',');
    }

    setLoading(true);
    await dispatch(getAllDoctors(params));
    setLoading(false);
  };
  const onCancel = async () => {
    setFormValue({});
    dispatch(getAllDoctors());
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getLangs());
  }, []);
  return (
    <div className="lg:bg-white lg:p-5 lg:rounded-3xl">
      <h3 className="text-center hidden lg:block">Filter</h3>
      <hr className="hidden lg:block" />
      <Form ref={formRef} formValue={formValue} fluid onChange={setFormValue}>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan">Availability</Form.ControlLabel>
          <Form.Control name="availability" accepter={RadioGroup}>
            <Radio value={TODAY}>Today</Radio>
            <Radio value={NOW}>Now</Radio>
            <Radio value={THIS_WEEK}>This Week</Radio>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="selectPicker">
          <Form.ControlLabel className="font-bold text-lg text-cyan">Country:</Form.ControlLabel>
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
          <Form.ControlLabel className="font-bold text-lg text-cyan mb-3">Areas of interest</Form.ControlLabel>
          <Form.Control name="specialization" accepter={TagPicker} data={specializationOptions} block />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan">Gender</Form.ControlLabel>
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
          <Form.ControlLabel className="font-bold text-lg text-cyan">languages</Form.ControlLabel>
          <Form.Control block name="languages" accepter={TagPicker} data={langOptions} />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="font-bold text-lg text-cyan">Rate</Form.ControlLabel>
          <Form.Control name="rate" accepter={Rate} />
        </Form.Group>

        <Form.Group controlId="slider">
          <Form.ControlLabel className="font-bold text-lg text-cyan b">
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item>Feez:</FlexboxGrid.Item>
              <FlexboxGrid.Item>Egy</FlexboxGrid.Item>
            </FlexboxGrid>
          </Form.ControlLabel>
          <Form.Control
            className="slider-custom"
            accepter={RangeSlider}
            step={10}
            min={10}
            max={2000}
            name="amount"
            label="Level"
          />
        </Form.Group>
        <ButtonToolbar className="flex justify-center">
          <Button loading={loading} appearance="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button>
          <Button appearance="ghost" type="reset" onClick={onCancel}>
            Cancel
          </Button>
        </ButtonToolbar>
      </Form>
    </div>
  );
}

export default FilterForm;
