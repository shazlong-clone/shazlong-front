import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Button, DateRangePicker, FlexboxGrid, Form, IconButton, Message, Modal, Schema, Stack, Uploader, toaster } from 'rsuite';
import { RiAddFill } from 'react-icons/ri';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import { useDispatch } from 'react-redux';
import { getMeAsDoctor, addOrUpdateDoctorExperience } from '../../../../../../features/doctor/doctorActions';
import { useTranslation } from 'react-i18next';
import { MdOutlineEdit } from 'react-icons/md';

function EditModal({ experience }) {
  const formRef = useRef();
  const handleClose = () => setOpen(false);

  const [formValue, setFormValue] = useState({ ...experience, time: experience?.time?.map((el) => new Date(el)) });
  const model = Schema.Model({
    time: Schema.Types.ArrayType().of(Schema.Types.DateType().isRequired('Required.')).isRequired('Required.'),
    title: Schema.Types.StringType().isRequired('Required.'),
    ar_title: Schema.Types.StringType().isRequired('Required.'),
    description: Schema.Types.StringType().isRequired('Required.'),
    ar_description: Schema.Types.StringType().isRequired('Required.'),
  });
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const handleSubmit = async () => {
    if (!formRef.current.check()) return;
    try {
      setLoading(true);
      let formData = new FormData();
      for (const key in formValue) {
        formData.append(key, formValue[key]);
      }
      const res = await dispatch(addOrUpdateDoctorExperience(formData));
      if (res.payload.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('updated_successfuly')}
          </Message>,
          { duration: 2000 },
        );
        dispatch(getMeAsDoctor());
        setOpen(false);
      } else {
        toaster.push(
          <Message type="error" closable showIcon>
            {res.payload.message}
          </Message>,
          { duration: 2000 },
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
  function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }
  const [fileInfo, setFileInfo] = React.useState(null);
  const CustomUploader = forwardRef((props, ref) => {
    return (
      <Uploader
        ref={ref}
        fileListVisible={false}
        listType="picture"
        onUpload={(file) => {
          previewFile(file.blobFile, (value) => {
            setFileInfo(value);
          });
          setFormValue({ ...formValue, company_logo: file.blobFile });
        }}
      >
        <button style={{ width: 150, height: 150 }}>
          {fileInfo ? <img src={fileInfo} width="100%" height="100%" /> : <CameraRetroIcon style={{ fontSize: 80 }} />}
        </button>
      </Uploader>
    );
  });

  useEffect(() => {
    if (experience?.company_logo) {
      const url = `${experience?.company_logo}`;
      fetch(url)
        .then((res) => setFormValue({ ...formValue, company_logo: res.blob() }))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
      setFileInfo(url);
    }
  }, []);
  return (
    <>
      {!experience ? (
        <IconButton onClick={handleOpen} size="lg" className="rounded-full" icon={<RiAddFill />} />
      ) : (
        <IconButton onClick={handleOpen} icon={<MdOutlineEdit />} className="rounded-full" />
      )}

      <Modal backdrop="static" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{experience ? t('Edit_Experience') : t('Add_Experience')}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: 'visible', maxHeight: 'fit-content', paddingBottom: '0px', marginTop: '0px' }}>
          <Form fluid model={model} formValue={formValue} onChange={setFormValue} ref={formRef}>
            <hr className="mx-0" />
            <Form.Group controlId="title">
              <Form.HelpText>{t('Title')}</Form.HelpText>
              <Form.Control dir="ltr" placeholder={t('Title')} block name="title" />
            </Form.Group>
            <Form.Group controlId="ar_title">
              <Form.HelpText>{t('Arabic_Title')}</Form.HelpText>
              <Form.Control dir="rtl" placeholder={t('Arabic_Title')} block name="ar_title" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.HelpText>{t('Description')}</Form.HelpText>
              <Form.Control dir="ltr" placeholder={t('Description')} block name="description" />
            </Form.Group>
            <Form.Group controlId="ar_description">
              <Form.HelpText>{t('Arabic_Description')}</Form.HelpText>
              <Form.Control dir="rtl" placeholder={t('Arabic_Description')} block name="ar_description" />
            </Form.Group>
            <Form.Group controlId="time">
              <Form.HelpText>{t('Date')}</Form.HelpText>
              <Form.Control block name="Date" accepter={DateRangePicker} />
            </Form.Group>
            <Form.Group controlId="uploader">
              <Form.HelpText>{t('Company_Picture')}</Form.HelpText>
              <Form.Control
                fileList={fileList}
                onChange={(files) => {
                  setFileList([{ name: files?.at(-1)?.blobFile?.name }]);
                }}
                name="company_logo"
                accepter={CustomUploader}
              />
            </Form.Group>
            <hr className="m-3 mx-0" />
            <FlexboxGrid justify="end">
              <Stack spacing={16}>
                <Button onClick={handleClose}>{t('Cancel')}</Button>
                <Button loading={loading} appearance="primary" onClick={handleSubmit} type="submit">
                  {t('Save')}
                </Button>
              </Stack>
            </FlexboxGrid>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModal;
