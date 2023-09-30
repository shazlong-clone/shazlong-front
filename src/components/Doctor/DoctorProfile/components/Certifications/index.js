import React from 'react';
import { FlexboxGrid, Panel, Steps } from 'rsuite';
import EditModal from './components/EditModal';

function Certifications() {
  const certificationDemo = [
    {
      name: 'Schema Therapy Diploma',
      place: 'Institute for Schema Therapy of Switzerland',
      time: 'Jun 2022 - Jun 2022',
    },
    {
      name: 'Art in medicine fellowship Program',
      place: 'Arts in Medicine Fellowship',
      time: 'Feb 2022 - May 2022',
    },
    {
      name: 'Training in Psychosexual Therapy Program',
      place: 'The Arab Center for Consultations and Research',
      time: 'Mar 2020 - Mar 2020',
    },
    {
      name: 'Studied Masters in Neurology and Psychiatry',
      place: 'Faculty of Medicine, Cairo University',
      time: 'Oct 2005 - Sep 2007',
    },
  ];

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
      <div className="flex gap-2 flex-wrap" key={Math.random()}>
        <Steps vertical>
          {certificationDemo?.map((el, i) => {
            return (
              <Steps.Item
                key={i}
                status="finish"
                title={<div className="font-bold text-[14px]">{el?.name}</div>}
                description={
                  <>
                    <div className="text-cyan">{el?.time}</div>
                    <div className="text-[14px]">{el?.place}</div>
                  </>
                }
              />
            );
          })}
        </Steps>
      </div>
    </Panel>
  );
}

export default Certifications;
