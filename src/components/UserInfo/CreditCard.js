import React, { useRef, useState } from 'react';
import { Button, Modal, Schema, Form, Message, useToaster, Grid, Row, Col, MaskedInput, FlexboxGrid, ButtonToolbar } from 'rsuite';
import viza from '../../assets/images/visa_new.png';
import masterCard from '../../assets/images/master_card_new.svg';
import { useDispatch, useSelector } from 'react-redux';
import {createOrUpdatePayment} from '../../features/payment/paymentSlice'
import { useTranslation } from 'react-i18next';

const { Group, Control } = Form;

function CreditCard() {
    const { t } = useTranslation();
    const {card} = useSelector(state => state?.payment)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const formRef = useRef();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState({
        cardNumber: card?.cardNumber,
        expireDate: card?.expireDate,
        cvc: card?.cvc,
      });
    const onSubmit = async () => {
        if (!formRef.current.check()) return;
        try {
          setLoading(true);
          const res = await dispatch(
            createOrUpdatePayment({
              payment:{
                card:formValue
              }
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
        cardNumber: Schema.Types.StringType().isRequired(t('required')),
        expireDate: Schema.Types.StringType().isRequired(t('required')),
        cvc: Schema.Types.StringType().isRequired(t('required')),
      });
    return (
        <section className="mb-5">
        <div className="flex justify-between">
          <aside className="flex gap-1 items-center">
            <span>
              <img src={viza} alt="viza" />
              <img src={masterCard} alt="masterCard" />
            </span>
            <span>Credit Card</span>
          </aside>
          <aside>
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
                            placeholder="Card Number"
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
                            placeholder="Expire Date (MM/YY)"
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
                        <Button
                          disabled={loading}
                          style={{ marginBottom: '0px' }}
                          onClick={() => setOpen(false)}
                          appearance="subtle"
                        >
                          Cancel
                        </Button>
                      </ButtonToolbar>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </Form>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </aside>
        </div>
        <div className="bg-gray/10 text-center py-5 mt-5">You don t have any saved credit card details</div>
      </section>
    );
}

export default CreditCard;