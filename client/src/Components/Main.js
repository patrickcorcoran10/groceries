import React, { Component } from "react";
import superagent from "superagent";
import "./Main.css";
import { Button, Input } from "reactstrap";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      listArray: [],
      checkedArray: [],
    };
  }
  async getLists() {
    console.log(this.state);
    const res = await fetch("/api/getList", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    const response = await fetch("/api/getChecked");
    const dataResponse = await response.json();
    function compare(a, b) {
      const itemsA = a.items.toUpperCase();
      const itemsB = b.items.toUpperCase();

      let comparison = 0;
      if (itemsA > itemsB) {
        comparison = 1;
      } else if (itemsA < itemsB) {
        comparison = -1;
      }
      return comparison;
    }
    data.sort(compare);
    dataResponse.sort(compare);

    this.setState({
      listArray: data.sort(),
      checkedArray: dataResponse.sort(),
    });
    console.log(this.state.listArray, this.state.checkedArray);
  }
  async componentDidMount() {
    this.getLists();
  }
  addItem = (e) => {
    // e.preventDefault();
    console.log("adding item: ", this.state.item);
    superagent
      .post("/api/add")
      .send({
        items: this.state.item.toLowerCase(),
        checked: false,
      })
      .end((err, res) => {
        console.log(res);
        this.setState({
          item: "",
        });
        // this.getLists();
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
    this.getLists();
  };
  handleCheck = (e) => {
    e.preventDefault();
    console.log("we are checking this item", e.target.value);
    let checkID = e.target.value;
    console.log(
      "check id ",
      checkID,
      "check id plus one: ",
      parseInt(checkID) + 1
    );
    fetch("/api/update" + checkID, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.getLists();
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
        this.getLists();
      });
  };

  handleUncheck = (e) => {
    e.preventDefault();
    console.log("we are unchecked");
    let uncheckID = e.target.value;
    fetch("/api/uncheck" + uncheckID, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.getLists();
      });
  };
  onKeyPress = (e) => {
    if (e.which === 13) {
      this.addItem();
    }
  };

  async deleteAll(e) {
    e.preventDefault();
    let toDelete = [];
    console.log("we delete all now", this.state.checkedArray);
    for (var i = 0; i < this.state.checkedArray.length; i++) {
      toDelete.push(this.state.checkedArray[i].id);
    }
    console.log(toDelete);

    for (var j = 0; j < toDelete.length; j++) {
      await fetch("/api/delete" + toDelete[j], {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    }
    this.getLists();
  }

  render() {
    let uncheckedStyle = { color: "green" };
    let list = this.state.listArray.map((el, index) => (
      <span key={index}>
        <h2 style={uncheckedStyle} draggable="true">
          {el.items}
        </h2>
        <Button
          color="info"
          value={el.id}
          onClick={(this.handleCheck = this.handleCheck.bind(this))}
        >
          Check
        </Button>
        {"                                      "}
        <Button
          color="danger"
          value={el.id}
          onClick={(this.handleDelete = this.handleDelete.bind(this))}
        >
          Delete
        </Button>
        <p>-----------------------------------</p>
      </span>
    ));
    let checkedStyle = { color: "red" };
    let checkedList = this.state.checkedArray.map((el, index) => (
      <span key={index}>
        <h2 style={checkedStyle}>{el.items}</h2>
        <Button
          color="info"
          value={el.id}
          onClick={(this.handleUncheck = this.handleUncheck.bind(this))}
        >
          Uncheck
        </Button>

        <p>-----------------------------------</p>
      </span>
    ));
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="fixed-input">
              <h4>Grocery List: {this.state.listArray.length} Items</h4>
              <Input
                id="input"
                bsSize="lg"
                autoFocus="autofocus"
                placeholder="Add item here"
                onChange={(this.handleChange = this.handleChange.bind(this))}
                onKeyPress={(this.onKeyPress = this.onKeyPress.bind(this))}
              />
              <br />
              <Button
                type="submit"
                onClick={(this.addItem = this.addItem.bind(this))}
                color="success"
                size="lg"
              >
                Add
              </Button>{" "}
              {"                                   "}
              <Button
                color="warning"
                size="lg"
                onClick={(this.reset = this.reset.bind(this))}
              >
                Refresh List
              </Button>
            </div>
            <div className="list-area">
              <h2>Left to Get:</h2>
              {list}
              <br />
              <h2>Already In the Cart:</h2>
              <Button
                color="danger"
                size="lg"
                onClick={(this.deleteAll = this.deleteAll.bind(this))}
              >
                Delete All
              </Button>
              <p>---------------------------------------</p>
              {checkedList}
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    );
  }
}
