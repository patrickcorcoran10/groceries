module.exports = function (sequelize, DataTypes) {
  const List = sequelize.define("Lists", {
    items: {
      type: DataTypes.STRING,
    },
    checked: DataTypes.BOOLEAN,
  });
  return List;
};
