import React from 'react';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/Shared/ErrorBoundary';
import LayOut from './components/Shared/LayOut';
import Loading from './components/Shared/BackDropLoading';
import LangWrapper from './components/Shared/LangWrapper';
import ProtectedRoute from './components/Shared/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const ThearpistProfile = lazy(() => import('./pages/ThearpistProfile'));
const Therapists = lazy(() => import('./pages/Therapists'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Error = lazy(() => import('./pages/Error'));
const Instructions = lazy(() => import('./pages/Instructions'));
const Online = lazy(() => import('./pages/Online'));
const MyTherapy = lazy(() => import('./pages/MyTherapy'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const Test = lazy(() => import('./components/Shared/Test'));
const Licence = lazy(() => import('./pages/Licence'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Blog = lazy(() => import('./pages/Blog'));
const Psychometer = lazy(() => import('./pages/Psychometer'));
const Psychotest = lazy(() => import('./pages/Psychotest'));
const JoinUs = lazy(() => import('./pages/JoinUs'));
const DoctorSignUp = lazy(() => import('./pages/DoctorSignUp'));
const VerifyEmailRegistration = lazy(() => import('./pages/VerifyEmailRegistration'));
const UserInfo = lazy(() => import('./pages/UserInfo'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <LangWrapper>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route exact path="/doctor-signup" element={<DoctorSignUp />} />
            <Route exact path="/therapist-verify-email-registration" element={<VerifyEmailRegistration />} />
            <Route path="/" element={<LayOut />}>
              <Route index element={<Home />} />
              <Route exact path="therapists" element={<Therapists />} />
              <Route exact path="thearpist-profile/:id" element={<ThearpistProfile />} />
              <Route exact path="checkout/:doctorId/:slotId" element={<Checkout />} />
              <Route exact path="instructions" element={<Instructions />} />
              <Route exact path="online" element={<Online />} />
              <Route exact path="my-therapy" element={<MyTherapy />} />
              <Route exact path="licence" element={<Licence />} />
              <Route exact path="blogs" element={<Blogs />} />
              <Route exact path="blog/:id" element={<Blog />} />
              <Route exact path="psychometer" element={<Psychometer />} />
              <Route exact path="psychotest/:id" element={<Psychotest />} />
              <Route exact path="join-us" element={<JoinUs />} />
              <Route exact path="user-info" element={<ProtectedRoute />}>
                <Route exact index element={<UserInfo />} />
              </Route>
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
