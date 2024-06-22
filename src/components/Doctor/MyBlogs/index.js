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
  Modal,
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
import { useSelector } from 'react-redux';
import CustomCell from '../../Shared/CustomCell';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import MoreIcon from '@rsuite/icons/legacy/More';
import { Link, useNavigate } from 'react-router-dom';
import { ACCEPTED, REJECTED, PENDING, blogStatusList } from '../../../assets/constants';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { getDoctorBlogs } from '../../../features/doctor/doctorActions';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import { deleteBlog } from '../../../features/blog/blogAction';

const { Column, HeaderCell, Cell } = Table;

function MyBlogs() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const submit = useSubmition();
  const { profile } = useSelector((state) => state?.doctor);
  const blogs = useSelector((state) => state?.doctor?.blogs?.data);
  const { total = 0, limit = 0, currentPage = 1 } = useSelector((state) => state?.doctor?.blogs) || {};
  const statusOptions = blogStatusList?.map(({ id, translationKey }) => ({ value: id, label: t(translationKey) }));
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

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // eslint-disable-next-line no-unused-vars
  const ActionCell = ({ rowData, dataKey, ...props }) => {
    const renderMenu = ({ left, top, className }, ref) => {
      return (
        <Popover ref={ref} className={className} style={{ left, top }} full>
          <Dropdown.Menu>
            {dataKey === 'all' ? (
              ''
            ) : (
              <Dropdown.Item onClick={() => navigate('/' + locale + '/doctor/blog?id=' + rowData?._id)}>
                {t('Edit')}
              </Dropdown.Item>
            )}
            <Dropdown.Item
              onClick={() => {
                if (!checkedKeys?.length) {
                  return toaster.push(
                    <Message showIcon type="warning" closable>
                      {t('Please_Select_Blog')}
                    </Message>,
                  );
                } else {
                  handleOpen();
                }
                if (rowData?._id) {
                  setCheckedKeys([rowData?._id]);
                }
              }}
              eventKey={2}
              className="hover:bg-[var(--rs-red-50)] [&>span]:text-[var(--rs-red-700)]"
            >
              {t('Remove')}
            </Dropdown.Item>
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

  if (checkedKeys?.length === blogs?.length && blogs?.length > 0) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (checkedKeys?.length > 0 && checkedKeys?.length < blogs?.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? blogs.map((item) => item._id) : [];
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
      getDoctorBlogs,
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

  const handelDelete = async () => {
    const res = await submit(deleteBlog, { ids: checkedKeys?.join(',') }, { showLoader: true, showToast: true });
    if (res?.payload?.status) {
      submit(getDoctorBlogs, {}, { showToast: false, showLoader: false });
      setCheckedKeys([]);
      handleClose();
    }
  };
  useEffect(() => {
    setLoading(true);
    submit(getDoctorBlogs, {}, { showToast: false, showLoader: false })
      .catch((err) => {
        setErr('internal_server_error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const smallScreen = useMediaQuery('md');
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item as={Link} to={`/${locale}/doctor`}>
          {locale === 'ar' ? profile?.fullArName : profile?.fullEnName}{' '}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{t('MyBlogs')}</Breadcrumb.Item>
      </Breadcrumb>
      <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
        <Modal.Body>
          <div className="text-center">
            <b>{blogs?.find((el) => el?._id === checkedKeys)?.title}</b>
          </div>
          <br />
          <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
          {t('Are_you_Sure_Delete')}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handelDelete} appearance="primary" color="red">
            {t('Confirm')}
          </Button>
          <Button
            onClick={() => {
              handleClose();
            }}
            appearance="subtle"
          >
            {t('Cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
      <Panel bordered className="bg-[var(--rs-bg-card)]">
        <Panel bordered className="mb-5 bg-[var(--rs-bg-card)]">
          <h3 className="text-xl font-bold">{t('Search')}</h3>
          <Form formValue={formValue} onChange={setFormValue} layout={smallScreen ? 'inline' : 'vertical'} fluid>
            <Form.Group block controlId="date-1">
              <Form.ControlLabel>{t('Date')}</Form.ControlLabel>
              <Form.Control editable={false} block placeholder={t('Date')} name="date" accepter={DateRangePicker} />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.ControlLabel>{t('Status')} </Form.ControlLabel>
              <Form.Control
                block
                style={{ minWidth: '120px' }}
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
        <Table loading={loading} bordered autoHeight data={blogs ?? []} className="mb-5 text-sm">
          <Column width={50} align="center">
            <HeaderCell style={{ padding: 0 }}>
              <div style={{ lineHeight: '40px' }}>
                <Checkbox inline checked={checked} indeterminate={indeterminate} onChange={handleCheckAll} />
              </div>
            </HeaderCell>
            <CheckCell dataKey="_id" checkedKeys={checkedKeys} onChange={handleCheck} />
          </Column>
          <Column minWidth={30}>
            <HeaderCell>{t('Date')}</HeaderCell>
            <CustomCell render={(row) => <span>{moment(row?.createdAr).format('Do MMMM YYYY')}</span>} />
          </Column>
          <Column fullText minWidth={80} flexGrow={1}>
            <HeaderCell>{t('Title')}</HeaderCell>
            <CustomCell render={(row) => row?.title} />
          </Column>
          <Column minWidth={30}>
            <HeaderCell>{t('Status')}</HeaderCell>
            <CustomCell
              render={(row) => {
                const session = blogStatusList?.find((el) => el.id === row?.status);
                return (
                  <span
                    className={
                      row.status === ACCEPTED
                        ? 'text-[var(--rs-green-500)]'
                        : row.status === REJECTED
                        ? 'text-[var(--rs-red-500)]'
                        : row.status === PENDING
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
          <Column width={120}>
            <HeaderCell style={{ paddingTop: 1, paddingBottom: 0 }}>
              <ActionCell dataKey="all" />
            </HeaderCell>
            <ActionCell style={{ padding: 5 }} dataKey="id" />
          </Column>
        </Table>
        <Pagination
          size="sm"
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
          onChangePage={(page) => submit(getDoctorBlogs, { page, size: limit }, { showToast: false, showLoader: false })}
          onChangeLimit={(limit) => submit(getDoctorBlogs, { size: limit, page: 1 }, { showToast: false, showLoader: false })}
        />
      </Panel>
    </>
  );
}

export default MyBlogs;
