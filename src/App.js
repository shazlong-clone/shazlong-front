import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Shared/NavBar';
import FooterMenu from './components/Shared/FooterMenu';
import { Suspense, lazy } from 'react';
import { Loader } from 'rsuite';
import ErrorBoundary from './components/Shared/ErrorBoundary';
const Home = lazy(() => import('./pages/Home'));
const ThearpistProfile = lazy(() => import('./pages/ThearpistProfile'));
const Therapists = lazy(() => import('./pages/Therapists'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Error = lazy(() => import('./pages/Error'));


const Test = lazy(() => import('./components/Shared/Test'));

const Loading = () => {
  return <Loader size='lg' backdrop content='loading...' vertical />;
};
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <div className='pb-[74px] md:pb-0'>
          <NavBar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/therapists' element={<Therapists />} />
            <Route exact path='/thearpist-profile/:id' element={<ThearpistProfile />} />
            <Route exact path='/checkout/:doctorId/:slotId' element={<Checkout />} />
            <Route exact path='/test' element={<Test />} />
            <Route exact path='*' element={<Error />} />
          </Routes>
            <FooterMenu />
        </div>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
