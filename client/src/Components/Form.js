import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import "./Form.css";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: "",
      ingredient: "",
      recipeIngredients: [],
      recipeInstructions: "",
    };
  }
  handleRecipeName = (e) => {
    this.setState({
      recipeName: e.target.value,
    });
  };
  handleIngredients = (e) => {
    this.setState({
      ingredient: e.target.value,
    });
  };
  handleInstructions = (e) => {
    this.setState({
      recipeInstructions: e.currentTarget.value,
    });
  };
  addIngredient = (e) => {
    console.log("adding ingredient");

    this.state.recipeIngredients.push(this.state.ingredient);
    console.log(this.state);
  };
  //   onKeyPress = (e) => {
  //     if (e.which === 13) {
  //       this.addIngredient();
  //     }
  //   };
  submit = (e) => {
    e.preventDefault();
    console.log("we are submitting here");
    const data = {
      recipeName: this.state.recipeName,
      recipeIngredients: JSON.stringify(this.state.recipeIngredients),
      recipeInstructions: this.state.recipeInstructions,
    };
    fetch("/api/addRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.props.history.push("/recipes");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  render() {
    return (
      <div>
        <h3>Recipe Form</h3>
        <div className="div">
          <TextField
            onChange={this.handleRecipeName.bind(this)}
            id="outlined-basic"
            label="Recipe Name"
            variant="outlined"
          />
        </div>
        <br />
        <div className="div">
          <form>
            <TextField
              onChange={this.handleIngredients.bind(this)}
              id="ingredients"
              label="Ingredients "
              variant="outlined"
            />
            <br />
            <Button
              size="large"
              onClick={this.addIngredient.bind(this)}
              type="reset"
              value="reset"
            >
              Add
            </Button>
          </form>
        </div>
        <br />
        <div className="div">
          <TextField
            onChange={this.handleInstructions.bind(this)}
            id="recipe-instructions"
            label="Recipe Instructions"
            multiline
            rows={9}
            defaultValue=""
            variant="outlined"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={this.submit.bind(this)}
        >
          Save
        </Button>
      </div>
    );
  }
}
