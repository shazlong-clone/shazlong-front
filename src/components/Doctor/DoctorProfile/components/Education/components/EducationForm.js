import React, { useState } from 'react';

import {
  Form,
  Button,
  Schema,
  Input,
  FlexboxGrid,
  IconButton,
  DateRangePicker,
  Col,
  Divider,
  Stack,
  useToaster,
  Message,
} from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getMeAsDoctor, updateDoctorProfile } from '../../../../../../features/doctor/doctorActions';

const { ArrayType, StringType, DateType, ObjectType } = Schema.Types;
const model = Schema.Model({
  certifications: ArrayType().of(
    ObjectType().shape({
      name: StringType().isRequired('Required.').minLength(5, 'max length 5 chars'),
      title: StringType().isRequired('Required.').minLength(5, 'max length 5 chars'),
      time: ArrayType().of(DateType().isRequired('Required.')).isRequired('Required.'),
    }),
  ),
});

const ErrorMessage = ({ children }) => <span style={{ color: 'red' }}>{children}</span>;

const ProductItem = ({ rowValue = {}, onChange, rowIndex, rowError, handleMinus, education }) => {
  const handleChangeTitle = (value) => {
    onChange(rowIndex, { ...rowValue, title: value });
  };

  const handleChangeArTitle = (value) => {
    onChange(rowIndex, { ...rowValue, ar_title: value });
  };

  const handleChangePlace = (value) => {
    onChange(rowIndex, { ...rowValue, place: value });
  };
  const handleChangeArPlace = (value) => {
    onChange(rowIndex, { ...rowValue, ar_place: value });
  };

  const handleChangeTime = (value) => {
    onChange(rowIndex, { ...rowValue, time: value });
  };

  return (
    <FlexboxGrid className="max-md:border max-md:border-solid max-md:border-gray/20 rounded-sm my-1 max-md:py-5 max-md:px-4">
      <FlexboxGrid.Item as={Col} xs={24} md={4} className="max-md:mb-1">
        <Input placeholder="Title" block value={rowValue.title} onChange={handleChangeTitle} />
        {rowError ? <ErrorMessage>{rowError.title.errorMessage}</ErrorMessage> : null}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} xs={24} md={4} className="max-md:mb-1">
        <Input placeholder="Arabic Title" block value={rowValue.ar_title} onChange={handleChangeArTitle} />
        {rowError ? <ErrorMessage>{rowError.ar_title.errorMessage}</ErrorMessage> : null}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} xs={24} md={4} className="max-md:mb-1">
        <Input placeholder="Place" block value={rowValue.place} onChange={handleChangePlace} />
        {rowError ? <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage> : null}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} xs={24} md={4} className="max-md:mb-1">
        <Input placeholder="Arabic Place" block value={rowValue.ar_place} onChange={handleChangeArPlace} />
        {rowError ? <ErrorMessage>{rowError.ar_place.errorMessage}</ErrorMessage> : null}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} xs={24} md={7} className="max-md:mb-1">
        <DateRangePicker block value={rowValue.time} onChange={handleChangeTime} />
        {rowError ? <ErrorMessage>{rowError.time.errorMessage}</ErrorMessage> : null}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} xs={24} md={1} className="max-md:text-end">
        <IconButton disabled={education?.length === 1} onClick={() => handleMinus(rowIndex)} icon={<MinusIcon />} />
        {rowError ? <div>&#160;</div> : null}
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

const ProductInputControl = ({ value = [], onChange, fieldError }) => {
  const errors = fieldError ? fieldError.array : [];
  const [education, setEducation] = React.useState(value);
  const handleChangeProducts = (nextProducts) => {
    setEducation(nextProducts);
    onChange(nextProducts);
  };
  const handleInputChange = (rowIndex, value) => {
    const nextProducts = [...education];
    nextProducts[rowIndex] = value;
    handleChangeProducts(nextProducts);
  };

  const handleMinus = (index) => {
    if (index === null || index === undefined) {
      handleChangeProducts(education.slice(0, -1));
    } else {
      education.splice(index, 1);
      handleChangeProducts(education);
    }
  };
  const handleAdd = () => {
    handleChangeProducts(education.concat([{ title: '', ar_title: '', palce: '', ar_palce: '', time: '' }]));
  };
  return (
    <div className="w-full">
      {education.map((rowValue, index) => (
        <>
          <ProductItem
            key={index}
            rowIndex={index}
            rowValue={rowValue}
            rowError={errors[index] ? errors[index].object : null}
            onChange={handleInputChange}
            handleMinus={handleMinus}
            education={education}
          />
        </>
      ))}
      <Button className="mt-5 flex gap-1" onClick={handleAdd}>
        <PlusIcon className="text-cyan" />
        <span>Add Education</span>
      </Button>
    </div>
  );
};
const EducationForm = ({ handleClose }) => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const { profile } = useSelector((state) => state?.doctor);
  const [formValue, setFormValue] = React.useState({
    educations: profile?.educations
      ? profile?.educations?.map((el) => {
          return { ...el, time: el?.time?.map((d) => new Date(d)) };
        })
      : [{ title: '', ar_title: '', place: '', ar_place: '', time: '' }],
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toaster = useToaster();
  const { t } = useTranslation();

  const handelSubmit = async () => {
    if (!formRef.current.check()) return;
    try {
      setLoading(true);
      const res = await dispatch(updateDoctorProfile(formValue));
      if (res?.payload?.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('updated_successfuly')}
          </Message>,
          { duration: 5000 },
        );
        dispatch(getMeAsDoctor());
        handleClose();
      } else {
        toaster.push(
          <Message type="error" closable showIcon>
            {res.payload.message}
          </Message>,
          { duration: 5000 },
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

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={24}>
        <hr />
        <Form
          ref={formRef}
          checkTrigger="blur"
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <Form.Control name="education" accepter={ProductInputControl} fieldError={formError.education} />
          <hr />
          <FlexboxGrid justify="end">
            <FlexboxGridItem>
              <Stack spacing={6}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button loading={loading} appearance="primary" onClick={handelSubmit}>
                  Save
                </Button>
              </Stack>
            </FlexboxGridItem>
          </FlexboxGrid>
        </Form>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default EducationForm;
