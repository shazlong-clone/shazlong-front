import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import FooterMenu from './components/FooterMenu';
import { Suspense, lazy } from 'react';
import { Loader } from 'rsuite';
const Home = lazy(() => import('./pages/Home'));
const Therapists = lazy(() => import('./pages/Therapists'));

const Loading = () => {
  return <Loader size='lg' backdrop content='loading...' vertical />;
};
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className='pb-[74px] md:pb-0'>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/therapists' element={<Therapists />} />
        </Routes>
        <FooterMenu />
      </div>
    </Suspense>
  );
}

export default App;
