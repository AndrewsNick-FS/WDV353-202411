const http = require("http");
require("dotenv").config();
const app = require("./Week1/app/app");

http.createServer().listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
});
