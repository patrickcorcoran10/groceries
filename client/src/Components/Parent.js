import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./Main.js";
import Recipes from "./Recipes.js";
import Navbar from "./Navbar.js";
import Form from "./Form.js";

export default class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIngredients: [],
      listArray: [],
    };
  }
  selectRecipe(selectedIngredients) {
    this.setState({
      selectedIngredients: selectedIngredients,
    });
    console.log("Parent level state", this.state);
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Route
            exact
            path="/"
            render={(props) => (
              <Main
                {...props}
                selectedRecipeIngredients={this.state.selectedIngredients}
              />
            )}
          />
          <Route
            exact
            path="/recipes"
            render={(props) => (
              <Recipes
                {...props}
                selectedRecipeIngredients={this.selectRecipe.bind(this)}
              />
            )}
          />
          <Route exact path="/recipe-form" component={Form} />
        </Router>
      </div>
    );
  }
}
