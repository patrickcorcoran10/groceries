module.exports = function (sequelize, DataTypes) {
  const List = sequelize.define("Lists", {
    items: {
      type: DataTypes.STRING,
      //   allowNull: false,
      //   get() {
      //     return this.getDataValue("items").split(";");
      //   },
      //   set(val) {
      //     this.setDataValue("items", val.join(";"));
      //   },
    },
    checked: DataTypes.BOOLEAN,
  });
  return List;
};
