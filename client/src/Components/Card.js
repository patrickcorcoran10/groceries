import React, { Component } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default class RecipeCard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("card parsed? ", this.props.ingredients);
    let parsedIngredients = this.props.ingredients.map((el, index) => (
      <span key={index}>{el}</span>
    ));
    return (
      <div>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recipe
            </Typography>
            <Typography variant="h5" component="h2">
              {this.props.recipe}
            </Typography>
            <Typography variant="body2" component="p">
              <br />
              {parsedIngredients}
              <br />
              <strong>Instructions</strong>
              <br />
              {this.props.instructions}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Check Ingredients</Button>
            <Button size="small" id={this.props.id} onClick={this.props.delete}>
              Delete Recipe
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
