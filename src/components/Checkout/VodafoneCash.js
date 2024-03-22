import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Schema, Form, Grid, Row, Col, FlexboxGrid, ButtonToolbar, toaster, Message } from 'rsuite';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import withSubmit from './withSubmit';
import { PHONE_DEMO } from '../../assets/constants';

const { Group, Control } = Form;

function VodafoneCash({ data, onSubmit, loading }) {
  const { subTotal, transctionFeez, discountState } = data;
  const { t } = useTranslation();
  const { vodafoneCash } = useSelector((state) => state?.payment);
  const [open, setOpen] = React.useState(false);
  const formRef = useRef();
  const [formValue, setFormValue] = useState({
    phone: vodafoneCash?.phone,
  });
  const model = Schema.Model({
    phone: Schema.Types.StringType()
      .isRequired(t('required'))
      .addRule((value) => {
        return /^(010|\+2010)\d{8}/.test(value);
      }, t('not_valid_vodafone_number')),
  });
  useEffect(() => {
    setFormValue({ phone: vodafoneCash?.phone });
  }, [vodafoneCash]);
  return (
    <>
      <Button onClick={() => setOpen(true)} block className="font-[500] mt-3" appearance="primary">
        {t('Pay')} <span className="font-bold px-2">{subTotal + transctionFeez - discountState}</span>
        {t('Egy')}
      </Button>
      <Modal
        dialogClassName="lg:w-[450px]"
        size="xs"
        backdrop="static"
        keyboard={false}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Modal.Header>
          <Modal.Title>{t('Reserve_Session')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} onChange={setFormValue} formValue={formValue} fluid model={model}>
            <Grid fluid>
              <Row gutter={5}>
                <Col xs={24} className="mb-6 mt-3">
                  <Group controlId="cardNumber">
                    <Control placeholder={t('Phone')} name="phone" block="true" />
                  </Group>
                </Col>
              </Row>
            </Grid>
            <FlexboxGrid justify="end">
              <FlexboxGrid.Item>
                <ButtonToolbar>
                  <Button
                    onClick={() => {
                      if (formValue.phone !== PHONE_DEMO) {
                        toaster.push(
                          <Message type="error" closable showIcon>
                            {t('Invalid_Payment')}
                          </Message>,
                        );
                      } else if (formRef.current.check()) {
                        onSubmit(formValue);
                      }
                    }}
                    style={{ marginBottom: '0px' }}
                    className="mb-0"
                    type="submit"
                    appearance="primary"
                    loading={loading}
                    disabled={loading}
                  >
                    {t('Book')}
                  </Button>
                  <Button disabled={loading} style={{ marginBottom: '0px' }} onClick={() => setOpen(false)} appearance="subtle">
                    {t('Cancel')}
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

export default withSubmit(VodafoneCash);
