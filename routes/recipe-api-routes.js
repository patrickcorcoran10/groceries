const db = require("../models");
module.exports = function (app) {
  // Recipes List
  app.get("/api/getRecipes", (req, res) => {
    db.Recipes.findAll({}).then((dbData) => {
      res.json(dbData);
    });
  });
  app.get("/api/searchRecipes:recipeName", (req, res) => {
    db.Recipes.findAll({
      where: {
        recipeName: req.params.recipeName,
      },
    }).then((dbData) => {
      res.json(dbData);
    });
  });

  app.post("/api/addRecipe", (req, res) => {
    db.Recipes.create({
      recipeName: req.body.recipeName,
      recipeIngredients: req.body.recipeIngredients,
      recipeInstructions: req.body.recipeInstructions,
    }).then((dbData) => {
      res.json(dbData);
    });
  });
  app.delete("/api/deleteRecipe/:id", (req, res) => {
    db.Recipes.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbData) => {
      res.json(dbData);
    });
  });
};
