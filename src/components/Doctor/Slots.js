import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Panel, Placeholder } from 'rsuite';

function Slots() {
  return (
    <main className="px-5 lg:px-10">
      <Breadcrumb>
        <Breadcrumb.Item as={Link} to="/doctor">
          Doctor
        </Breadcrumb.Item>
        <Breadcrumb.Item active as={Link} to="slots">
          Slots
        </Breadcrumb.Item>
      </Breadcrumb>
      <Panel className="bg-white">
        <Placeholder rows={50} />
      </Panel>
    </main>
  );
}

export default Slots;
