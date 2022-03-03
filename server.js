// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  let date = new Date();
  let getUnix = date.valueOf();
  let getUtc = date.toUTCString();

  res.json({ unix: getUnix, utc: getUtc });
});

app.get("/api/:date_string", (req, res) => {
  let responseObject = {};
  let dateString = req.params.date_string;
  let timeStamp;
  let timeStampUnix;
  let timeStampUTC;
  let isNum = /^\d+$/.test(dateString);

  if (isNum) {
    timeStamp = new Date(parseInt(dateString));
    timeStampUnix = timeStamp.valueOf();
    timeStampUTC = timeStamp.toUTCString();
  } else {
    timeStamp = new Date(dateString);
    timeStampUnix = timeStamp.valueOf();
    timeStampUTC = timeStamp.toUTCString();
  }

  if (timeStampUTC == "Invalid Date") {
    responseObject["error"] = "Invalid Date";
    res.json(responseObject);
  } else {
    responseObject["unix"] = timeStampUnix;
    responseObject["utc"] = timeStampUTC;
    res.json(responseObject);
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
