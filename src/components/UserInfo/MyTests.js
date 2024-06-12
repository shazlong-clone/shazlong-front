import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Whisper, IconButton, Popover, Dropdown, Loader } from 'rsuite';
import { getUserTest, deleteUserTest } from '../../features/user/userActions';
import { useDispatch, useSelector } from 'react-redux';
import CustomCell from '../Shared/CustomCell';
import moment from 'moment';
import MoreIcon from '@rsuite/icons/legacy/More';
import useSubmition from '../../hooks/useSubmit';

const { Column, HeaderCell, Cell } = Table;

const MyTests = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;
  const dispatch = useDispatch();
  const submit = useSubmition();
  const [loading, setLoading] = useState(false);

  const handelDelete = (id) => {
    submit(deleteUserTest, id, {showLoader: true, showToast:true})
      .then((res) => {
        if (res.payload.status) {
          dispatch(getUserTest({ page: 1, size: 6 }));
        }
      }).catch(() =>{})
  };
  const renderMenu = (row) => {
    return ({ left, top, className }, ref) => {
      const handleSelect = (eventKey) => {
        switch (eventKey) {
          case 1:
            navigate('/' + locale + '/psychotest/' + row?.test?._id);
            break;
          case 2:
            navigate('/' + locale + '/user-info/user-test/' + row?._id);
            break;
          case 3:
            handelDelete(row?._id);
            break;
          default:
            break;
        }
      };
      return (
        <Popover ref={ref} className={className} style={{ left, top }} full>
          <Dropdown.Menu onSelect={handleSelect}>
            <Dropdown.Item eventKey={1}>{t('Take_Test')}</Dropdown.Item>
            <Dropdown.Item eventKey={2}>{t('View_My_Answers')}</Dropdown.Item>
            <Dropdown.Item eventKey={3} className="hover:bg-[var(--rs-red-50)] [&>span]:text-[var(--rs-red-700)]">
             {t('Remove')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Popover>
      );
    };
  };
  const ActionCell = ({ rowData, ...props }) => {
    return (
      <Cell {...props} className="link-group" style={{ paddingTop: '5px', paddingBottom: '5px' }}>
        <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu(rowData)}>
          <IconButton appearance="subtle" icon={<MoreIcon />} />
        </Whisper>
      </Cell>
    );
  };

  const { data = [] } = useSelector((state) => state?.user?.tests ?? {});
  useEffect(() => {
    setLoading(true);
    dispatch(getUserTest()).finally(() => {
      setLoading(false);
    });
  }, []);
  return (
    <Table
      renderEmpty={() => (
        <>
          <div className="flex h-full justify-center items-center z-100">
            <span className="text-center">
              {t('No_Tests')}
              <br />
              <Link to={'/' + locale + '/psychometer'}>{t('Test_Your_Health')}</Link>
            </span>
          </div>
        </>
      )}
      bordered
      autoHeight
      loading={loading}
      className="mt-5 text-sm "
      data={data}
    >
      <Column flexGrow>
        <HeaderCell>{t('Test_Title')}</HeaderCell>
        <CustomCell render={(row) => <span>{locale === 'ar' ? row?.test?.ar_name : row?.test?.name}</span>} />
      </Column>

      <Column flexGrow>
        <HeaderCell>{t('Date')}</HeaderCell>
        <CustomCell
          render={(row) => (
            <span>{moment(row?.updatedAt)?.isValid() ? moment(row?.updatedAt)?.format('Do MMMM YYYY h:mm A') : ''}</span>
          )}
        />
      </Column>
      <Column width={120}>
        <HeaderCell>
          <MoreIcon />
        </HeaderCell>
        <ActionCell dataKey="id" />
      </Column>
    </Table>
  );
};

export default MyTests;
