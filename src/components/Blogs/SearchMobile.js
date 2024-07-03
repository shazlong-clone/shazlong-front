import React, { useEffect, useRef } from 'react';
import InternalHeader from '../Shared/InternalHeader';
import { Animation, Button, IconButton, Input, InputGroup } from 'rsuite';
import AlignJustifyIcon from '@rsuite/icons/legacy/AlignJustify';
import CloseIcon from '@rsuite/icons/Close';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import clsx from 'clsx';
import SearchIcon from '@rsuite/icons/Search';
import withBlog from '../../hooks/withblog';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialization } from '../../features/shared/sharedActions';
import { useTranslation } from 'react-i18next';

function SearchMobile(props) {
  const { params, setParams, getSearchedBlogs } = props;

  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const inputRef = useRef();
  const {
    t,
    i18n: { resolvedLanguage: locale },
  } = useTranslation();
  const specializationList = useSelector((state) => state?.shared?.specializationList) ?? [];
  const dispatch = useDispatch();

  const onChange = () => setShow(!show);
  const Drop = React.forwardRef((props, ref) => (
    <div {...props} ref={ref}>
      <div className="text-gray bg-[#EFF8FC]">
        <ul className="list-none  font-[600] [&>li]:py-2 text-sm ">
          {specializationList?.map((spec) => {
            return (
              <li
                onClick={() => {
                  let p = params?.category;
                  if (params?.category?.includes(spec?.id)) {
                    p = { ...params, category: params?.category?.filter((categoryId) => categoryId !== spec?.id) };
                    setParams(p);
                  } else {
                    p = { ...params, category: [...params.category, spec?.id] };
                    setParams(p);
                  }
                  getSearchedBlogs(p);
                }}
                className={clsx(
                  'cursor-pointer my-2 px-2',
                  params?.category?.includes(spec?.id) && 'bg-[var(--rs-gray-500)] text-[var(--rs-gray-50)] ',
                )}
                key={Math.random()}
              >
                {locale === 'ar' ? spec?.ar_name : spec?.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  ));

  useEffect(() => {
    dispatch(getSpecialization());
  }, []);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);
  return (
    <>
      <div className="container">
        <InternalHeader
          className="py-2"
          icon={
            <Button className="flex items-center text-xl font-bold text-gray p-4 bg-transparent" block onClick={onChange}>
              {
                <>
                  <AlignJustifyIcon className={clsx('absolute', !show ? 'animate-scallup' : 'animate-scalldown')} />
                  <CloseIcon className={clsx('absolute', show ? 'animate-scallup' : 'animate-scalldown')} />
                </>
              }
            </Button>
          }
        >
          {t('Blogs')}
        </InternalHeader>
      </div>

      <div className="font-bold">
        <Animation.Collapse in={show}>
          {(props, ref) => (
            <main {...props} ref={ref}>
              <div className="text-gray bg-[#EFF8FC] px-4 py-5">
                <section className="flex items-center justify-between gap-2 mb-5 text-3xl">
                  <InputGroup>
                    <Input
                      onChange={(value) => setParams({ ...params, name: value })}
                      value={params?.name}
                      placeholder={t('Search')}
                      size="lg"
                      onKeyDown={(event) => {
                        // If the user presses the "Enter" key on the keyboard
                        if (event.key === 'Enter') {
                          // Cancel the default action, if needed
                          event.preventDefault();
                          // Trigger the button element with a click
                          getSearchedBlogs(params);
                        }
                      }}
                    />
                    <InputGroup.Button onClick={() => getSearchedBlogs(params)}>
                      <SearchIcon />
                    </InputGroup.Button>
                  </InputGroup>
                </section>
                <section onClick={() => setOpen(!open)} className="flex justify-between cursor-pointer mb-5">
                  <span>{t('Category')}</span>
                  <span>
                    <ArrowDownLineIcon className={clsx(open ? 'animate-rclock' : 'animate-raclock')} />
                  </span>
                </section>
                <Animation.Collapse in={open}>{(props, ref) => <Drop {...props} ref={ref} />}</Animation.Collapse>
              </div>
            </main>
          )}
        </Animation.Collapse>
      </div>
    </>
  );
}

export default withBlog(SearchMobile);
