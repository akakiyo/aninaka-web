const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
// // parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes"));

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(400).send({
    message: err.message,
  });
};

app.use(errorHandler);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}.`);
});
