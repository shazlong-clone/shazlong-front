import Hero from './components/Hero';
import NavBar from './components/NavBar';
import Container from 'rsuite/Container';
import Info from './components/Info';
import FooterMenu from './components/FooterMenu';

function App() {
  return (
    <div>
      <Container>
        <NavBar />
        <Hero />
        <Info />
      </Container>
      <FooterMenu />
    </div>
  );
}

export default App;
