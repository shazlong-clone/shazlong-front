import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Schema, Form, Grid, Row, Col, MaskedInput, FlexboxGrid, ButtonToolbar, toaster, Message } from 'rsuite';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import withSubmit from './withSubmit';
import { CARD_NUMBER_DEMO, CVC_DEMO, EXPIREDATE_DEMO } from '../../assets/constants';

const { Group, Control } = Form;

function CreditCard({ data, onSubmit, loading, open, setOpen }) {
  const { subTotal, transctionFeez, discountState } = data;
  const { t } = useTranslation();
  const { card } = useSelector((state) => state?.payment);
  const formRef = useRef();
  const [formValue, setFormValue] = useState({
    cardNumber: card?.cardNumber,
    expireDate: card?.expireDate,
    cvc: card?.cvc,
  });

  const model = Schema.Model({
    cardNumber: Schema.Types.StringType().isRequired(t('required')),
    expireDate: Schema.Types.StringType().isRequired(t('required')),
    cvc: Schema.Types.StringType().isRequired(t('required')),
  });

  const fillDemoPaymentDemo = () => {
    setFormValue({ cardNumber: CARD_NUMBER_DEMO, expireDate: EXPIREDATE_DEMO, cvc: CVC_DEMO });
  };

  useEffect(() => {
    setFormValue({ cardNumber: card?.cardNumber, expireDate: card?.expireDate, cvc: card?.cvc });
  }, [card]);

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
                    <Control
                      accepter={MaskedInput}
                      mask={[
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      placeholder={t('Card_Number')}
                      placeholderChar="_"
                      guide={true}
                      keepCharPositions={true}
                      name="cardNumber"
                      block="true"
                    />
                  </Group>
                </Col>
                <Col xs={14} className="mb-6">
                  <Group controlId="cardNumber">
                    <Control
                      accepter={MaskedInput}
                      mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                      placeholder={t('Expire_Date_(MM/YY)')}
                      name="expireDate"
                      block="true"
                    />
                  </Group>
                </Col>
                <Col xs={10}>
                  <Group controlId="cardNumber">
                    <Control accepter={MaskedInput} mask={[/\d/, /\d/, /\d/]} placeholder="CVC" name="cvc" block="true" />
                  </Group>
                </Col>
              </Row>
            </Grid>
            <Button appearance="link" onClick={fillDemoPaymentDemo}>
              {t('Fill_Demo_Payment_Info')}
            </Button>
            <FlexboxGrid justify="end">
              <FlexboxGrid.Item>
                <ButtonToolbar>
                  <Button
                    onClick={() => {
                      if (
                        formValue.cvc !== CVC_DEMO ||
                        formValue.cardNumber !== CARD_NUMBER_DEMO ||
                        formValue.expireDate !== EXPIREDATE_DEMO
                      ) {
                        toaster.push(
                          <Message type="error" closable showIcon>
                            {t('Invalid_Payment')}
                          </Message>,
                        );
                        return;
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

export default withSubmit(CreditCard);
