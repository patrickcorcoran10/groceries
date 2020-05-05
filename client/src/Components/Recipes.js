import React, { Component } from "react";
import RecipeCard2 from "./Card";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import RecipeModal from "./RecipeModal";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipe: "",
      recipeIngredients: [],
      ingredient: "",
      // modalOpen: false,
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

  handleInput = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      recipe: e.target.value,
    });
  };
  addRecipe = (e) => {
    console.log("we throw a modal here");
    this.props.history.push("/recipe-form");
  };
  handleSearch = (e) => {
    console.log("We search");
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

  render() {
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
        <p>Recipes</p>
        <p>Search</p>
        {/* <TextField
          label="Add Recipe"
          id="outlined-size-normal"
          defaultValue=""
          variant="outlined"
          onChange={this.handleInput.bind(this)}
        />
        <br /> */}
        <Button size="medium" onClick={this.addRecipe.bind(this)}>
          Add Recipe
        </Button>
        {/* <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          // className={classes.modal}
          // open={open}
          // onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        > */}
        {/* <Fade>
            <div>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">
                react-transition-group animates me.
              </p>
            </div>
          </Fade>
        </Modal> */}
        {/* <input
          onChange={(this.handleSearch = this.handleSearch.bind(this))}
          placeholder="Search Recipe"
        /> */}
        <br />
        {/* <button onClick={(this.addRecipe = this.addRecipe.bind(this))}>
          Add Recipe
        </button> */}
        <div>{recipes}</div>
      </div>
    );
  }
}
