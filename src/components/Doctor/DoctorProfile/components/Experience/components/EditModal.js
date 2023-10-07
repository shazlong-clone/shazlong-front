import React, { forwardRef, useRef, useState } from 'react';
import {
  Button,
  DateRangePicker,
  FlexboxGrid,
  Form,
  IconButton,
  Loader,
  Message,
  Modal,
  Schema,
  Stack,
  Uploader,
  toaster,
} from 'rsuite';
import { RiAddFill } from 'react-icons/ri';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { useDispatch } from 'react-redux';
import { getMeAsDoctor, addOrUpdateDoctorExperience } from '../../../../../../features/doctor/doctorActions';
import { useTranslation } from 'react-i18next';

function EditModal() {
  const formRef = useRef();
  const handleClose = () => setOpen(false);

  const [formValue, setFormValue] = useState({});
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
            {t('Updated_Succefuly')}
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
          {fileInfo ? <img src={fileInfo} width="100%" height="100%" /> : <AvatarIcon style={{ fontSize: 80 }} />}
        </button>
      </Uploader>
    );
  });

  return (
    <>
      <IconButton onClick={handleOpen} size="lg" className="rounded-full" icon={<RiAddFill />} />
      <Modal backdrop="static" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: 'visible', maxHeight: 'fit-content', paddingBottom: '0px', marginTop: '0px' }}>
          <Form fluid model={model} formValue={formValue} onChange={setFormValue} ref={formRef}>
            <hr className="m-2 mx-0" />
            <Form.Group controlId="title">
              <Form.HelpText>Title</Form.HelpText>
              <Form.Control placeholder="Enter Title" block name="title" />
            </Form.Group>
            <Form.Group controlId="ar_title">
              <Form.HelpText>Arabic Title</Form.HelpText>
              <Form.Control placeholder="Enter Arabic Title" block name="ar_title" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.HelpText>Description</Form.HelpText>
              <Form.Control placeholder="Enter Description" block name="description" />
            </Form.Group>
            <Form.Group controlId="ar_description">
              <Form.HelpText>Arabic Description</Form.HelpText>
              <Form.Control placeholder="Enter Arabic Description" block name="ar_description" />
            </Form.Group>
            <Form.Group controlId="time">
              <Form.HelpText>Time</Form.HelpText>
              <Form.Control block name="time" accepter={DateRangePicker} />
            </Form.Group>
            <Form.Group controlId="uploader">
              <Form.HelpText>Company Pic</Form.HelpText>
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button loading={loading} appearance="primary" onClick={handleSubmit} type="submit">
                  Save
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
