const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 3000;
const db = process.env.DB;
mongoose.connect(db).then(() => console.log("Connected!"));

app.listen(port, () =>
  console.log(`App is listening on port http://localhost:${port}`)
);
