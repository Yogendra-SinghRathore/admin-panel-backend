const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Read db.json
const getData = () => {
  const data = fs.readFileSync("db.json");
  return JSON.parse(data);
};

// GET all users
app.get("/users", (req, res) => {
  const data = getData();
  res.json(data.users);
});

// Root route
app.get("/", (req, res) => {
  res.send("Admin Backend API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});