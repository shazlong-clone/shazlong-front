import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup } from 'rsuite';
import Sessions from './Sessions';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions } from '../../features/user/userActions';
import moment from 'moment';
import { PREVIOUS, UPCOMING } from '../../assets/constants';

function MyTherapy() {
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = React.useState(UPCOMING);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state?.user?.sessions?.data);

  const upComingSessions = useMemo(() => {
    return sessions?.filter((session) => moment(session?.slot?.from).isAfter(moment()) && session?.status !== 0);
  }, [sessions]);

  const previouseSessions = useMemo(() => {
    return sessions?.filter((session) => moment(session?.slot?.from).isBefore(moment()));
  }, [sessions]);
  const tabs = [
    {
      key: UPCOMING,
      label: t('Upcoming_Sessions'),
      content: <Sessions loading={loading} type={UPCOMING} sessions={upComingSessions} />,
    },
    {
      key: PREVIOUS,
      label: t('Previous_Sessions'),
      content: <Sessions loading={loading} type={PREVIOUS} sessions={previouseSessions} />,
    },
  ];
  useEffect(() => {
    setLoading(true);
    dispatch(getSessions()).finally(() => {
      setLoading(false);
    });
  }, []);
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
