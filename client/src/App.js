import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./Components/Main.js";
import Recipes from "./Components/Recipes.js";
import Navbar from "./Components/Navbar.js";
import Form from "./Components/Form.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" component={Main} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/recipe-form" component={Form} />
      </Router>
    </div>
  );
}

export default App;
