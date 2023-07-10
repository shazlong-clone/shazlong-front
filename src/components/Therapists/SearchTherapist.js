import React, { useState } from 'react';
import { Button, Divider, Drawer } from 'rsuite';
import { MdFilterList } from 'react-icons/md';
import { TbArrowsSort } from 'react-icons/tb';
import {filterMenu} from '../../costansts/index'
import FilterForm from './FilterForm';
function SearchTherapist(props) {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        appearance='ghost'
        className='grow py-0 flex items-center gap-2'
      >
        <MdFilterList /> <span>filter</span>
      </Button>
      <Button
        onClick={() => setFilterOpen(true)}
        appearance='ghost'
        className='grow py-0 flex items-center gap-2'
      >
        <TbArrowsSort /> <span>sort</span>
      </Button>
      <Drawer
        open={open}
        size='full'
        backdrop='static'
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title className='text-2xl text-center text-gray'>
            Filters
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className='px-[30px]'>
          <FilterForm />
        </Drawer.Body>
      </Drawer>
      <Drawer
        open={filterOpen}
        size='xs'
        placement='bottom'
        onClose={() => setFilterOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title className='text-2xl text-center text-gray'>
            Filters
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className='px-[0px] py-3'>
          <ul className='list-none pl-0 text-center'>
            {filterMenu?.map((el) => {
              return (
                <div key={Math.random()}>
                  <li className='px-3'>
                    {el?.label}
                  </li>
                  <Divider className='my-3' />
                </div>
              );
            })}
            <li className='text-red-700'>Rest</li>
          </ul>
        </Drawer.Body>
      </Drawer>
    </>
  );
}

export default SearchTherapist;
