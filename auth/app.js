const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.get("/", (req, res, next) => {
  res.send(`<h1>Hello</h1>`);
});

app.use("/api/", authRoutes);
app.use("/api/", taskRoutes);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

module.exports = app;
