import React, { Component } from "react";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
    };
  }
  addItem = (e) => {
    e.preventDefault();
    console.log("adding item: ", this.state.item);
  };
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      item: e.target.value,
    });
  };
  reset = (e) => {
    e.preventDefault();
    console.log("we are reseting");
    window.location.reload();
  };

  render() {
    return (
      <div className="container">
        <p>Grocery List</p>
        <input
          placeholder="Add item here"
          onChange={(this.handleChange = this.handleChange.bind(this))}
        />
        <button onClick={(this.addItem = this.addItem.bind(this))}>Add</button>
        <button onClick={(this.reset = this.reset.bind(this))}>
          Refresh List
        </button>
      </div>
    );
  }
}
