const { MongoClient } = require("mongodb");

const updateTaskStatus = (req, res) => {
  const { addedOn, username, status } = req.body;
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("taskManager");
  const coll = db.collection("tasks");

  coll
    .updateOne(
      { username: username, addedOn: addedOn },
      { $set: { status: status } }
    )
    .then((result) => {
      console.log(username);
      result.send("added");
    })
    .catch((error) => res.send(error));
};

module.exports = updateTaskStatus;
