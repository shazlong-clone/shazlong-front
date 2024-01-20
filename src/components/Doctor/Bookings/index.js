import React from 'react';
import { Panel, Placeholder } from 'rsuite';

function Bookings() {
  return (
    <Panel className="bg-[var(--rs-bg-card)]">
      <Placeholder rows={3} active />
    </Panel>
  );
}

export default Bookings;
