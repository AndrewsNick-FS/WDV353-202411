const express = require("express");
const app = express();
const router = require("./routes/");

app.use(express.json());

`localhost:3000/`;
app.get("/", (req, res) => {
  res.status(200).send("Service is up");
});

`localhost:3000/api`;
app.use("/items", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
