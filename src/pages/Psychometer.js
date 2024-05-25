import React, { useEffect, useState } from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import psychometer from '../assets/images/psychometer.png';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { IconButton, Placeholder, Table } from 'rsuite';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import useMediaQuery from '../hooks/useMediaQuery';
import DoctorsSlider from '../components/Shared/DoctorsSlider';
import { useTranslation } from 'react-i18next';
import { getpsychoTests } from '../features/test/testAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const { Column, HeaderCell, Cell } = Table;
const rowKey = '_id';
const ExpandCell = ({ rowData, expandedRowKeys, onChange, ...props }) => (
  <Cell {...props} style={{ padding: 5 }}>
    <IconButton
      appearance="subtle"
      onClick={() => {
        onChange(rowData);
      }}
      icon={expandedRowKeys.some((key) => key === rowData[rowKey]) ? <CollaspedOutlineIcon /> : <ExpandOutlineIcon />}
    />
  </Cell>
);

function Psychometer() {
  const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);
  const { t } = useTranslation();
  const renderRowExpanded = (rowData) => {
    return (
      <div className="px-5">
        <h6 className="mb-2">{t('Description')}:</h6>
        <p className="text-gray/50 font-[500]">{locale === 'ar' ? rowData?.ar_description : rowData?.description}</p>
      </div>
    );
  };
  const handleExpanded = (rowData) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }

    setExpandedRowKeys(nextExpandedRowKeys);
  };
  const lg = useMediaQuery('lg');
  const { i18n } = useTranslation();

  const DataCell = ({ rowData, dataKey, ...props }) => <Cell {...props}>{rowData[dataKey]}</Cell>;
  const locale = i18n.resolvedLanguage ?? '';

  const tests = useSelector((state) => state?.test?.tests) ?? [];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(getpsychoTests()).finally(() => setLoading(false));
  }, []);
  return (
    <>
      <main className="bg-[var(--rs-primary-700)] text-white pt-5">
        <div className="container">
          <InternalHeader iconClassName="text-white hover:text-white">{t('Psycho_Meter')}</InternalHeader>
          <section className="font-[500] text-base pt-5 relative xl:grid xl:grid-cols-[1fr_250px] xl:gap xl:items-end">
            <article className="xl:pt-5 xl:pb-10">
              <p className="xl:mb-5">{t('Psycho_Meter_p1')}</p>
              <p className="xl:mb-5">{t('Psycho_Meter_p2')}</p>
              <p className="flex gap-3 flex-wrap items-center">
                <span className=" pt-1 ">{t('All_Tests_Are')}</span>
                <i className="flex items-center gap-1">
                  <AiOutlineCheckCircle />
                  <span className="pt-1"> {t('Scientific')}</span>
                </i>
                <i className="flex items-center gap-1">
                  <AiOutlineCheckCircle />
                  <span className="pt-1"> {t('Reliable')}</span>
                </i>
                <i className="flex items-center gap-1">
                  <AiOutlineCheckCircle />
                  <span className="pt-1"> {t('Trusted')}</span>
                </i>
              </p>
            </article>
            <article className="text-center">
              <img className="" src={psychometer} alt="psychometer" />
            </article>
          </section>
        </div>
      </main>
      <main className="py-10">
        <div className="container">
          <div className="xl:grid xl:grid-cols-[1fr_260px] xl:gap-3">
            <section className="bg-[var(--rs-bg-card)]">
              {loading ? (
                <Placeholder.Paragraph rows={10} active />
              ) : (
                <Table
                  className="text-gray/90 tests-table"
                  rowExpandedHeight={lg ? 600 : 200}
                  headerHeight={50}
                  data={tests}
                  autoHeight
                  rowKey={rowKey}
                  expandedRowKeys={expandedRowKeys}
                  renderRowExpanded={renderRowExpanded}
                >
                  <Column width={70} align="center">
                    <HeaderCell className="text-cyan text-xl font-[500]">#</HeaderCell>
                    <ExpandCell expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
                  </Column>
                  <Column {...(lg ? { flexGrow: 3 } : { width: 320 })}>
                    <HeaderCell className="text-cyan text-xl font-[500]">{t('Title')}</HeaderCell>
                    <DataCell dataKey={`${locale === 'ar' ? 'ar_name' : 'name'}`} />
                  </Column>
                  <Column {...(lg ? { flexGrow: 1 } : { width: 200 })}>
                    <HeaderCell className="text-cyan text-xl font-[500]">{t('Recommendation')}</HeaderCell>
                    <DataCell dataKey={`${locale === 'ar' ? 'ar_recommendation' : 'recommendation'}`} />
                  </Column>
                  <Column {...(lg ? { flexGrow: 1 } : { width: 150 })}>
                    <HeaderCell className="text-cyan text-xl font-[500]">{t('Test_Period')}</HeaderCell>
                    <DataCell dataKey={`${locale === 'ar' ? 'ar_duration' : 'duration'}`} />
                  </Column>
                  <Column {...(lg ? { flexGrow: 1 } : { width: 150 })}>
                    <HeaderCell>...</HeaderCell>
                    <Cell style={{ padding: '6px' }}>
                      {(rowData) => <Link to={`/${i18n.resolvedLanguage}/psychotest/${rowData?._id}`}>{t('Take_Test')}</Link>}
                    </Cell>
                  </Column>
                </Table>
              )}
            </section>
            <section>
              <DoctorsSlider />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Psychometer;
