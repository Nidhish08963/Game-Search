import { useState } from "react";
import ListGroup from "./components/ListGroup"
import Alert from "./components/Alert"
import Heading from "./components/Header";
import NavBar from "./components/NavBar";
import { games, type Game } from "./data/games";


function App() {
  const [alertColor, setAlertColor] = useState("secondary");
  const [gameQuery, setGameQuery] = useState({
        genre:"", 
        rating:null,
        sortOrder:""
  })
  const handleSelectItem = (game: Game, index: number) => {
    console.log(game.title, index);
    // Change color based on index
    if (index === 0) setAlertColor("primary");
    else if (index === 1) setAlertColor("success");
    else if (index === 2) setAlertColor("danger");
    else setAlertColor("secondary");
  }
    
  //filter data of games
  let filteredGames = [...games]
 if( gameQuery.genre !== "") {
  filteredGames = filteredGames.filter(game => game.genre === gameQuery.genre);
 }

 if(gameQuery.rating !== null){
  if(gameQuery.rating === 10) {
    filteredGames.sort((a,b) => b.rating - a.rating)
  }
  else if(gameQuery.rating === 1){
    filteredGames.sort((a,b) => a.rating - b.rating)
  }
 }

 if(gameQuery.sortOrder !== "") {
  if(gameQuery.sortOrder === "Relevance") {
    filteredGames.sort((a,b) => a.title.localeCompare(b.title))
  }
  else if(gameQuery.sortOrder === "Newest to Oldest") {
    filteredGames.sort((a,b) => b.releaseYear - a.releaseYear)
  }
  else if(gameQuery.sortOrder === "Oldest to Newest") {
    filteredGames.sort((a,b) => a.releaseYear - b.releaseYear)
  }
 }

  return (  
  <div className="container py-3">
    <NavBar
    onSelectSort={(sortOrder) => setGameQuery({...gameQuery, sortOrder})}
    onSelectRating={(rating) => setGameQuery({...gameQuery, rating})}
    onSelectGenre={(genre) => setGameQuery({...gameQuery, genre})}/>
    <Heading heading = "Game Searcher"/>
    <ListGroup 
    items = {filteredGames} 
    onSelectItem= {handleSelectItem}  
    />
    <Alert color={alertColor}>New <span>Alert</span></Alert>
  </div>
  )
}

export default App;