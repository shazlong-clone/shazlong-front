import React from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import psychometer from '../assets/images/psychometer.png';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { IconButton, Table } from 'rsuite';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import useMediaQuery from '../utils/useMediaQuery';
import DoctorsSlider from '../components/Shared/DoctorsSlider';
import { Link } from 'react-router-dom';

const { Column, HeaderCell, Cell } = Table;
const rowKey = 'title';
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
const data = [
  {
    title: 'Depression, Anxiety and stress scale',
    description:
      'This test is designed to measure your psychological state with\n            regards to the degree of depression, stress and anxiety. Please read\n            the test sentences and choose the best answer that fits you during\n            the last 2 weeks.\n            See More',
    recomination: 'Every 2 weeks',
    testPeriod: '1:30 Mins',
  },
  {
    title: 'Anxiety scale',
    description:
      'This test is designed to measure your anxiety degree. Please read\n            the test sentences and choose the best answer that fits you during\n            the last 2 weeks.\n            See More',
    recomination: 'Every 2 weeks',
    testPeriod: '1:30 Mins',
  },
  {
    title: 'Depression scale',
    description:
      'This test is designed to measure your depression degree. Please read\n            the test sentences and choose the best answer that fits you during\n            the last 2 weeks.\n            See More',
    recomination: 'Every 2 weeks',
    testPeriod: '1:30 Mins',
  },
  {
    title: 'OCD scale',
    description:
      'Obsessions are unwelcome or distressing ideas, thoughts, images or\n            impulses that repeatedly enter your mind. They may seem to occur\n            against your will. They may be repugnant to you, are often\n            senseless, and may not fit your actual personality at all (for\n            example, the recurrent thought or impulse to harm to your children,\n            even though you never This test is designed to measure your\n            obsessive comupulsive symptoms. Obsessions are unwelcome or\n            distressing ideas, thoughts, images or impulses that repeatedly\n            enter your mind. They may seem to occur against your will. They may\n            be repugnant to you, are often senseless, and may not fit your\n            actual personality at all. Compulsions are behaviors or acts that\n            you feel driven to perform, even though you may recognize them as\n            senseless or excessive. At times, you may try to resist doing them,\n            but this may prove difficult. You may experience anxiety that does\n            not diminish until the behavior is completed. Please read the test\n            sentences and choose the best answer that fits you during the last 2\n            weeks. This test is designed to measure your obsessive comupulsive\n            symptoms. Obsessions are unwelcome or distressing ideas, thoughts,\n            images or impulses that repeatedly enter your mind. They may seem to\n            occur against your will. They may be repugnant to you, are often\n            senseless, and may not fit your actual personality at all.\n            Compulsions are behaviors or acts that you feel driven to perform,\n            even though you may recognize them as senseless or excessive. At\n            times, you may try to resist doing them, but this may prove\n            difficult. You may experience anxiety that does not diminish until\n            the behavior is completed. Please read the test sentences and choose\n            the best answer that fits you during the last 2 weeks.\n            See More',
    recomination: 'Every 2 weeks',
    testPeriod: '1:30 Mins',
  },
  {
    title: 'PTSD',
    description:
      'This test assesses the psychological impact of stressful events\n            after its ends by few months. Below is a list of problems and\n            complaints that person sometimes have in response to stressful life\n            experiences. Please read each one carefully, choose the answer that\n            fits you mostly to indicate how much you have been bothered by that\n            problem in the last month\n            See More',
    recomination: 'Every 2 weeks',
    testPeriod: '1:30 Mins',
  },
  {
    title: 'Adult ADHD Self-Report Scale',
    description:
      'Attention deficit hyperactivity disorder (ADHD) in adults is a\n            mental health related disorder and includes a set of persistent\n            problems, such as difficulty in attention, hyperactivity, and\n            impulsive behavior. Attention deficit disorder with hyperactivity in\n            adults may lead to unstable relationships, poor work or school\n            performance, decreased self-confidence, and other problems.\n            See More',
    recomination: 'Every 2 weeks',
    testPeriod: '1:30 Mins',
  },
];

function Psychometer() {
  const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);

  const renderRowExpanded = (rowData) => {
    return (
      <div className="px-5">
        <h6 className="mb-2">Description:</h6>
        <p className="text-gray/50 font-[500]">{rowData?.description}</p>
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

  const TitleCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>
      <Link to="/psychotest/55" className="hover:no-underline">
        {rowData[dataKey]}
      </Link>
    </Cell>
  );
  return (
    <>
      <main className="bg-[var(--rs-primary-700)] text-white pt-5">
        <div className="container">
          <InternalHeader iconClassName="text-white hover:text-white">Psycho meter</InternalHeader>
          <section className="font-[500] text-base pt-5 relative xl:grid xl:grid-cols-[1fr_250px] xl:gap xl:items-end">
            <article className="xl:pt-5 xl:pb-10">
              <p className="xl:mb-5">
                How much do I know about myself, do I suffer from depression or anxiety? , Should I visit a therapist, do I need
                psychiatric treatment? , In just a few minutes these tests will answer all your head questions to know more about
                your psychological condition and take a step forward to a better life.
              </p>
              <p className="xl:mb-5">
                All of the information contained on this platform, website, or app, including the results of any self-assessment
                or questionnaire, should be discussed with a suitably qualified healthcare professional before drawing any
                conclusions about your own mental health. Self-assessments are not intended to give a specific formal diagnosis or
                provide medical advice. You are strongly encouraged to confirm any information obtained from- or through this
                assessment (and any other information on this platform) and to review all information regarding your mental health
                condition, life stage, or treatment with your treating professional. Never disregard professional healthcare
                advice or delay seeking treatment because of something you have read on, or accessed through, this platform.
              </p>
              <p className="flex gap-3 flex-wrap">
                All tests are
                <i className="flex items-center gap-1">
                  <AiOutlineCheckCircle />
                  <span> Scientific</span>
                </i>
                <i className="flex items-center gap-1">
                  <AiOutlineCheckCircle />
                  <span> Reliable</span>
                </i>
                <i className="flex items-center gap-1">
                  <AiOutlineCheckCircle />
                  <span> Trusted</span>
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
              <Table
                className="text-gray/90"
                rowExpandedHeight={lg ? 200 : 200}
                headerHeight={50}
                rowHeight={70}
                data={data}
                autoHeight
                rowKey={rowKey}
                expandedRowKeys={expandedRowKeys}
                renderRowExpanded={renderRowExpanded}
              >
                <Column width={70} align="center">
                  <HeaderCell className="text-cyan text-xl font-[500]">#</HeaderCell>
                  <ExpandCell expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
                </Column>
                <Column {...(lg ? { flexGrow: 1 } : { width: 320 })}>
                  <HeaderCell className="text-cyan text-xl font-[500]">Title</HeaderCell>
                  <TitleCell dataKey="title" />
                </Column>
                <Column {...(lg ? { flexGrow: 1 } : { width: 200 })}>
                  <HeaderCell className="text-cyan text-xl font-[500]">Recomination</HeaderCell>
                  <Cell dataKey="recomination" />
                </Column>
                <Column {...(lg ? { flexGrow: 1 } : { width: 150 })}>
                  <HeaderCell className="text-cyan text-xl font-[500]">Test Period</HeaderCell>
                  <Cell dataKey="testPeriod" />
                </Column>
              </Table>
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
