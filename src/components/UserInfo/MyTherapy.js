import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup } from 'rsuite';

function MyTherapy() {
  const [activeKey, setActiveKey] = React.useState(1);
  const { t } = useTranslation();
  const tabs = [
    {
      key: 1,
      label: t('Upcoming_Sessions'),
      content: 'Upcoming',
    },
    {
      key: 2,
      label: t('Previous_Sessions'),
      content: 'Previous',
    },
  ];
  return (
    <>
      <div className="flex justify-center">
        <ButtonGroup>
          {tabs?.map((tab) => (
            <Button
              appearance={tab?.key === activeKey ? 'primary' : 'ghost'}
              key={tab?.key}
              active={tab?.key === activeKey}
              onClick={() => setActiveKey(tab?.key)}
            >
              {tab?.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {tabs?.find((tab) => tab?.key === activeKey)?.content}
    </>
  );
}

export default MyTherapy;
