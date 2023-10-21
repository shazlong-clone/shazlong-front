import React from 'react';
import { FlexboxGrid, Panel, Steps } from 'rsuite';
import EditModal from './components/EditModal';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Empty from '../../../../Shared/Shared';

function Certifications() {
  const { profile } = useSelector((state) => state?.doctor);

  return (
    <Panel
      className="bg-white mb-6"
      header={
        <FlexboxGrid justify="space-between" align="middle">
          <FlexboxGrid.Item>
            <h5 className="capitalize text-gray/80">Certifications</h5>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <EditModal />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      }
    >
      {!profile?.certifications?.length ? (
        <Empty />
      ) : (
        <div className="flex gap-2 flex-wrap" key={Math.random()}>
          <Steps vertical>
            {profile?.certifications?.map((el, i) => {
              return (
                <Steps.Item
                  key={i}
                  status="finish"
                  title={<div className="font-bold text-[14px]">{el?.title}</div>}
                  description={
                    <>
                      <div className="text-cyan">
                        {moment(el?.time?.at(0)).format('MMM YYYY')}-{moment(el?.time?.at(1)).format('MMM YYYY')}
                      </div>
                      <div className="text-[14px]">{el?.place}</div>
                    </>
                  }
                />
              );
            })}
          </Steps>
        </div>
      )}
    </Panel>
  );
}

export default Certifications;
