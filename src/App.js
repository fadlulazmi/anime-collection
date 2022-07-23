import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AnimeList from './pages/AnimeList';
import AnimeContextProvider from './context/anime';
import AnimeDetail from './pages/AnimeDetail';
import CollectionContextProvider from './context/collection';
import CollectionList from './pages/CollectionList';

function App() {
  return (
    <AnimeContextProvider>
      <CollectionContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AnimeList />} />
            <Route path="/:animeId" element={<AnimeDetail />} />
            <Route path="/collections" element={<CollectionList />} />
          </Routes>
        </BrowserRouter>
      </CollectionContextProvider>
    </AnimeContextProvider>
  );
}

export default App;
