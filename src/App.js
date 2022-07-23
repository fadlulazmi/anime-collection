import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AnimeList from './pages/AnimeList';
import AnimeContextProvider from './context/anime';
import AnimeDetail from './pages/AnimeDetail';

function App() {
  return (
    <AnimeContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimeList />} />
          <Route path="/:animeId" element={<AnimeDetail />} />
        </Routes>
      </BrowserRouter>
    </AnimeContextProvider>
  );
}

export default App;
