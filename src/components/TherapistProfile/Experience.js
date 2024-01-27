import React from 'react';
import Card from '../Shared/Card';

function Experience() {
  const experience = [
    {
      title: 'Certificates',
      data: [
        {
          text: 'Training in Cognitive-behavioral therapy for obsessive-compulsive disorder',
          cerPlace: 'Psychological research center',
          date: 'Apr 2021 - Apr 2021',
        },
      ],
    },
    {
      title: 'Education',
      data: [
        {
          text: 'Training in Cognitive-behavioral therapy for obsessive-compulsive disorder',
          cerPlace: 'Psychological research center',
          date: 'Apr 2021 - Apr 2021',
        },
      ],
    },
    {
      title: 'Experience',
      data: [
        {
          text: 'Training in Cognitive-behavioral therapy for obsessive-compulsive disorder',
          cerPlace: 'Psychological research center',
          date: 'Apr 2021 - Apr 2021',
        },
      ],
    },
  ];
  return (
    <div className="mb-16">
      {experience?.map((el) => {
        return (
          <Card className="text-sm grid gap-3" key={Math.random()}>
            <p className="text-cyan pb-3">Certificates</p>
            {el?.data.map((item) => {
              return (
                <div key={Math.random()}>
                  <section className="flex gap-3">
                    <article className="w-2 lg:w-1 rounded-md bg-[var(--rs-primary-700)]"></article>
                    <article>
                      <div>{item?.text}</div>
                      <div className="italic font-light">Psychological research center</div>
                      <div className="text-cyan">Apr 2021 - Apr 2021</div>
                    </article>
                  </section>
                </div>
              );
            })}
          </Card>
        );
      })}
    </div>
  );
}

export default Experience;
