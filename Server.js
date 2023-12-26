const express = require("express");

const app = express();

app.use(express.json());

let users = [
  {
    name: "Harshdeep",
    city: "Patiala",
    age: 28,
  },
];
app.get("/", (req, res) => {
  const details = {
    ...users,
  };
  res.json(details);
});

app.get("/file/:data", (req, res) => {
  const data = req.params.data;
  const details = {
    ...users,
  };
  res.json(data);
});

app.post("/", (req, res) => {
  const userName = req.body.name;
  const userCity = req.body.city;
  if (userName && userCity) {
    users.push({
      name: userName,
      city: userCity,
    });
  }

  res.send({
    msg: "User Updated Successfully",
  });
});

app.listen(3000);
