
import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Therapists from './pages/Therapists';
import NavBar from './components/NavBar'
import FooterMenu from './components/FooterMenu';
function App() {
  return (
    <div className='pb-[74px] md:pb-0'>
      <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/therapists' element={<Therapists />} />
        </Routes>
      <FooterMenu />
    </div>
  );
}

export default App;
