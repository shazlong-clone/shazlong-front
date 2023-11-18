import React, { useState } from 'react';
import { Button, Divider, Drawer } from 'rsuite';
import { MdFilterList } from 'react-icons/md';
import { TbArrowsSort } from 'react-icons/tb';
import { sortMenu } from '../../costansts/index';
import { setSearchTherapistSideBarOpen } from '../../features/shared/sharedSlice';
import FilterForm from './FilterForm';
import { useDispatch, useSelector } from 'react-redux';
function SearchTherapistSideBar() {
  const [open, setOpen] = useState(false);
  const { searchTherapistSideBarOpen } = useSelector((state) => state?.shared);
  const dispatch = useDispatch();
  return (
    <>
      <Button
        onClick={() => dispatch(setSearchTherapistSideBarOpen(true))}
        appearance="ghost"
        className="grow py-0 flex items-center gap-2"
      >
        <MdFilterList /> <span>filter</span>
      </Button>
      <Button onClick={() => setOpen(true)} appearance="ghost" className="grow py-0 flex items-center gap-2">
        <TbArrowsSort /> <span>sort</span>
      </Button>
      <Drawer
        open={searchTherapistSideBarOpen}
        size="full"
        backdrop="static"
        onClose={() => dispatch(setSearchTherapistSideBarOpen(false))}
      >
        <Drawer.Header>
          <Drawer.Title className="text-2xl text-center text-gray">Filters</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="px-[30px]">
          <FilterForm />
        </Drawer.Body>
      </Drawer>
      <Drawer open={open} size="xs" placement="bottom" onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title className="text-2xl text-center text-gray">Filters</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="px-[0px] pb-3 pt-0">
          <ul className="list-none px-0 text-center">
            {sortMenu?.map((el) => {
              return (
                <div key={Math.random()}>
                  <li className="px-3 py-2 cursor-pointer hover:bg-gray/5 active:bg-gray/10">{el?.label}</li>
                  <Divider className="my-0" />
                </div>
              );
            })}
            <li className="text-red-700 py-2 cursor-pointer hover:bg-red-50 active:bg-red-100">Rest</li>
          </ul>
        </Drawer.Body>
      </Drawer>
    </>
  );
}

export default SearchTherapistSideBar;
