import React, { useEffect } from 'react';
import { Input, InputGroup, InputPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import SearchTherapistSideBar from '../Therapists/SearchTherapistSideBar';
import TherapistsCard, { pageSize } from '../Therapists/TherapistsCard';
import FilterForm from '../Therapists/FilterForm';
import { sortMenu } from '../../assets/constants';
import { setDoctorSearchLoading, setDoctorSearchParams } from '../../features/shared/sharedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../../features/shared/sharedActions';
import { useTranslation } from 'react-i18next';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { RemoveNullKeys } from '../../utils/fn';

function TherapistsComp() {
  const { t } = useTranslation();
  const { doctorSearchParams } = useSelector((state) => state?.shared);
  const dispatch = useDispatch();
  const handelSortChange = async (id) => {
    const sortion = sortMenu?.find((el) => el?.id === id);
    const newParams = { ...doctorSearchParams, sortBy: sortion?.sortBy, sort: sortion?.sort };
    navigate({
      search: `?${createSearchParams(RemoveNullKeys(newParams))}`,
    });
    dispatch(setDoctorSearchParams(newParams));
    dispatch(setDoctorSearchLoading(true));
    await dispatch(getAllDoctors({ ...newParams, page: 1 }));
    dispatch(setDoctorSearchLoading(false));
  };
  const [searchParams] = useSearchParams();

  const [name, setName] = React.useState(searchParams.get('name') || '');
  const navigate = useNavigate();
  const onPressEnter = async () => {
    const params = { ...doctorSearchParams, name };
    dispatch(setDoctorSearchLoading(true));
    navigate({
      search: `?${createSearchParams(RemoveNullKeys(params))}`,
    });
    await dispatch(getAllDoctors({ ...params, page: 1, size: pageSize }));
    dispatch(setDoctorSearchParams({ ...params, page: 1, size: pageSize }));

    dispatch(setDoctorSearchLoading(false));
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <>
      <section className="mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1px_1.5fr]">
          <section>
            <InputGroup size="lg" inside className="mb-10">
              <Input
                onChange={(v) => {
                  setName(v);
                }}
                placeholder={t('Search_By_Therapist_Name')}
                onPressEnter={onPressEnter}
                defaultValue={name}
              />
              <InputGroup.Button onClick={onPressEnter}>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </section>
          <section />
          <section className="hidden lg:block">
            <InputPicker
              placeholder={t('Sorting')}
              onChange={handelSortChange}
              block
              size="lg"
              data={[...sortMenu, { label: 'Rest', translationKey: 'Reset', value: '' }]?.map((el) => {
                return { label: t(el?.translationKey), value: el?.id };
              })}
              renderMenuItem={(label, item) => {
                return <div className={!item?.value ? 'text-red-500' : ''}>{label}</div>;
              }}
              value={
                sortMenu?.find((el) => el.sortBy === searchParams.get('sortBy') && el?.sort === searchParams.get('sort'))?.id ||
                null
              }
            />
          </section>
        </div>
      </section>
      <section className="flex justify-between gap-3 lg:hidden">
        <SearchTherapistSideBar />
      </section>
      <section className="lg:grid lg:grid-cols-[1fr_2.5fr] lg:gap-10">
        <article className="hidden lg:block">
          <FilterForm />
        </article>
        <article>
          <TherapistsCard />
        </article>
      </section>
    </>
  );
}

export default TherapistsComp;
