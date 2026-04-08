const express = require("express");
const app = express();

app.use(express.json());

let users = [];

// Add user
app.post("/add", (req, res) => {
  users.push(req.body);

  res.json({
    status: "success",
    data: users
  });
});

// Get users
app.get("/", (req, res) => {
  res.json({
    status: "success",
    data: users
  });
});

app.listen(3002, () => console.log("User service running on 3002"));