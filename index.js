const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
// const path = require("path");

// const Logger = require("./logger");

const app = express();
// const logger = Logger(path.basename(__filename));
// const port = 3000;

let corsOptions = {
  origin: "*",
};
app.use(cors({ options: corsOptions }));

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); //application/x-www-form-urlencoded

app.get("/", (req, res) => {
  logger.info(`Resquest made`);
  console.log(req.params)
  res.json(req.headers);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server listening at http://localhost:${PORT}`);
});
