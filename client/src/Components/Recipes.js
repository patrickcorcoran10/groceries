import React, { Component } from "react";
import RecipeCard2 from "./Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./Recipes.css";

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
    console.log(data);
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
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.searchRecipes();
    }
  };
  resetSearch = (e) => {
    e.preventDefaul();
    console.log("we are resetting");
    window.location.reload();
  };

  render() {
    let searchedTerm = this.state.searchTermArr.map((el, index) => (
      <span key={el.id}>
        <RecipeCard2
          id={el.id}
          recipe={el.recipeName}
          ingredients={JSON.parse(el.recipeIngredients)}
          instructions={el.recipeInstructions}
          delete={this.deleteRecipe.bind(this)}
        />
      </span>
    ));
    let recipes = this.state.recipes.map((el, index) => (
      <span key={el.id}>
        <RecipeCard2
          id={el.id}
          recipe={el.recipeName}
          ingredients={JSON.parse(el.recipeIngredients)}
          instructions={el.recipeInstructions}
          delete={this.deleteRecipe.bind(this)}
        />
      </span>
    ));
    return (
      <div>
        <div className="search-add-div">
          <p>Recipes</p>
          <Button size="large" onClick={this.addRecipe.bind(this)}>
            Add Recipe
          </Button>
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
            <Button
              size="medium"
              type="reset"
              value="reset"
              onClick={this.searchRecipes.bind(this)}
            >
              Search
            </Button>
            <Button onClick={this.resetSearch.bind(this)}>Reset Search</Button>
          </form>
        </div>
        <div id="searchCollected">{searchedTerm}</div>
        <br />

        <div>{recipes}</div>
      </div>
    );
  }
}
