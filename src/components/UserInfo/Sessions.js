import moment from 'moment';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Popover, Table, Whisper } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { PREVIOUS, UPCOMING, sessionsStatusList } from '../../costansts';
import { getPrefix } from '../../features/shared/sharedActions';
import { useDispatch, useSelector } from 'react-redux';
import { genders } from '../../assets/constants';
const { Column, HeaderCell, Cell } = Table;
function Sessions({ sessions, type }) {
  const CustomCell = ({ rowData, dataKey, ...props }) => {
    return <Cell {...props}>{rowData[dataKey] ?? props.render(rowData)}</Cell>;
  };
  const { prefixesList } = useSelector((state) => state?.shared);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
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
                    <div className='max-w-[100px]'>

                    <img src={row?.slot?.doctor?.photo} width="100%" height="75" className="rounded-md" />
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
            if(type === PREVIOUS && row?.status === 1) {
              return t('Not_Spicified')
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
          <Cell>
            <Button appearance="link" color="red" className="p-0">
              {t('Cancel')}
            </Button>
          </Cell>
        </Column>
      )}
    </Table>
  );
}

export default Sessions;
