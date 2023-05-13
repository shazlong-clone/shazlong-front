import Hero from './components/Hero';
import NavBar from './components/NavBar';
import Container from 'rsuite/Container';
import Info from './components/Info';

function App() {
  return (
    <div>
      <Container>
        <NavBar />
        <Hero />
        <Info />
      </Container>
    </div>
  );
}

export default App;
