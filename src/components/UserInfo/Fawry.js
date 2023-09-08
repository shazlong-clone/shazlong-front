import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  Schema,
  Form,
  Message,
  useToaster,
  Grid,
  Row,
  Col,
  MaskedInput,
  FlexboxGrid,
  ButtonToolbar,
} from 'rsuite';

import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdatePayment } from '../../features/payment/paymentSlice';
import { useTranslation } from 'react-i18next';

const { Group, Control } = Form;

function CreditCard() {
  const { t } = useTranslation();
  const { fawry } = useSelector((state) => state?.payment);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const formRef = useRef();
  const toaster = useToaster();
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    email: fawry?.email,
    phone: fawry?.phone,
  });
  const onSubmit = async () => {
    if (!formRef.current.check()) return;
    try {
      setLoading(true);
      const res = await dispatch(
        createOrUpdatePayment({
          payment: {
            fawry: formValue,
          },
        }),
      );
      if (res?.payload?.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('updated_successfuly')}
          </Message>,
          { duration: 5000 },
        );
        setOpen(false);
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
  const model = Schema.Model({
    email: Schema.Types.StringType().isRequired(t('required')).isEmail('not_vaid_email'),
    phone: Schema.Types.StringType()
      .isRequired(t('required'))
      .addRule((value) => {
        return /^(010|\+2010)\d{8}/.test(value);
      }, t('not_valid_vodafone_number')),
  });
  useEffect(() => {
    setFormValue({ email: fawry?.email, phone: fawry?.phone });
  }, [fawry]);

  return (
    <>
      <a className="cursor-pointer underline" onClick={() => setOpen(true)}>
        Add New
      </a>
      <Modal
        dialogClassName="lg:w-[450px]"
        size="xs"
        backdrop="static"
        keyboard={false}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Modal.Header>
          <Modal.Title>Add Credit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} onChange={setFormValue} formValue={formValue} fluid model={model}>
            <Grid fluid>
              <Row gutter={5} className="mt-5">
                <Col xs={12} className="mb-6">
                  <Group controlId="email">
                    <Control placeholder="Email" name="email" block="true" />
                  </Group>
                </Col>
                <Col xs={12}>
                  <Group controlId="phone">
                    <Control placeholder="Phone" name="phone" block="true" />
                  </Group>
                </Col>
              </Row>
            </Grid>
            <FlexboxGrid justify="end">
              <FlexboxGrid.Item>
                <ButtonToolbar>
                  <Button
                    onClick={onSubmit}
                    style={{ marginBottom: '0px' }}
                    className="mb-0"
                    type="submit"
                    appearance="primary"
                    loading={loading}
                    disabled={loading}
                  >
                    Add
                  </Button>
                  <Button disabled={loading} style={{ marginBottom: '0px' }} onClick={() => setOpen(false)} appearance="subtle">
                    Cancel
                  </Button>
                </ButtonToolbar>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default CreditCard;
