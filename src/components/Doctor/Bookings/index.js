import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  Button,
  Checkbox,
  DateRangePicker,
  Dropdown,
  Form,
  IconButton,
  Message,
  Pagination,
  Panel,
  Popover,
  SelectPicker,
  Stack,
  Table,
  Whisper,
  toaster,
} from 'rsuite';
import useSubmition from '../../../hooks/useSubmit';
import { getDoctorBookings, updateDoctorBookings } from '../../../features/doctor/doctorActions';
import { useSelector } from 'react-redux';
import CustomCell from '../../Shared/CustomCell';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import personIcon from '../../../assets/images/person.svg';
import MoreIcon from '@rsuite/icons/legacy/More';
import { Link } from 'react-router-dom';
import { CANCELED, PATIENT_ATTEND, PATIENT_NOT_ATTEND, RESERVED, sessionsStatusList } from '../../../assets/constants';
import useMediaQuery from '../../../hooks/useMediaQuery';

const { Column, HeaderCell, Cell } = Table;

function Bookings() {
  const { t, i18n } = useTranslation();
  const submit = useSubmition();
  const { profile } = useSelector((state) => state?.doctor);
  const bookings = useSelector((state) => state?.doctor?.bookings?.data);
  const { total = 0, limit = 0, currentPage = 1 } = useSelector((state) => state?.doctor?.bookings) || {};
  const statusOptions = sessionsStatusList
    ?.filter((el) => [PATIENT_ATTEND, PATIENT_NOT_ATTEND, RESERVED].includes(el.id))
    .map(({ id, translationKey }) => ({ value: id, label: t(translationKey) }));
  const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys?.some((item) => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  );

  // eslint-disable-next-line no-unused-vars
  const ActionCell = ({ rowData, dataKey, ...props }) => {
    const renderMenu = ({ onClose, left, top, className }, ref) => {
      const handleSelect = async (status) => {
        onClose();
        if (!checkedKeys?.length && !rowData?._id) {
          return toaster.push(
            <Message closable showIcon type="error">
              {t('Please_Select_Booking')}
            </Message>,
            { duration: 2000 },
          );
        }
        const params = {
          bookingIds: dataKey === 'all' ? checkedKeys : [rowData._id],
          status: status,
        };
        await submit(updateDoctorBookings, params);
        await submit(getDoctorBookings, null, { showToast: false, showLoader: false });
        setCheckedKeys([]);
      };
      return (
        <Popover ref={ref} className={className} style={{ left, top }} full>
          <Dropdown.Menu onSelect={handleSelect}>
            <Dropdown.Item eventKey={PATIENT_ATTEND}>{t('Patent_Attend')}</Dropdown.Item>
            <Dropdown.Item eventKey={PATIENT_NOT_ATTEND}>{t('Patent_Not_Attend')}</Dropdown.Item>
          </Dropdown.Menu>
        </Popover>
      );
    };
    if (dataKey === 'all') {
      return (
        <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
          <IconButton appearance="subtle" icon={<MoreIcon />} />
        </Whisper>
      );
    }
    return (
      <Cell {...props} className="link-group">
        <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
          <IconButton appearance="subtle" icon={<MoreIcon />} />
        </Whisper>
      </Cell>
    );
  };

  const [checkedKeys, setCheckedKeys] = React.useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys?.length === bookings?.length && bookings?.length > 0) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (checkedKeys?.length > 0 && checkedKeys?.length < bookings?.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? bookings.map((item) => item._id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };
  const locale = i18n.resolvedLanguage;
  const [formValue, setFormValue] = useState({
    date: null,
    status: null,
  });
  const handelSubmit = async () => {
    await submit(
      getDoctorBookings,
      {
        ...formValue,
        date: formValue.date
          ? {
              gte: formValue.date[0],
              lte: formValue.date[1],
            }
          : undefined,
      },
      { showToast: true, showLoader: true },
    );
  };
  useEffect(() => {
    submit(getDoctorBookings, {}, { showToast: false, showLoader: false });
  }, []);

  const smallScreen = useMediaQuery('md')
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item as={Link} to={`/${locale}/doctor`}>
          {locale === 'ar' ? profile?.fullArName : profile?.fullEnName}{' '}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{t('Bookings')}</Breadcrumb.Item>
      </Breadcrumb>

      <Panel bordered className="bg-[var(--rs-bg-card)]">
        <Panel bordered className="mb-5 bg-[var(--rs-bg-card)]">
          <h3 className="text-xl font-bold">{t('Search')}</h3>
          <Form formValue={formValue} onChange={setFormValue} layout={smallScreen ? 'inline' : 'vertical'} fluid>
            <Form.Group block controlId="date-1">
              <Form.ControlLabel>{t('Date')}</Form.ControlLabel>
              <Form.Control editable={false} block placeholder={t('Date')} name="date" accepter={DateRangePicker} />
            </Form.Group>
            <Form.Group controlId="status-3">
              <Form.ControlLabel>{t('Status')} </Form.ControlLabel>
              <Form.Control
                block
                searchable={false}
                placeholder={t('Status')}
                name="status"
                accepter={SelectPicker}
                data={statusOptions}
              />
            </Form.Group>
            <Form.Group>
              <Stack spacing={6}>
                <Button onClick={handelSubmit} appearance="primary" block type="submit">
                  {t('Search')}
                </Button>
              </Stack>
            </Form.Group>
          </Form>
        </Panel>
        <Table bordered autoHeight data={bookings} className="mb-5 text-sm">
          <Column width={50} align="center">
            <HeaderCell style={{ padding: 0 }}>
              <div style={{ lineHeight: '40px' }}>
                <Checkbox inline checked={checked} indeterminate={indeterminate} onChange={handleCheckAll} />
              </div>
            </HeaderCell>
            <CheckCell dataKey="_id" checkedKeys={checkedKeys} onChange={handleCheck} />
          </Column>
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
            <HeaderCell>{t('Status')}</HeaderCell>
            <CustomCell
              render={(row) => {
                const session = sessionsStatusList?.find((el) => el.id === row?.status);
                return (
                  <span
                    className={
                      row.status === PATIENT_ATTEND
                        ? 'text-[var(--rs-green-500)]'
                        : row.status === PATIENT_NOT_ATTEND
                        ? 'text-[var(--rs-red-500)]'
                        : row.status === CANCELED
                        ? 'text-[var(--rs-yellow-500)]'
                        : ''
                    }
                  >
                    {t(session?.translationKey)}
                  </span>
                );
              }}
            />
          </Column>
          <Column minWidth={80} flexGrow={1} align="center">
            <HeaderCell>{t('Patient')}</HeaderCell>
            <CustomCell
              style={{ paddingTop: 0, paddingBottom: 0 }}
              render={(row) => (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    marginTop: 2,
                    overflow: 'hidden',
                    display: 'inline-block',
                  }}
                >
                  <img src={row?.reservedBy?.photo ?? personIcon} width="40" />
                </div>
              )}
            />
          </Column>
          <Column width={120}>
            <HeaderCell style={{ paddingTop: 1, paddingBottom: 0 }}>
              <ActionCell dataKey="all" />
            </HeaderCell>
            <ActionCell style={{ padding: 5 }} dataKey="id" />
          </Column>
        </Table>
        <Pagination          
          size='sm'
          layout={['total', '-', 'limit', '|', 'pager']}
          prev={true}
          next={true}
          first={true}
          last={true}
          total={total}
          boundaryLinks={true}
          limit={limit}
          limitOptions={[30, 60, 100, 500]}
          maxButtons={5}
          activePage={currentPage || 1}
          onChangePage={(page) => submit(getDoctorBookings, { page, size: limit }, { showToast: false, showLoader: false })}
          onChangeLimit={(limit) => submit(getDoctorBookings, { size: limit, page: 1 }, { showToast: false, showLoader: false })}
        />
      </Panel>
    </>
  );
}

export default Bookings;
