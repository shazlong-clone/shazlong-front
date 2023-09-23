import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Panel, Placeholder } from 'rsuite';

function Slots() {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item as={Link} to="/doctor">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active as={Link} to="/doctor">
          Slots
        </Breadcrumb.Item>
      </Breadcrumb>
      <Panel className="bg-white">
        <Placeholder rows={50} />
      </Panel>
    </>
  );
}

export default Slots;
