import React from 'react';
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LayOut from './components/Shared/LayOut';
import Loading from './components/Shared/BackDropLoading';
import LangWrapper from './components/Shared/LangWrapper';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import ProtectDoctor from './components/Shared/ProtectDoctor';
import Slots from './components/Doctor/Slots';
import Bookings from './components/Doctor/Bookings';
import DoctorProfile from './components/Doctor/DoctorProfile';

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
const Test = lazy(() => import('./pages/Test'));
const Licence = lazy(() => import('./pages/Licence'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Blog = lazy(() => import('./pages/Blog'));
const Psychometer = lazy(() => import('./pages/Psychometer'));
const Psychotest = lazy(() => import('./pages/Psychotest'));
const JoinUs = lazy(() => import('./pages/JoinUs'));
const DoctorSignUp = lazy(() => import('./pages/DoctorSignUp'));
const VerifyEmailRegistration = lazy(() => import('./pages/VerifyEmailRegistration'));
const UserInfo = lazy(() => import('./pages/UserInfo'));

const LangRedirect = () => {
  const lang = localStorage.getItem('i18nextLng');
  return <Navigate to={`/${lang}`} />;
};
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LangWrapper>
        <Routes>
          <Route path="/" element={<LangRedirect />} />
          <Route path="/:lang" element={<Outlet />}>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="doctor-signup" element={<DoctorSignUp />} />
            <Route path="therapist-verify-email-registration" element={<VerifyEmailRegistration />} />
            <Route path="doctor" element={<ProtectDoctor />}>
              <Route index element={<DoctorProfile />} />
              <Route path="slots" element={<Slots />} />
              <Route path="bookings" element={<Bookings />} />
            </Route>
            <Route element={<LayOut />}>
              <Route index element={<Home />} />
              <Route path="therapists" element={<Therapists />} />
              <Route path="thearpist-profile/:id" element={<ThearpistProfile />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="instructions" element={<Instructions />} />
              <Route path="online" element={<Online />} />
              <Route path="my-therapy" element={<MyTherapy />} />
              <Route path="licence" element={<Licence />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blog/:id" element={<Blog />} />
              <Route path="psychometer" element={<Psychometer />} />
              <Route path="psychotest/:id" element={<Psychotest />} />
              <Route path="join-us" element={<JoinUs />} />
              <Route path="user-info" element={<ProtectedRoute />}>
                <Route index element={<UserInfo />} />
              </Route>
              <Route path="test" element={<Test />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Route>
        </Routes>
      </LangWrapper>
    </Suspense>
  );
}

export default App;
