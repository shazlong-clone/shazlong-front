import React, { useState } from 'react';
import viza from '../../assets/images/visa_new.png';
import masterCard from '../../assets/images/master_card_new.svg';
import vodafone from '../../assets/images/Vodafone_icon.png';
import fawry from '../../assets/images/fawry.png';
import { Button, Col, Form, Grid, Modal, Row, Schema } from 'rsuite';
import { useTranslation } from 'react-i18next';
const { Group, Control } = Form;
function PaymentInfo() {
  const [cresitCardopen, setCreditCardOpen] = React.useState(false);
  const { t } = useTranslation();
  const model = Schema.Model({
    cardNumber: Schema.Types.StringType().isRequired(t('required')),
    expireDate: Schema.Types.StringType()
      .isRequired(t('required'))
      .maxLength(5, t('max_length_eror', { count: 5 })),
    cvc: Schema.Types.StringType()
      .isRequired(t('required'))
      .maxLength(3, t(3, t('max_length_eror', { count: 3 }))),
  });
  const [formValue, setFormValue] = useState({
    cardNumber: '',
    expireDate: '',
    cvc: '',
  });
  return (
    <article className="p-5 relative">
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
            <a className="cursor-pointer underline" onClick={() => setCreditCardOpen(true)}>
              Add New
            </a>
            <Modal
              dialogClassName="lg:w-[450px]"
              size="xs"
              backdrop="static"
              keyboard={false}
              open={cresitCardopen}
              onClose={() => setCreditCardOpen(false)}
            >
              <Modal.Header>
                <Modal.Title>Add Credit Card</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onChange={setFormValue} formValue={formValue} fluid model={model}>
                  <Grid fluid>
                    <Row gutter={5}>
                      <Col xs={24} className="mb-6 mt-3">
                        <Group controlId="cardNumber">
                          <Control placeholder="Card Number" name="cardNumber" block="true" />
                        </Group>
                      </Col>
                      <Col xs={14} className="mb-6">
                        <Group controlId="cardNumber">
                          <Control placeholder="Expire Date __/__" name="expireDate" block="true" />
                        </Group>
                      </Col>
                      <Col xs={10}>
                        <Group controlId="cardNumber">
                          <Control placeholder="CVC" name="cvc" block="true" />
                        </Group>
                      </Col>
                    </Row>
                  </Grid>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setCreditCardOpen(false)} appearance="primary">
                  Ok
                </Button>
                <Button onClick={() => setCreditCardOpen(false)} appearance="subtle">
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </aside>
        </div>
        <div className="bg-gray/10 text-center py-5 mt-5">You don t have any saved credit card details</div>
      </section>

      <section className="mb-5">
        <div className="flex justify-between">
          <aside className="flex items-center gap-1">
            <img className="w-[20px]" src={vodafone} alt="vodafone" />
            <span className="mt-1">Vodafone Cash</span>
          </aside>
          <aside>
            <a className="cursor-pointer underline">Add New</a>
          </aside>
        </div>
        <div className="bg-gray/10 text-center py-5 mt-5">You don t have any saved credit card details</div>
      </section>

      <section className="mb-5">
        <div className="flex justify-between">
          <aside className="flex gap-1">
            <img className="w-[80px]" src={fawry} alt="fawry" />
            <span>Fawry</span>
          </aside>
          <aside>
            <a className="cursor-pointer underline">Add New</a>
          </aside>
        </div>
        <div className="bg-gray/10 text-center py-5 mt-5">You don t have any saved credit card details</div>
      </section>
    </article>
  );
}

export default PaymentInfo;
