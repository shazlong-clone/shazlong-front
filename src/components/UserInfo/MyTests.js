import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Table } from 'rsuite';
import { getUserTest } from '../../features/user/userActions';
import { useDispatch, useSelector } from 'react-redux';
import CustomCell from '../Shared/CustomCell';
import moment from 'moment';

const { Column, HeaderCell, Cell } = Table;

const MyTests = () => {
  const { t, i18n } = useTranslation();
  const locale =  i18n.resolvedLanguage;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const {data = [] } = useSelector(state => state?.user?.tests)
  useEffect(() => {
    setLoading(true);
    dispatch(getUserTest()).finally(() => {
      setLoading(false);
    });
  }, []);
  return (
    <Table
    renderEmpty={()=> 
      <div className='flex h-full justify-center items-center'>
        {t('No_Sessions')}
      </div>
      }
      bordered
      autoHeight
      loading={loading}
      className="mt-5 text-sm"
      data={data}
    >
      <Column flexGrow>
        <HeaderCell>{t('Test_Title')}</HeaderCell>
        <CustomCell render={(row) => <span>{locale === 'ar' ? row?.test?.ar_name : row?.test?.name}</span>} />
      </Column>

      <Column flexGrow>
        <HeaderCell>{t('Date')}</HeaderCell>
        <CustomCell render={(row) => <span>{moment(row?.updatedAt)?.isValid() ? moment(row?.updatedAt)?.format('Do MMMM YYYY h:mm A') :''}</span>} />
      </Column>
      <Column>
        <HeaderCell>...</HeaderCell>
        <Cell style={{ padding: '6px' }}>{(row) => <Link to={'/' + locale + '/psychotest/' + row?.test?._id} appearance="link">{t('Take_Test')}</Link>}</Cell>
      </Column>
      <Column>
        <HeaderCell>...</HeaderCell>
        <Cell style={{ padding: '6px' }}>{(rowData) => <Link appearance="link">{t('View_My_Answers')}</Link>}</Cell>
      </Column>
    </Table>
  );
};

export default MyTests;
