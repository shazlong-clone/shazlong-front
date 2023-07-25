import React from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import psychometer from '../assets/images/psychometer.png';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Table } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
const data = Array(10)
  .fill('')
  .map((el, i) => {
    return {
      id: i,
      firstName: 'firstName' + i,
      lastName: 'lastName' + i,
      gender: 'gender' + i,
      age: 'age' + i,
      postcode: 'postcode' + i,
      email: 'email' + i,
    };
  });
function Psychometer() {
  return (
    <>
      <main className="bg-cyan text-white pt-5">
        <div className="container">
          <InternalHeader iconClassName="text-white">Psycho meter</InternalHeader>
          <section className="font-[500] text-base pt-5 relative xl:grid xl:grid-cols-[1fr_250px] xl:gap-64 xl:items-end">
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
      <main className="bg-gray/5">
        <div className="container">
          <section>
            <Table autoHeight data={data}>
              <Column fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column>
                <HeaderCell>First Name</HeaderCell>
                <Cell dataKey="firstName" />
              </Column>

              <Column>
                <HeaderCell>Last Name</HeaderCell>
                <Cell dataKey="lastName" />
              </Column>

              <Column>
                <HeaderCell>Gender</HeaderCell>
                <Cell dataKey="gender" />
              </Column>

              <Column>
                <HeaderCell>Age</HeaderCell>
                <Cell dataKey="age" />
              </Column>

              <Column>
                <HeaderCell>Postcode</HeaderCell>
                <Cell dataKey="postcode" />
              </Column>
              <Column>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
              </Column>
            </Table>
          </section>
        </div>
      </main>
    </>
  );
}

export default Psychometer;
