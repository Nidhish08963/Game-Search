import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import GameDetails from './components/GameDetails';
import NavBar from './components/NavBar';
import { type Game } from './data/games';

function App() {
  const [gameQuery, setGameQuery] = useState<{genre: string, sortOrder: string, searchText: string}>({
        genre:"", 
        sortOrder:"",
        searchText: ""
  });

  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('https://www.freetogame.com/api/games')
      .then(res => {
        if (!res.ok) throw new Error("Could not fetch games");
        return res.json();
      })
      .then(data => {
        setGames(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Extract unique genres from the fetched games
  const uniqueGenres = Array.from(new Set(games.map(g => g.genre))).sort();

  return (
    <BrowserRouter>
      <NavBar
        genres={uniqueGenres}
        onSelectSort={(sortOrder) => setGameQuery({...gameQuery, sortOrder})}
        onSelectGenre={(genre) => setGameQuery({...gameQuery, genre})}
        onSearch={(searchText) => setGameQuery({...gameQuery, searchText})}
      />
      <Routes>
        <Route path="/" element={<HomePage gameQuery={gameQuery} games={games} isLoading={isLoading} error={error} />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
