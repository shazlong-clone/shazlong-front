import React from 'react';
import { Col, FlexboxGrid, Panel } from 'rsuite';
import EditModal from './components/EditModal';

function Education() {
  const educationList = [
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
            <h5 className="capitalize text-gray/80">Education</h5>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <EditModal />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      }
    >
      <div className="flex gap-2 flex-wrap">
        {educationList?.map((el) => {
          return (
            <FlexboxGrid key={Math.random()} align="middle" className="mb-2 w-full">
              <FlexboxGrid.Item as={Col} className=" bg-cyan/90 h-[90%] rounded-lg w-[5px] p-0"></FlexboxGrid.Item>
              <FlexboxGrid.Item as={Col}>
                <p className="font-[500] mt-0">{el?.name}</p>
                <p className="text-sm">{el?.place}</p>
                <a className="text-sm">{el?.time}</a>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          );
        })}
      </div>
    </Panel>
  );
}

export default Education;
