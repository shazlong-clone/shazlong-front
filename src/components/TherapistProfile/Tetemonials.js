import React from 'react';
import { Rate, Pagination } from 'rsuite';
import Card from '../Shared/Card';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';
import person from '../../assets/images/person.svg';

const rowPerPage = 3;
function Tetemonials() {
  const [activePage, setActivePage] = React.useState(1);
  const { t } = useTranslation();
  const reviews = useSelector((state) => state?.shared?.doctorProfile?.reviews) || [];
  return (
    <div>
      <section className="text-center">
        <Card className="text-start">
          <h4 className="text-center">{t('Testemonials')}</h4>
          {reviews?.toSorted((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))?.slice((activePage - 1) * rowPerPage, (activePage - 1) * rowPerPage + rowPerPage)?.map((review) => {
            return (
              <div key={review?._id} className="py-2">
                <Rate color='yellow' size="xs" defaultValue={review.rate} readOnly />
                <section>{review?.message}</section>
                <section className="flex justify-between items-center mt-4 mb-2">
                  <article className="flex justify-center gap-1 text-xs items-center">
                    <img src={review?.user?.photo ?? person } className="size-5 rounded-full" />
                    <span>{review?.user?.name}</span>
                  </article>
                  <article className="text-gray/60 font-light text-xs">{moment(review?.createdAt)?.fromNow()}</article>
                </section>
                <hr className="m-0" />
              </div>
            );
          })}
          <section className="text-center flex justify-center">
            <Pagination
              prev
              last
              next
              ellipsis
              first
              size="md"
              total={reviews?.length}
              limit={rowPerPage}
              activePage={activePage}
              onChangePage={setActivePage}
            />
          </section>
        </Card>
      </section>
    </div>
  );
}

export default Tetemonials;
