// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;
app.listen(port, (err) => {
  if (err) {
    console.log(`Error:${err}`);
  }
  console.log(`The server runing on localhost:${port} `);
});

// Callback function to complete GET '/all'

app.get("/getInformation", (req, res) => {
  res.send(projectData.newInformation);
  console.log(projectData);
});
// Post Route
app.post("/addInformation", (req, res) => {
  console.log("req.body", req.body);
  newInformation = {
    date: req.body.date,
    temp: req.body.temp,
    feelings: req.body.feelings,
  };

  Object.assign(projectData, newInformation);

  console.log(projectData);
  res.json(projectData);
});
