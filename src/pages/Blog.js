import React from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import { Animation, Button } from 'rsuite';
import AlignJustifyIcon from '@rsuite/icons/legacy/AlignJustify';
import CloseIcon from '@rsuite/icons/Close';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import clsx from 'clsx';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

function Blog() {
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  const onChange = () => setShow(!show);
  const searckList = ['Neuroscience(1)', 'Brain Science(2)', 'Psychotherapy(3)', 'COVID-19(6)', 'General Topics(9)'];
  const Drop = React.forwardRef((props, ref) => (
    <div {...props} ref={ref}>
      <div className="text-gray bg-[#EFF8FC]">
        <ul className="list-none  font-[600] [&>li]:py-2 text-sm ">
          {searckList?.map((el) => {
            return (
              <li className="cursor-pointer" key={Math.random()}>
                {el}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  ));
  return (
    <main className="bg-gray/5 py-5">
      <input
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search.."
        className="all-unset placeholder-gray placeholder-opacity-50 grow"
      />
      <div className="container">
        <InternalHeader>Blogs</InternalHeader>
      </div>
      <Button className="rounded-none flex items-center text-xl font-bold text-gray py-4" block onClick={onChange}>
        {
          <>
            <AlignJustifyIcon className={clsx('absolute', !show ? 'animate-scallup' : 'animate-scalldown')} />
            <CloseIcon className={clsx('absolute', show ? 'animate-scallup' : 'animate-scalldown')} />
          </>
        }
      </Button>
      <div className="font-bold">
        <Animation.Collapse in={show}>
          {(props, ref) => (
            <main {...props} ref={ref}>
              <div className="text-gray bg-[#EFF8FC] px-4 py-5">
                <section onClick={() => setOpen(!open)} className="flex justify-between cursor-pointer mb-5">
                  <span>Seciality </span>
                  <span>
                    <ArrowDownLineIcon className={clsx(open ? 'animate-rclock' : 'animate-raclock')} />
                  </span>
                </section>
                <Animation.Collapse in={open}>{(props, ref) => <Drop {...props} ref={ref} />}</Animation.Collapse>
                <section className="flex items-center justify-between text-xl gap-2">
                  <InputGroup>
                    <Input placeholder="Search" />
                    <InputGroup.Button>
                      <SearchIcon />
                    </InputGroup.Button>
                  </InputGroup>
                </section>
              </div>
            </main>
          )}
        </Animation.Collapse>
      </div>
    </main>
  );
}

export default Blog;
