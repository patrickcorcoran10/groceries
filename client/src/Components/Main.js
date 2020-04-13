import React, { Component } from "react";
import superagent from "superagent";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      listArray: [],
      checkedArray: [],
    };
  }
  async componentDidMount() {
    const res = await fetch("/api/getList");
    const data = await res.json();

    const response = await fetch("/api/getChecked");
    const dataResponse = await response.json();
    this.setState({
      listArray: data,
      checkedArray: dataResponse,
    });
    console.log(this.state.listArray, this.state.checkedArray);
  }
  addItem = (e) => {
    e.preventDefault();
    console.log("adding item: ", this.state.item);
    superagent
      .post("/api/add")
      .send({
        items: this.state.item,
        checked: false,
      })
      .end((err, res) => {
        console.log(res);
        window.location.reload();
      });
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
  handleCheck = (e) => {
    e.preventDefault();
    console.log("we are checking this item", e.target.value);
    let checkID = e.target.value;
    console.log("check id ", checkID);
    fetch("/api/update" + checkID, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  };
  handleDelete = (e) => {
    e.preventDefault();
    let deleteID = e.target.value;
    console.log(deleteID);
    fetch("/api/delete" + deleteID, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  };

  render() {
    let list = this.state.listArray.map((el, index) => (
      <span key={index}>
        <h2>{el.items}</h2>
        <button
          value={el.id}
          onClick={(this.handleCheck = this.handleCheck.bind(this))}
        >
          Checked
        </button>
        <button
          value={el.id}
          onClick={(this.handleDelete = this.handleDelete.bind(this))}
        >
          Delete
        </button>
        <p>-----------------------------------</p>
      </span>
    ));
    let checkedList = this.state.checkedArray.map((el, index) => (
      <span key={index}>
        <h2>{el.items}</h2>
        <button
          value={el.id}
          onClick={(this.handleCheck = this.handleCheck.bind(this))}
        >
          Checked
        </button>
        <button
          value={el.id}
          onClick={(this.handleDelete = this.handleDelete.bind(this))}
        >
          Delete
        </button>
        <p>-----------------------------------</p>
      </span>
    ));
    return (
      <div className="container">
        <h1>Grocery List</h1>
        <input
          placeholder="Add item here"
          onChange={(this.handleChange = this.handleChange.bind(this))}
        />
        <button onClick={(this.addItem = this.addItem.bind(this))}>Add</button>
        <button onClick={(this.reset = this.reset.bind(this))}>
          Refresh List
        </button>
        <h2>Left to Get:</h2>
        {list}
        <br />
        <h2>Already Got:</h2>
        {checkedList}
      </div>
    );
  }
}
