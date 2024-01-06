import React, { useState } from 'react';
import { Button, Divider, FlexboxGrid, IconButton, Message, Panel, Popover, Stack, Whisper, useToaster } from 'rsuite';
import EditModal from './components/EditModal';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { RiDeleteBinLine } from 'react-icons/ri';
import { AiFillWarning } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { deleteExperienceById, getMeAsDoctor } from '../../../../../features/doctor/doctorActions';
import Empty from '../../../../Shared/Empty';

function Experience() {
  const { profile } = useSelector((state) => state?.doctor);
  const toaster = useToaster();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const hamdelDeleteExperience = async (id) => {
    try {
      setLoading(true);
      const res = await dispatch(deleteExperienceById(id));
      if (res.payload.status) {
        toaster.push(
          <Message type="success" closable showIcon>
            {t('Updated_Succefuly')}
          </Message>,
          { duration: 2000 },
        );
        dispatch(getMeAsDoctor());
      } else {
        toaster.push(
          <Message type="error" closable showIcon>
            {res.payload.message}
          </Message>,
          { duration: 2000 },
        );
      }
    } catch (err) {
      toaster.push(
        <Message closable showIcon type="error">
          {t('internal_server_error')}
        </Message>,
        {
          duration: 5000,
        },
      );
    } finally {
      setLoading(false);
    }
  };
  const DefaultPopover = React.forwardRef(({ id, ...props }, ref) => {
    return (
      <Popover
        ref={ref}
        title={
          <div className="flex items-center">
            <AiFillWarning className="text-yellow-500 text-2xl" /> warn
          </div>
        }
        {...props}
      >
        Are you sure to delete this task?
        <br />
        <div className="flex justify-end">
          <Button
            loading={loading}
            size="sm"
            onClick={() => hamdelDeleteExperience(id)}
            className="mt-3"
            color="red"
            appearance="primary"
          >
            Delete
          </Button>
        </div>
      </Popover>
    );
  });

  const CustomComponent = ({ id }) => (
    <Whisper trigger="click" placement="topEnd" controlId="control-id-center" speaker={<DefaultPopover id={id} />}>
      <IconButton icon={<RiDeleteBinLine />} className="rounded-full" />
    </Whisper>
  );
  return (
    <Panel
      className="bg-[var(--rs-bg-card)] mb-6"
      header={
        <FlexboxGrid justify="space-between" align="middle">
          <FlexboxGrid.Item>
            <h5 className="capitalize text-gray/80">Experience</h5>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <EditModal />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      }
    >
      {!profile?.experiences?.length ? (
        <Empty />
      ) : (
        profile?.experiences.map((el, i) => {
          return (
            <React.Fragment key={Math.random()}>
              {i == 0 ? '' : <Divider />}
              <div key={Math.random()} className="flex gap-4 w-full text-start mb-5 items-start">
                <section>
                  <img className="w-[50px] h-[50px] object-cover" src={`data:image/jpeg;base64,${el?.company_logo}`} />
                </section>
                <section className="grow">
                  <h6 className="mb-2 flex justify-between items-center">
                    <span>{el?.title}</span>
                    <Stack spacing={6}>
                      <EditModal experience={el} />
                      <CustomComponent id={el?._id} />
                    </Stack>
                  </h6>
                  <p className="text-sm">{el?.description}</p>
                  <a className="text-sm">
                    {moment(el?.time?.at(0)).format('MMM YYYY')}-{moment(el?.time?.at(1)).format('MMM YYYY')}
                  </a>
                </section>
              </div>
            </React.Fragment>
          );
        })
      )}
    </Panel>
  );
}

export default Experience;
