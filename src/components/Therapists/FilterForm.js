import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonToolbar, Rate, Radio, RadioGroup, FlexboxGrid, Form, RangeSlider, TagPicker } from 'rsuite';
import { getAllDoctors, getCountries, getLangs } from '../../features/shared/sharedActions';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { genders } from '../../assets/constants';
import {
  setCurrentDoctorPageSize,
  setDoctorSearchParams,
  setDoctorSearchLoading,
  setSearchTherapistSideBarOpen,
} from '../../features/shared/sharedSlice';
import { pageSize } from './TherapistsCard';
const NOW = 0;
const TODAY = 1;
const THIS_WEEK = 7;
function FilterForm() {
  const { i18n } = useTranslation();
  const { countries, specializationList, languages, doctorSearchParams, doctorSearchLoading, searchTherapistSideBarOpen } =
    useSelector((state) => state?.shared);
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

  const onSubmit = async () => {
    if (!formRef.current.check()) return;
    dispatch(setDoctorSearchLoading(true));
    await dispatch(getAllDoctors({ ...doctorSearchParams, page: 1, size: pageSize }));
    dispatch(setCurrentDoctorPageSize(pageSize));
    dispatch(setDoctorSearchLoading(false));
    if (searchTherapistSideBarOpen) {
      dispatch(setSearchTherapistSideBarOpen(false));
    }
  };

  const onCancel = async () => {
    dispatch(
      setDoctorSearchParams({
        amount: [10, 500],
      }),
    );
    dispatch(getAllDoctors({ amount: [10, 500], page: 1, size: pageSize }));
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
      <Form
        ref={formRef}
        formValue={doctorSearchParams}
        fluid
        onChange={(formValues) => dispatch(setDoctorSearchParams({ ...doctorSearchParams, ...formValues }))}
      >
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
          <Button loading={doctorSearchLoading} appearance="primary" type="submit" onClick={onSubmit}>
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
