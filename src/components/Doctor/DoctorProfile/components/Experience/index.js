import React, { Fragment, useRef, useState } from 'react';
import { Button, Divider, FlexboxGrid, IconButton, Panel, Schema } from 'rsuite';
import EditModal from './components/EditModal';
import { useSelector } from 'react-redux';
import moment from 'moment';

function Experience() {
  const { profile } = useSelector((state) => state?.doctor);
  return (
    <Panel
      className="bg-white mb-6"
      header={
        <FlexboxGrid justify="space-between" align="middle">
          <FlexboxGrid.Item>
            <h5 className="capitalize text-gray/80">Experience</h5>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <EditModal />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      }
    >
      {!profile?.experiences?.length
        ? 'no experience'
        : profile?.experiences.map((el, i) => {
            return (
              <React.Fragment key={Math.random()}>
                {i == 0 ? '' : <Divider />}
                <div key={Math.random()} className="flex gap-4 w-full text-start mb-5 items-start">
                  <section>
                    <img className="w-[50px] h-[50px] object-cover" src={`data:image/jpeg;base64,${el?.company_logo}`} />
                  </section>
                  <section className="grow">
                    <h6 className="mb-2 flex justify-between items-center">
                      <span>{el?.title}</span>
                      <EditModal experience={el} />
                    </h6>
                    <p className="text-sm">{el?.description}</p>
                    <a className="text-sm">
                      {moment(el?.time?.at(0)).format('MMM YYYY')}-{moment(el?.time?.at(1)).format('MMM YYYY')}
                    </a>
                  </section>
                </div>
              </React.Fragment>
            );
          })}
    </Panel>
  );
}

export default Experience;
