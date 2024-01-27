import React from 'react';
import Card from '../Shared/Card';
import { Slider } from 'rsuite';
import { useTranslation } from 'react-i18next';
function SkillsReview() {
  const { t } = useTranslation();
  // this sills shoud e added be admin section will be added later
  const sliderSkills = [
    {
      name: 'Communication',
      percent: 4.5,
    },
    {
      name: 'Understanding_Of_The_Situation',
      percent: 4.2,
    },
    {
      name: 'Providing_Effective_Solutions',
      percent: 3.5,
    },
    {
      name: 'Commitment_To_Start_And_End_Times',
      percent: 0.2,
    },
  ];
  return (
    <Card className="slider-skills mb-5">
      <h4 className="text-center">{t('Skills_Review')}</h4>
      <section className="grid">
        {sliderSkills?.map((el) => {
          return (
            <article key={Math.random()} className="grid grid-cols-[1fr_30px] mt-2">
              <span>
                <h6>{t(el?.name)}</h6>
                <div className="flex justify-between items-center gap-2">
                  <Slider className="grow" progress defaultValue={(el?.percent / 5).toFixed(2) * 100} readOnly />
                  <aside>{el?.percent}</aside>
                </div>
              </span>
              <span></span>
            </article>
          );
        })}
      </section>
    </Card>
  );
}

export default SkillsReview;
