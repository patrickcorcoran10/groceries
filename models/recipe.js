module.exports = function (sequelize, DataTypes) {
  let Recipe = sequelize.define("Recipes", {
    recipeName: DataTypes.STRING,
    recipeIngredients: DataTypes.TEXT,
    recipeInstructions: DataTypes.TEXT,
  });
  return Recipe;
};
