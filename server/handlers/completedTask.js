const { MongoClient } = require("mongodb");

const completedTask = (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("taskManager");
  const coll = db.collection("tasks");
  const { username, status } = req.body;
  coll
    .find({ username: username, status: status })
    .toArray()
    .then((result) => {
      console.log("Result:", result); // Add this line to log the result

      if (result.length === 0) {
        return res.send({ message: "No Tasks" });
      }
      console.log(result);
      return res.send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    });
  // const url = "mongodb://0.0.0.0:27017";
  // const client = new MongoClient(url);
  // const db = client.db("taskManager");
  // const coll = db.collection("tasks");
  // coll
  //   .find({ username: username, status: "completed" })
  //   .toArray()
  //   .then((result) => {
  //     console.log("Result:", result); // Add this line to log the result
  //     if (result.length === 0) {
  //       return res.send({ message: "No completed tasks yet" });
  //     }
  //     return res.send(result);
  //   })
  //   .catch((error) => {
  //     res.send(error);
  //   });
};

module.exports = completedTask;
