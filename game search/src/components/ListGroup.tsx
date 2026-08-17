import { useState } from "react";
import "./ListGroup.css";
import { type Game } from "../data/games";
import { Link } from "react-router-dom"

interface ListGroupProps{
  items: Game[];
  onSelectItem: (item: Game, index: number) => void;
}

function ListGroup( {items,onSelectItem}: ListGroupProps) {
  const [selectedIndex,setSelectedIndex] = useState(-1);

  return (
    <>
      <ul className="list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {items.map((item, index) => (
        <li className="col" key={item.id}>
          <Link
            to={`/game/${item.id}`}
            style={{textDecoration:"none", color:"inherit", display:"block", height:"100%"}}
          >
            <div 
              className="card h-100 shadow-sm game-card"
              style={{ 
                // Animate the border by having it always exist but hidden (transparent) until selected
                border: "4px solid",
                borderColor: selectedIndex === index ? "black" : "transparent",
                transition: "transform 0.2s ease-in-out, border-color 0.2s"
              }}
              onClick={() => {
                setSelectedIndex(index);
                onSelectItem(item, index);
              }}
            >
              <img src={item.thumbnail} className="card-img-top" alt={item.title} style={{ objectFit: "cover", aspectRatio: "16/9" }} />
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title m-0" style={{ fontFamily: "inherit", fontWeight: 700 }}>{item.title}</h5>
              </div>
            </div>
          </Link>
        </li>
      ))}
      </ul>
    </>
  );
}

export default ListGroup;
