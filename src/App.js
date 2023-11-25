import { Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<div>About</div>} />
    </>
  );
}

export default App;
