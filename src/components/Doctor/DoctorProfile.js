import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Panel, Placeholder } from 'rsuite';

function DoctorProfile() {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item as={Link} to="/doctor">
          Doctor
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <Panel className="bg-white">
        <Placeholder rows={50} />
      </Panel>
    </>
  );
}

export default DoctorProfile;
