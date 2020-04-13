const db = require("../models");
module.exports = function (app) {
  app.post("/api/add", (req, res) => {
    db.Lists.create({
      items: req.body.item,
    }).then((dbData) => {
      res.json(dbData);
    });
  });

  app.get("/api/get", (req, res) => {
    db.Lists.findAll({}).then((dbData) => {
      res.json(dbData);
    });
  });
  // DELETE Route for Deleted Players on Admin Page
  app.delete("/api/delete:id", (req, res) => {
    db.Drafts.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbData) => {
      res.json(dbData);
    });
  });
  app.put("/api/update:id", (req, res) => {
    db.Drafts.update(
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
};
