import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Modal, Popover, Table, Whisper } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { PREVIOUS, UPCOMING, sessionsStatusList } from '../../costansts';
import { getPrefix } from '../../features/shared/sharedActions';
import { useDispatch, useSelector } from 'react-redux';
import { genders } from '../../assets/constants';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import useSubmition from '../../hooks/useSubmit';
import { cancelSession, getSessions } from '../../features/user/userActions';
import CustomCell from '../Shared/CustomCell';
import personIcon from '../../assets/images/person.svg';

const { Column, HeaderCell } = Table;
function Sessions({ sessions, type }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { prefixesList } = useSelector((state) => state?.shared);
  
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const submit = useSubmition();
  const handelCancel = async (id) => {
    setLoading(true);
    await submit(cancelSession, { bookingId: id }, { showLoader: false });
    setLoading(false);
    handleClose();
    dispatch(getSessions());
  };

  useEffect(() => {
    dispatch(getPrefix());
  }, []);

  return (
    <Table bordered autoHeight data={sessions} className="mt-5 text-sm">
      <Column minWidth={80} flexGrow={1} align="center">
        <HeaderCell>{t('Date')}</HeaderCell>
        <CustomCell render={(row) => <span>{moment(row?.slot.from).format('Do MMMM YYYY')}</span>} />
      </Column>
      <Column minWidth={80} flexGrow={1} align="center">
        <HeaderCell>{t('From')}</HeaderCell>
        <CustomCell render={(row) => <span>{moment(row?.slot.from).format('h:mm A')}</span>} />
      </Column>
      <Column minWidth={80} flexGrow={1} align="center">
        <HeaderCell>{t('To')}</HeaderCell>
        <CustomCell render={(row) => <span>{moment(row?.slot.to).format('h:mm A')}</span>} />
      </Column>
      <Column minWidth={80} flexGrow={1} align="center">
        <HeaderCell>{t('Doctor')}</HeaderCell>
        <CustomCell
          render={(row) => {
            const prefix = prefixesList?.find((pref) => pref?.id === row?.slot?.doctor?.prefix);
            const gender = genders?.find((gen) => gen?.id === row?.slot?.doctor?.gender);
            return (
              <Whisper
                placement="top"
                speaker={
                  <Popover>
                    <div className="max-w-[100px]">
                      <img src={row?.slot?.doctor?.photo || personIcon} width="100%" height="75" className="rounded-md" />
                      <p>
                        <b>{t('Name')}:</b>{' '}
                        {i18n.resolvedLanguage === 'ar' ? row?.slot?.doctor?.fullArName : row?.slot?.doctor?.fullEnName}
                      </p>
                      <p>
                        <b>{t('Gender')}:</b> {i18n.resolvedLanguage === 'ar' ? gender?.ar_name : gender?.name}
                      </p>
                      <p>
                        <b>{t('Prefix')}:</b> {i18n.resolvedLanguage === 'ar' ? prefix?.ar_name : prefix?.name}
                      </p>
                    </div>
                  </Popover>
                }
              >
                <Link to={`/${i18n.resolvedLanguage}/thearpist-profile/${row?.slot?.doctor?._id}`}>
                  {row?.slot?.doctor?.fullArName}
                </Link>
              </Whisper>
            );
          }}
        />
      </Column>
      <Column flexGrow={1} align="center">
        <HeaderCell>{t('Status')}</HeaderCell>
        <CustomCell
          render={(row) => {
            if (type === PREVIOUS && row?.status === 1) {
              return t('Not_Spicified');
            }
            const session = sessionsStatusList?.find((el) => {
              return el?.id === row?.status;
            });
            return t(session?.translationKey);
          }}
        />
      </Column>
      {type === UPCOMING && (
        <Column flexGrow={1} align="center">
          <HeaderCell>...</HeaderCell>
          <CustomCell
            render={(row) => (
              row.status !== 0 ?
              <>
                <ButtonToolbar>
                  <Button onClick={handleOpen} appearance="link" color="red" className="p-0">
                    {t('Cancel')}
                  </Button>
                </ButtonToolbar>
                <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
                  <Modal.Body>
                    <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
                    {t('Are_you_sure_you_want_to_cancel_this_session')}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button loading={loading} onClick={() => handelCancel(row?._id)} appearance="primary">
                      {t('Yes')}
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                      {t('No')}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>  : null
            )}
          />
        </Column>
      )}
    </Table>
  );
}

export default Sessions;
