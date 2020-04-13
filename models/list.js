module.exports = function (sequelize, DataTypes) {
  const List = sequelize.define("Lists", {
    items: DataTypes.STRING,
    checked: DataTypes.BOOLEAN,
  });
  return List;
};
