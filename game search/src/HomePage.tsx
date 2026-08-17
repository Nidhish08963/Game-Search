import { useState, useEffect } from "react";
import ListGroup from "./components/ListGroup"
import Alert from "./components/Alert"
import Heading from "./components/Header";
import { type Game } from "./data/games";

interface HomePageProps {
  gameQuery: { genre: string; sortOrder: string; searchText: string};
  games: Game[];
  isLoading: boolean;
  error: string;
}

function HomePage({ gameQuery, games, isLoading, error }: HomePageProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [gameQuery]);

  const handleSelectItem = (game: Game, index: number) => {
    console.log(game.title, index);
  }
    
  let filteredGames = [...games];

  if( gameQuery.genre !== "") {
    filteredGames = filteredGames.filter(game => game.genre.toLowerCase() === gameQuery.genre.toLowerCase());
  }

  if(gameQuery.sortOrder !== "") {
    if(gameQuery.sortOrder === "Relevance") {
      filteredGames.sort((a,b) => a.title.localeCompare(b.title));
    }
    else if(gameQuery.sortOrder === "Newest to Oldest") {
      filteredGames.sort((a,b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    }
    else if(gameQuery.sortOrder === "Oldest to Newest") {
      filteredGames.sort((a,b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }
  }

  if(gameQuery.searchText !== "") {
    filteredGames = filteredGames.filter(game => game.title.toLowerCase().includes(gameQuery.searchText.toLowerCase()));
  }

  // Pagination logic
  const PAGE_SIZE = 52;
  const totalPages = Math.ceil(filteredGames.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedGames = filteredGames.slice(startIndex, startIndex + PAGE_SIZE);

  return (  
    <div className="container py-3">
      <Heading heading="Game Searcher"/>
      {isLoading && <div className="text-center my-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>}
      {error && <p className="text-danger text-center my-5">{error}</p>}
      {!isLoading && !error && (
        <>
          <ListGroup 
            items={paginatedGames} 
            onSelectItem={handleSelectItem}  
          />
          
          {totalPages > 1 && (
            <nav className="mt-5" aria-label="Game page navigation">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
                </li>
                
                <li className="page-item disabled">
                  <span className="page-link text-white">Page {currentPage} of {totalPages}</span>
                </li>

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  )
}

export default HomePage;