module.exports = function (sequelize, DataTypes) {
  const List = sequelize.define("Lists", {
    items: {
      type: DataTypes.STRING,
      notEmpty: true,
      unique: true,
    },
    checked: DataTypes.BOOLEAN,
  });
  return List;
};
