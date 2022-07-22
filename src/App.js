import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AnimeList from './pages/AnimeList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
