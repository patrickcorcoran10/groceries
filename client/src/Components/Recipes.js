import React, { Component } from "react";
import ButtonM from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./Recipes.css";
import { Card, CardTitle, CardText } from "reactstrap";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipe: "",
      recipeIngredients: [],
      ingredient: "",
      searchTerm: "",
      searchTermArr: [],
      selectedRecipes: [],
    };
  }
  componentDidMount() {
    console.log("We are Mounted for Recipes");
    this.getRecipes();
  }
  async getRecipes() {
    const res = await fetch("/api/getRecipes");
    const data = await res.json();
    this.setState({
      recipes: data,
    });
  }

  handleSearchInput = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      searchTerm: e.target.value,
    });
  };
  async searchRecipes(e) {
    console.log("we will search: ", this.state.searchTerm);
    let term = this.state.searchTerm;
    if (term === "") {
      alert("Please Search for a Term");
    }
    const res = await fetch("/api/searchRecipes" + term);
    const data = await res.json();
    this.setState({
      searchTermArr: data,
    });
  }
  addRecipe = (e) => {
    console.log("we throw a modal here");
    this.props.history.push("/recipe-form");
  };

  deleteRecipe = (e) => {
    e.preventDefault();
    let id = e.currentTarget.id;
    console.log("We Delete this Recipe", id);
    fetch("/api/deleteRecipe/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.getRecipes();
      });
  };
  // handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     this.searchRecipes();
  //   }
  // };
  resetSearch = (e) => {
    e.preventDefault();
    console.log("we are resetting");
    window.location.reload();
  };
  selectRecipe = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    console.log(
      "We are selecting the Recipe for transfer to the Groceries Page",
      e.currentTarget.value
    );
  };

  render() {
    let searchedTerm = this.state.searchTermArr.map((el, index) => (
      <span key={el.id} value={el.id}>
        <Card body>
          <CardTitle>
            <h4>{el.recipeName}</h4>
          </CardTitle>
          <span className="button-width">
            <UncontrolledDropdown component="div">
              <DropdownToggle caret>Ingredients</DropdownToggle>
              <DropdownMenu disabled>
                <DropdownItem className="scrollable">
                  {JSON.parse(el.recipeIngredients).map((e, i) => (
                    <span key={i}>
                      {e}
                      <br />
                    </span>
                  ))}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </span>
          <br />
          <CardText>
            <span className="scrollable">{el.recipeInstructions}</span>
          </CardText>
        </Card>
      </span>
    ));

    let recipes = this.state.recipes.map((el, index) => (
      <div key={el.id}>
        <Card body>
          <CardTitle>
            <h4>{el.recipeName}</h4>
          </CardTitle>
          <span className="button-width">
            <UncontrolledDropdown component="div">
              <DropdownToggle caret>Ingredients</DropdownToggle>
              <DropdownMenu disabled>
                <DropdownItem className="scrollable">
                  {JSON.parse(el.recipeIngredients).map((e, i) => (
                    <span key={i}>
                      {e}
                      <br />
                    </span>
                  ))}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </span>
          <br />
          <CardText>
            <span className="scrollable">{el.recipeInstructions}</span>
          </CardText>
          <span className="button-area">
            <ButtonM
              size="medium"
              value={el.id}
              onClick={(this.selectRecipe = this.selectRecipe.bind(this))}
            >
              Select Recipe
            </ButtonM>

            <ButtonM
              size="medium"
              id={el.id}
              value={el.id}
              onClick={this.deleteRecipe.bind(this)}
            >
              Delete Recipe
            </ButtonM>
          </span>
        </Card>
      </div>
    ));
    return (
      <div>
        <div className="search-add-div">
          <p>Recipes</p>
          <ButtonM size="large" onClick={this.addRecipe.bind(this)}>
            Add Recipe
          </ButtonM>
          <form>
            <TextField
              // onKeyPress={this.searchRecipes.bind(this)}
              label="Search Recipes"
              id="outlined-size-normal"
              defaultValue=""
              variant="outlined"
              onChange={this.handleSearchInput.bind(this)}
            />
            <br />
            <ButtonM
              size="medium"
              type="reset"
              value="reset"
              onClick={this.searchRecipes.bind(this)}
            >
              Search
            </ButtonM>
            <ButtonM onClick={this.resetSearch.bind(this)}>
              Reset Search
            </ButtonM>
          </form>
        </div>
        <div id="searchCollected">{searchedTerm}</div>
        <br />

        <div>{recipes}</div>
      </div>
    );
  }
}
