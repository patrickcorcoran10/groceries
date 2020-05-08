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
      searchTerm: "",
      searchTermArr: [],
      selectedIngredients: [],
    };
  }
  componentDidMount() {
    this.getRecipes();
  }
  async getRecipes() {
    const res = await fetch("/api/getRecipes");
    const data = await res.json();
    this.setState({
      recipes: data,
    });
    console.log(this.state);
  }

  handleSearchInput = (e) => {
    e.preventDefault();
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
  async selectRecipe(e) {
    e.preventDefault();
    console.log(
      "We are selecting the Recipe for transfer to the Groceries Page",
      e.currentTarget.id.split(",")
    );
    let selectedIngredients = e.currentTarget.id.split(",");
    await this.setState({
      selectedIngredients: selectedIngredients,
    });
    console.log(
      "the state in interested in on the Recipe page",
      this.state.selectedIngredients
    );
    this.props.selectedRecipeIngredients(this.state.selectedIngredients);
    this.props.history.push("/");
  }

  render() {
    let searchedTerm = this.state.searchTermArr.map((el, index) => (
      <span key={el.id} value={el.id}>
        <Card body>
          <CardTitle>
            <h5>{el.recipeName}</h5>
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
            <h5>{el.recipeName}</h5>
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
              id={JSON.parse(el.recipeIngredients)}
              value={el.id}
              onClick={(this.selectRecipe = this.selectRecipe.bind(this))}
            >
              Select Recipe
            </ButtonM>

            <ButtonM
              size="medium"
              id={el.id}
              value={el.recipeIngredients}
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
