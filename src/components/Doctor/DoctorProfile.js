import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Panel, Placeholder } from 'rsuite';

function DoctorProfile() {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
      </Breadcrumb>
      <Panel className="bg-white">
        <Placeholder rows={50} />
      </Panel>
    </>
  );
}

export default DoctorProfile;
