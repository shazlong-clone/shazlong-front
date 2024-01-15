import React from 'react';
import InternalHeader from '../components/Shared/InternalHeader';
import TherapistsComp from '../components/Shared/TherapistsComp';
import { useTranslation } from 'react-i18next';
function Therapists() {
  const { t } = useTranslation();
  return (
    <main className="bg-[var(--rs-gray-50)]">
      <div className="container py-4 min-h-[100vh]">
        <InternalHeader to="/">{t('Therapist_List')}</InternalHeader>
        <TherapistsComp />
      </div>
    </main>
  );
}

export default Therapists;
