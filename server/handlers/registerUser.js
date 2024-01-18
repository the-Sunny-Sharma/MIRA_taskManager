const con = require("../config/dbConfig");

const registerUser = (req, res) => {
  const { email, username, password } = req.body;

  console.log("email " + email);
  // Validate required fields
  if (!email || !username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check for existing email
  con.query(
    "SELECT * FROM `user` WHERE email = ?",
    [email],
    (err, emailResult) => {
      if (err) {
        console.log("Error checking for existing email:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (emailResult.length > 0) {
        return res.status(400).json({ error: "Email is already in use." });
      }

      // Check for existing username
      con.query(
        "SELECT * FROM `user` WHERE username = ?",
        [username],
        (err, usernameResult) => {
          if (err) {
            console.log("Error checking for existing username:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (usernameResult.length > 0) {
            return res
              .status(400)
              .json({ error: "Username is already taken." });
          }

          // Proceed with registration if both email and username are unique
          let data = [email, username, password];
          let sql =
            "INSERT INTO `user` (email, username, password) VALUES (?, ?, ?)";

          con.query(sql, data, (err, result) => {
            if (err) {
              console.log("Error inserting user:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            } else {
              console.log("Inserted successfully");
              return res.status(201).json(result);
            }
          });
        }
      );
    }
  );
};

module.exports = registerUser;
