import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AnimeList from './pages/AnimeList';
import AnimeContextProvider from './context/anime';

function App() {
  return (
    <AnimeContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimeList />} />
        </Routes>
      </BrowserRouter>
    </AnimeContextProvider>
  );
}

export default App;
