const db = require("../models");
module.exports = function (app) {
  // Groceries List Routes
  app.post("/api/add", (req, res) => {
    db.Lists.create({
      items: req.body.items,
      checked: false,
    }).then((dbData) => {
      res.json(dbData);
    });
  });

  app.get("/api/getList", (req, res) => {
    db.Lists.findAll({
      where: {
        checked: false,
      },
    }).then((dbData) => {
      res.json(dbData);
    });
  });
  app.get("/api/getChecked", (req, res) => {
    db.Lists.findAll({
      where: {
        checked: true,
      },
    }).then((dbData) => {
      res.json(dbData);
    });
  });
  // DELETE Route for Deleted Players on Admin Page
  app.delete("/api/delete:id", (req, res) => {
    db.Lists.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbData) => {
      res.json(dbData);
    });
  });
  // Delete All Route
  app.put("/api/update:id", (req, res) => {
    db.Lists.update(
      {
        checked: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((dbData) => {
      res.json(dbData);
    });
  });
  app.put("/api/uncheck:id", (req, res) => {
    db.Lists.update(
      {
        checked: false,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((dbData) => {
      res.json(dbData);
    });
  });
};
