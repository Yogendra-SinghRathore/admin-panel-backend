const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const DB_FILE = "db.json";

// Read DB
const getData = () => {
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data);
};

// Write DB
const saveData = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};



// =====================
// GET ALL USERS
// =====================
app.get("/users", (req, res) => {
  const data = getData();
  res.json(data.users);
});



// =====================
// GET SINGLE USER
// =====================
app.get("/users/:id", (req, res) => {
  const data = getData();
  const user = data.users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});



// =====================
// CREATE USER
// =====================
app.post("/users", (req, res) => {
  const data = getData();

  const newUser = {
    id: Date.now(),
    ...req.body
  };

  data.users.push(newUser);
  saveData(data);

  res.status(201).json(newUser);
});



// =====================
// UPDATE USER
// =====================
app.put("/users/:id", (req, res) => {
  const data = getData();

  const index = data.users.findIndex(u => u.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  data.users[index] = {
    ...data.users[index],
    ...req.body
  };

  saveData(data);

  res.json(data.users[index]);
});



// =====================
// DELETE USER
// =====================
app.delete("/users/:id", (req, res) => {
  const data = getData();

  const filteredUsers = data.users.filter(u => u.id != req.params.id);

  data.users = filteredUsers;
  saveData(data);

  res.json({ message: "User deleted successfully" });
});



app.get("/", (req, res) => {
  res.send("Admin Backend API is running 🚀");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});