import { useState } from "react";
import "./ListGroup.css";
import { type Game } from "../data/games";

//define shape of list group props
interface ListGroupProps{
  items: Game[];
  onSelectItem: (item: Game, index: number) => void;
}

function ListGroup( {items,onSelectItem}: ListGroupProps) {

const [selectedIndex,setSelectedIndex] = useState(-1);
//event handler

//to render data dynamically use curly braces
//use map to iterate over the array and return a list item for each item( like a for loop)


return (
  <>
    <ul className="list-unstyled row row-cols-3 g-4">
    {items.map((item, index) => (

    //Class names
    <li className="col" key={item.id}>
      <div 
        className={`game-box rounded d-flex justify-content-center align-items-center text-center h-100 p-3`}
        style={{ 
          aspectRatio: "3 / 2",
          // Animate the border by having it always exist but hidden (transparent) until selected
          border: "4px solid",
          borderColor: selectedIndex === index ? "black" : "transparent"
        }}
        
        //making the set selected index to know that the item is selected(giving it new index pressed)
        onClick={() => {
          setSelectedIndex(index);
          onSelectItem(item, index);
        }}
      >
        <span className="m-0" style={{ fontFamily: "inherit" }}>{item.title}</span>
      </div>
    </li>
    ))}
    </ul>
  </>
);

}

export default ListGroup;

