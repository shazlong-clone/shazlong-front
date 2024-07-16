import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonToolbar, Schema, Form, Button, Input, InputGroup } from 'rsuite';
const { Group, HelpText, Control, ControlLabel } = Form;

function BlogFooter() {
  const { t } = useTranslation();

  const model = Schema.Model({
    message: Schema.Types.StringType().isRequired('This field is required.'),
  });
  const [formValue, setFormValue] = useState({
    message: '',
  });
  const onSubmit = (isValid) => {
    if (!isValid) return;
  };
  const Textarea = React.forwardRef((props, ref) => <Input style={{ wudth: '100%' }} {...props} as="textarea" ref={ref} />);

  return (
    <>
      <section className="mt-10 xl:flex xl:justify-between xl:items-start">
        <article className="mb-5">
          <Form fluid onChange={setFormValue} formValue={formValue} model={model}>
            <Group controlId="message">
              <ControlLabel>{t('Leave_Comment')}</ControlLabel>
              <Control className="xl:min-w-[500px]" placeholder={t('Comment')} rows={5} name="message" accepter={Textarea} />
            </Group>
            <Group>
              <ButtonToolbar>
                <Button onClick={onSubmit} appearance="primary">
                  {t('Add')}
                </Button>
              </ButtonToolbar>
            </Group>
          </Form>
        </article>
        <article
          className="rounded-xl px-5 py-10 text-gray/50 w-full xl:w-[500px] xl:h-[200px] mt-[22px]"
          // eslint-disable-next-line quotes
          style={{ backgroundImage: "url('/img/news-letter-bg.png')", backgroundSize: 'cover' }}
        >
          <strong className="mb-3 block">{t('subscribe_to_our_newsletter')}</strong>
          <InputGroup>
            <Input placeholder={t('Email')} />
            <InputGroup.Button className="font-[500]" appearance="primary">
              {t('Subscribe')}
            </InputGroup.Button>
          </InputGroup>
        </article>
      </section>
    </>
  );
}

export default BlogFooter;
