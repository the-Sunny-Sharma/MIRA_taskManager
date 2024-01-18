const con = require("../config/dbConfig");

const getAllUsers = (req, res) => {
  let sql = "SELECT * FROM user";
  con.query(sql, (err, result) => {
    if (err) {
      console.log("Err :" + err);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(result);
      return res.status(200).json(result);
    }
  });
};

module.exports = getAllUsers;
