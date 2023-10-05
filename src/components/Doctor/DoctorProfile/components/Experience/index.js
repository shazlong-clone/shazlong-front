import React, { Fragment, useRef, useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { Button, Divider, FlexboxGrid, IconButton, Panel, Schema } from 'rsuite';
import EditModal from './components/EditModal';

function Experience() {
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
      {Array(3)
        .fill('')
        .map((el, i) => {
          return (
            <React.Fragment key={Math.random()}>
              {i == 0 ? '' : <Divider />}
              <div key={Math.random(el)} className="flex gap-4 w-full text-start mb-5 items-start">
                <section>
                  <img
                    className="w-[50px] h-[50px] object-cover"
                    src="https://media.licdn.com/dms/image/C4E0BAQFNW7qmTZtuBg/company-logo_200_200/0/1622535529266?e=1704326400&v=beta&t=LDOHH8DlgtNLJO8RpHt_gs-49f92eb5aQMGLCM6ZHso"
                  />
                </section>
                <section className="grow">
                  <h6 className="mb-2 flex justify-between items-center">
                    <span>this is Title</span>
                    <IconButton icon={<MdOutlineEdit />} className="rounded-full" />
                  </h6>
                  <p className="text-sm">this is Job description to know </p>
                  <a className="text-sm">Oct 2005 - Sep 2007</a>
                </section>
              </div>
            </React.Fragment>
          );
        })}
    </Panel>
  );
}

export default Experience;
