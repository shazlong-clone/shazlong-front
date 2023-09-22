import React from 'react';
import { Avatar, Drawer, IconButton, Nav, Panel, Placeholder, Sidenav } from 'rsuite';
import MenuIcon from '@rsuite/icons/Menu';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import useMediaQuery  from '../utils/useMediaQuery';
import clsx from 'clsx';
function Doctor() {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const lg = useMediaQuery('lg')
  const handleOpen = (key) => {
    setOpen(true);
    setPlacement(key);
  };
  const [activeKey, setActiveKey] = React.useState('1');
  const [expanded, setExpanded] = React.useState(true);
  return (
    <>
    <div className='flex min-h-screen'>
    <main className='hidden lg:block fixed' style={{width:250}}>
    <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']} className='min-h-screen'>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              User Group
            </Nav.Item>
            <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Settings"
              icon={<GearCircleIcon />}
            >
              <Nav.Item eventKey="4-1">Applications</Nav.Item>
              <Nav.Item eventKey="4-2">Channels</Nav.Item>
              <Nav.Item eventKey="4-3">Versions</Nav.Item>
              <Nav.Menu eventKey="4-5" title="Custom Action">
                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
              </Nav.Menu>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
      </Sidenav>

    </main>
    <main className={clsx('bg-gray/10 grow transition-[0.3s]', expanded ? 'lg:ps-[270px]' :'lg:ps-[76px]' )} >
      <div>
        <article className='max-lg:bg-white max-lg:shadow-xl'>
          <section className="flex px-5 items-center justify-between py-2 lg:pt-5 lg:px-10">

            <article className=''>
              <IconButton className='lg:hidden' onClick={() => handleOpen('left')} icon={<MenuIcon />} />
              <h4 className='hidden lg:block'>Doctor DashBoard</h4>
            </article>
            <article className=''>
              <div className="flex items-center gap-2">
                <a>English</a>
                <article>
                  <Avatar circle src="https://avatars.githubusercontent.com/u/8225666" alt="@SevenOutman" />
                </article>
              </div>
            </article>

          </section>
        </article>
        <div className='px-5 py-5 lg:px-10'>
          <Panel header="Panel title" className='bg-white'>
              <Placeholder.Paragraph />
          </Panel>
        </div>
      </div>
        {
          lg ? '' : <Drawer size="xs" placement={placement} open={open} onClose={() => setOpen(false)}>
          <Drawer.Header>
            <Drawer.Title>Shazlong Doctors</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="px-0 pt-0">
            <Sidenav defaultOpenKeys={['3', '4']}>
              <Sidenav.Body>
                <Nav activeKey="1">
                  <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                    Dashboard
                  </Nav.Item>
                  <Nav.Item eventKey="2" icon={<GroupIcon />}>
                    User Group
                  </Nav.Item>
                  <Nav.Menu eventKey="3" title="Advanced" icon={<MagicIcon />}>
                    <Nav.Item eventKey="3-1">Geo</Nav.Item>
                    <Nav.Item eventKey="3-2">Devices</Nav.Item>
                    <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
                    <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
                    <Nav.Item eventKey="4-1">Applications</Nav.Item>
                    <Nav.Item eventKey="4-2">Channels</Nav.Item>
                    <Nav.Item eventKey="4-3">Versions</Nav.Item>
                    <Nav.Menu eventKey="4-5" title="Custom Action">
                      <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                      <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
                    </Nav.Menu>
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Drawer.Body>
        </Drawer>
        }
    </main>

    </div>
    </>
  );
}

export default Doctor;
