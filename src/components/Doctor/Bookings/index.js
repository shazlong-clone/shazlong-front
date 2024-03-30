import React, { useEffect } from 'react';
import { Checkbox, Panel, Table } from 'rsuite';
import useSubmition from '../../../hooks/useSubmit';
import { getDoctorBookings } from '../../../features/doctor/doctorActions';
import { useSelector } from 'react-redux';
import CustomCell from '../../Shared/CustomCell';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import personIcon from '../../../assets/images/person.svg';

const { Column, HeaderCell, Cell } = Table;

function Bookings() {
  const { t } = useTranslation();
  const submit = useSubmition();
  const bookings = useSelector((state) => state?.doctor?.bookings);
  const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item) => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  );

  const [checkedKeys, setCheckedKeys] = React.useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === bookings.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < bookings.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? bookings.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  useEffect(() => {
    submit(getDoctorBookings, {}, { showToast: false, showLoader: false });
  }, []);

  return (
    <Panel header={t('Bookings')} bordered className='mt-3'>
      <Table bordered autoHeight data={bookings} className="mt-5 text-sm">
        <Column width={50} align="center">
          <HeaderCell style={{ padding: 0 }}>
            <div style={{ lineHeight: '40px' }}>
              <Checkbox inline checked={checked} indeterminate={indeterminate} onChange={handleCheckAll} />
            </div>
          </HeaderCell>
          <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
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
      </Table>
    </Panel>
  );
}

export default Bookings;
