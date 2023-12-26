const express = require("express");
const app = express();
const zod = require("zod");
let noOfRequests = 0;

const validateInput = (req, res, next) => {
  const userEmail = req.body.email;
  const userPwd = req.body.password;
  const dataBody = req.body;
  console.log(dataBody);
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
  });

  if (schema.safeParse(dataBody).success) {
    next();
  } else {
    res.sendStatus(400);
  }
};

const calculateRequests = (req, res, next) => {
  noOfRequests++;
  console.log(noOfRequests);
  next();
};

app.use(express.json()); // Middleware to access the body from the request

app.post("/hits", calculateRequests, validateInput, (req, res) => {
  res.status(200).json({
    msg: "Data is Verified Succesfully",
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Successfully reached at get endpoint" });
});

// app.use((err, req, res, next) => {
//   res.json({
//     msg: "Sorry something is wrong with your server",
//     error: err,
//   });
// });
app.listen(5001);
