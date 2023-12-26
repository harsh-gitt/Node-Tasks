const express = require("express");
const app = express();

let noOfRequestsPerUser = {};

const rateLimiter = (req, res, next) => {
  const userId = req.headers["user-id"];
  if (!noOfRequestsPerUser[userId]) {
    noOfRequestsPerUser[userId] = 1;
    console.log(noOfRequestsPerUser);
  } else {
    noOfRequestsPerUser[userId]++;
    console.log(noOfRequestsPerUser);
  }

  setTimeout(() => {
    noOfRequestsPerUser[userId] = 0;
  }, 5000);

  if (noOfRequestsPerUser[userId] > 5) {
    res.status(404).json({
      msg: "Too many requests are not allowed in a sec",
    });
  }

  next();
};

app.use(rateLimiter);

app.get("/user", (req, res) => {
  res.status(200).json({
    name: "Dummy User",
  });
});

app.post("/user", (req, res) => {
  res.status(200).json({
    name: "Dummy User",
  });
});

app.listen(420);
