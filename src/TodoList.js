import React, { Component } from "react";
// You can import both by using this syntax:
import TodoItems from "./TodoItems";
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    // add item event handler will get called when our form gets submitted
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {
    if (this._inputElement.value !== "") {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now()
        // This object contains both the entered text as well as a unique key value set by the current time (Date.now())
      };

      // Next, we are setting our state's items property with the following lines:
      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem)
          // we are ensuring our state object isn't modified. We are instead giving it an entirely new array made up of both the existing items data along with the newly entered data.
        };
      });
    }

    this._inputElement.value = "";
    // we are clearing the value of our input element to make room for the next todo item.

    console.log(this.state.items);

    e.preventDefault();
    // by default, when you submit a form, the page reloads and clears everything 
    // out and we don't want that. by calling preventDefault, we block the default behavior'.
  }

  deleteItem(key) {
    console.log("key in deleteItem: " + key);
    // console.log("Items at delete: " + this.state.items);

    var filteredItems = this.state.items.filter(function (item) {
      // passing the key from clicked item and we check this key against all current items via filtered method
      return (item.key !== key)
      // return any item not matching the key using the filter method. 
    });
    // This new filtereItems array contains everything except 
    // the item we are removing. This filtered ary is then set as our new items prop on our state obj
    this.setState({
        items: filteredItems
    });
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            {/* we listen for the submit event on the form iteself and we call addItem method when that event is overheard.
            ...aren't listening for any event on the btn itself. This is bc btn has type attribute set to submit below. */}
            <input
              ref={a => (this._inputElement = a)}
              // ref is an attribute on the element itself(since react puts a gate bt us and the DOM). Here we're storing a ref 
              // to our input elemnt in the aprrop named _inputElement prop...anywhere inside this comp we want to access our input element, we can do so by accessing _inputElement 
              placeholder="enter task"
            ></input>
            <button type="submit">add</button>
              {/* type attribute is set to submit and not listening for any event on btn itself */}
          </form>
        </div>
        <TodoItems entries={this.state.items} 
                   delete={this.deleteItem}/>
      </div>
    );
  }
}

export default TodoList;
