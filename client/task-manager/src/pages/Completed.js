import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Completed() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser || "");

    // Fetch tasks only if the username is available
    if (storedUser) {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:9000/allTask", {
        params: { username },
      });
      const sortedTasks = response.data.sort(
        (a, b) => new Date(b.addedOn) - new Date(a.addedOn)
      );
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [username]);

  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <>
      <div className="main-container">
        <div className="page-wrapper">
          <Navbar data={{ title: "Completed" }} />
          <div className="content-wrapper">
            <div className="completed-task-list">
              {completedTasks.map((task) => (
                <div key={task._id} className="task-data">
                  <div className="exp">
                    <label className="label">{task.description}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
