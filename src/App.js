import React from 'react';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/Shared/ErrorBoundary';
import SignUp from './pages/SignUp';
import LayOut from './components/Shared/LayOut';
import Loading from './components/Shared/BackDropLoading';
import LangWrapper from './components/Shared/LangWrapper';
const Home = lazy(() => import('./pages/Home'));
const ThearpistProfile = lazy(() => import('./pages/ThearpistProfile'));
const Therapists = lazy(() => import('./pages/Therapists'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Error = lazy(() => import('./pages/Error'));
const Instructions = lazy(() => import('./pages/Instructions'));
const Online = lazy(() => import('./pages/Online'));
const MyTherapy = lazy(() => import('./pages/MyTherapy'));
const Test = lazy(() => import('./components/Shared/Test'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <LangWrapper>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<LayOut />}>
              <Route index element={<Home />} />
              <Route exact path="therapists" element={<Therapists />} />
              <Route exact path="thearpist-profile/:id" element={<ThearpistProfile />} />
              <Route exact path="checkout/:doctorId/:slotId" element={<Checkout />} />
              <Route exact path="instructions" element={<Instructions />} />
              <Route exact path="online" element={<Online />} />
              <Route exact path="my-therapy" element={<MyTherapy />} />
              <Route exact path="test" element={<Test />} />
              <Route exact path="*" element={<Error />} />
            </Route>
          </Routes>
        </LangWrapper>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
