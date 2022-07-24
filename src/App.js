import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AnimeList from './pages/AnimeList';
import AnimeContextProvider from './context/anime';
import AnimeDetail from './pages/AnimeDetail';
import CollectionContextProvider from './context/collection';
import CollectionList from './pages/CollectionList';
import CollectionDetail from './pages/CollectionDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <AnimeContextProvider>
      <CollectionContextProvider>
        <BrowserRouter>
          <Navbar />
          <div className='App'>
            <Routes>
              <Route path="/" exact element={<AnimeList />} />
              <Route path="/:animeId" element={<AnimeDetail />} />
              <Route path="/collections" element={<CollectionList />} />
              <Route path="/collections/:name" element={<CollectionDetail />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CollectionContextProvider>
    </AnimeContextProvider>
  );
}

export default App;
