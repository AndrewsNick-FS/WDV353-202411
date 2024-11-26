const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://127.0.0.1:27017/cars";

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Connection error:", err));
