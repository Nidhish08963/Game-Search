import { useState } from "react";
//define shape of list group props
interface ListGroupProps{
  items: string[];
  heading:string;

  onSelectItem: (item: string) => void;
}

function ListGroup( {items, heading,onSelectItem}: ListGroupProps) {

const [selectedIndex,setSelectedIndex] = useState(-1);
const message = items.length === 0 && <p>No item found</p>;
//event handler

//to render data dynamically use curly braces
//use map to iterate over the array and return a list item for each item( like a for loop)
//there are no for loops in jsx

return (
  <>
    <h1>{heading}</h1>
    {message}

    <ul className="list-group">
    {items.map((item, index) => (

    //Class names
    <li className = {selectedIndex === index ? "list-group-item active" : "list-group-item"}

    //key is to identify each item uniquely
    key = {item}

    //making the set selected index to know that the item is selected(giving it new index pressed)
    onClick = {() => 
    {setSelectedIndex(index);
    onSelectItem(item);
    }}

    //how it will be displayed
    >
    {item}
    </li>
    ))}
    </ul>
  </>
);

}

export default ListGroup;

