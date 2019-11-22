import React, { Component } from "react";
import FlipMove from "react-flip-move"

class TodoItems extends Component {
  constructor(props) {
    super(props);

    this.createTasks = this.createTasks.bind(this);
  }
  createTasks(item) {
    return <li onClick={() => this.delete(item.key)} 
      /* listening to the click event and associating it w an event
        handler called delete. () => allows both to maintain the default event arg and pass
        in our own args. */
        key={item.key}>{item.text}</li>
  }

  delete(key) {
    // console.log("Key is:" +key);
    this.props.delete(key);
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
    // taking list of todo items (passed in as entries) and turning
    // them into JSX/HTML-ish elements by calling map on our items
    // and relying on the createTasks function

    return (
      <ul className="theList">
        <FlipMove duration={250} easing="ease-out">
          {listItems}
        </FlipMove>  
      </ul>
    );  
  }
}

export default TodoItems;
//to be understood by the bundler
