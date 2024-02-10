import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer } from 'rsuite';
import { MdFilterList } from 'react-icons/md';
import { TbArrowsSort } from 'react-icons/tb';
import { sortMenu } from '../../costansts/index';
import { setSearchTherapistSideBarOpen, setDoctorSearchLoading, setDoctorSearchParams } from '../../features/shared/sharedSlice';
import FilterForm from './FilterForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../../features/shared/sharedActions';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

function SearchTherapistSideBar() {
  const [open, setOpen] = useState(false);
  const { searchTherapistSideBarOpen, doctorSearchParams } = useSelector((state) => state?.shared);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handelSortChange = async (id) => {
    setOpen(false);
    const sortion = sortMenu?.find((el) => el?.id === id);
    const newParams = { ...doctorSearchParams, sortBy: sortion?.sortBy, sort: sortion?.sort };
    dispatch(setDoctorSearchParams(newParams));
    dispatch(setDoctorSearchLoading(true));
    await dispatch(getAllDoctors({ ...newParams, page: 1 }));
    dispatch(setDoctorSearchLoading(false));
  };
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && (open || searchTherapistSideBarOpen)) {
        dispatch(setSearchTherapistSideBarOpen(false));
        setOpen(false);
      }
    });
    return () => window.removeEventListener('resize', () => {});
  }, []);

  return (
    <>
      <Button
        onClick={() => dispatch(setSearchTherapistSideBarOpen(true))}
        appearance="ghost"
        className="grow py-0 flex items-center gap-2"
      >
        <MdFilterList /> <span>{t('Filter')}</span>
      </Button>
      <Button onClick={() => setOpen(true)} appearance="ghost" className="grow py-0 flex items-center gap-2">
        <TbArrowsSort /> <span>{t('Sorting')}</span>
      </Button>
      <Drawer
        open={searchTherapistSideBarOpen}
        size="full"
        backdrop="static"
        onClose={() => dispatch(setSearchTherapistSideBarOpen(false))}
      >
        <Drawer.Header>
          <Drawer.Title className="text-2xl text-center text-gray">{t('Filter')}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="px-[30px]">
          <FilterForm />
        </Drawer.Body>
      </Drawer>
      <Drawer open={open} size="xs" placement="bottom" onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title className="text-2xl text-center text-gray">{t('Filter')}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="px-[0px] pb-3 pt-0">
          <ul className="list-none px-0 text-center">
            {sortMenu?.map((el) => {
              return (
                <div key={Math.random()}>
                  <li
                    onClick={() => handelSortChange(el?.id)}
                    className={clsx(
                      'px-3 py-2 cursor-pointer hover:bg-[var(--rs-gray-100)] active:bg-gray/10',
                      el?.sortBy === doctorSearchParams?.sortBy && el?.sort === doctorSearchParams?.sort
                        ? 'bg-[var(--rs-gray-100)]'
                        : '',
                    )}
                  >
                    {t(el?.translationKey)}
                  </li>
                  <Divider className="my-0" />
                </div>
              );
            })}
            <li onClick={handelSortChange} className="text-red-700 py-2 cursor-pointer hover:bg-red-50 active:bg-red-100">
              {t('Rest')}
            </li>
          </ul>
        </Drawer.Body>
      </Drawer>
    </>
  );
}

export default SearchTherapistSideBar;
