const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const { MongoClient } = require("mongodb");

const con = require("./config/dbConfig");

const getAllUsers = require("./handlers/getAllUsers");
const registerUser = require("./handlers/registerUser");
const searchUser = require("./handlers/searchUser");
const newTask = require("./handlers/newTask");
const allTask = require("./handlers/allTask");
const impTask = require("./handlers/impTask");
const completeTask = require("./handlers/completedTask");
const updateTaskStatus = require("./handlers/updateTaskStatus");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 9000;

//Routes...
// Route for checking email availability
app.post("/checkEmail", (req, res) => {
  const { email } = req.body;

  con.query("SELECT * FROM `user` WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log("Error checking email:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length > 0) {
      return res.json({ available: false });
    } else {
      return res.json({ available: true });
    }
  });
});

// Route for checking username availability
app.post("/checkUsername", (req, res) => {
  const { username } = req.body;

  con.query(
    "SELECT * FROM `user` WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log("Error checking username:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        return res.json({ available: false });
      } else {
        return res.json({ available: true });
      }
    }
  );
});
app.post("/signup", registerUser);
app.get("/allUsers", getAllUsers);
app.post("/signin", searchUser);

app.post("/addTask", newTask);
app.get("/allTask", allTask);
app.get("/impTask", impTask);
app.get("/completeTask", completeTask);
app.put("/updateTaskStatus", updateTaskStatus);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
