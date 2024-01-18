const con = require("../config/dbConfig");

const searchUser = (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists in the database
  const query = "SELECT * FROM user WHERE username = ?";
  con.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.send({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.send({ message: "User not found" });
    }

    const user = results[0];

    // Match the password
    if (password !== user.password) {
      return res.send({ message: "Invalid credentials" });
    }

    res.send({ message: "Login successful", user });
  });
};

module.exports = searchUser;
