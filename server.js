const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");

require("./routes/list-api-routes")(app);
require("./routes/recipe-api-routes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
let PORT = process.env.PORT || 3001;
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("We are Shopping on PORT", PORT);
  });
});
