import { Routes, Route } from 'react-router-dom';
import NavBar from './components/SharedComponents/NavBar';
import FooterMenu from './components/SharedComponents/FooterMenu';
import { Suspense, lazy } from 'react';
import { Loader } from 'rsuite';
import ErrorBoundary from './components/SharedComponents/ErrorBoundary';
const Home = lazy(() => import('./pages/Home'));
const ThearpistProfile = lazy(() => import('./pages/ThearpistProfile'));
const Therapists = lazy(() => import('./pages/Therapists'));
const Test = lazy(() => import('./components/SharedComponents/Test'));

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
            <Route exact path='/test' element={<Test />} />
          </Routes>
          <ErrorBoundary>
            <FooterMenu />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
