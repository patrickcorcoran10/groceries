import React, { Component } from "react";
import "./Card.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default class RecipeCard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const parsedIngredients = this.props.ingredients.map((el, index) => (
      <div key={index}>{el}</div>
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
            <Typography>
              <br />
              <UncontrolledDropdown component="div">
                <DropdownToggle caret>Ingredients</DropdownToggle>
                <DropdownMenu disabled>
                  <DropdownItem className="scrollable">
                    {parsedIngredients}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <br />
              <strong>Instructions</strong>
              <br />
              <div className="scrollable">{this.props.instructions}</div>
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Check Ingredients</Button> */}
            <Button size="small" id={this.props.id} onClick={this.props.delete}>
              Delete Recipe
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
