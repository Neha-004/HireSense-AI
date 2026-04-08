const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const users = [];

// Register
app.post("/register", (req, res) => {
  users.push(req.body);
  res.json({
    status: "success",
    message: "User registered"
  });
});

// Login
app.post("/login", (req, res) => {
  const user = users.find(u => u.email === req.body.email);

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "User not found"
    });
  }

  const token = jwt.sign({ email: user.email }, "secret");

  res.json({
    status: "success",
    token
  });
});

app.listen(3001, () => console.log("Auth service running on 3001"));