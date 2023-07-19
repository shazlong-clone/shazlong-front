import React from 'react';
import { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './components/Shared/NavBar';
import FooterMenu from './components/Shared/FooterMenu';
import { Loader } from 'rsuite';
import ErrorBoundary from './components/Shared/ErrorBoundary';
const Home = lazy(() => import('./pages/Home'));
const ThearpistProfile = lazy(() => import('./pages/ThearpistProfile'));
const Therapists = lazy(() => import('./pages/Therapists'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Error = lazy(() => import('./pages/Error'));
const Instructions = lazy(() => import('./pages/Instructions'));
const Online = lazy(() => import('./pages/Online'));
const MyTherapy = lazy(() => import('./pages/MyTherapy'));

const Test = lazy(() => import('./components/Shared/Test'));

const Loading = () => {
  return <Loader size="lg" backdrop content="loading..." vertical />;
};
const LayOut = () => {
  return (
    <>
      <div className="pb-[74px] md:pb-0">
        <NavBar />
        <Outlet />
        <FooterMenu />
      </div>
    </>
  );
};
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <Routes>
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
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
