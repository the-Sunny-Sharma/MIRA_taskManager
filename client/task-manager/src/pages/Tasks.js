import Navbar from "../components/Navbar";
import "../styles/Checkbox.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Tasks() {
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

  const handleAddTask = async () => {
    let task = prompt("New Task:");

    if (task == null || task === "") {
      alert("No task added.");
    } else {
      try {
        const data = {
          username: username,
          description: task,
          status: "pending",
          addedOn: new Date(),
        };
        const response = await axios.post(
          "http://localhost:9000/addTask",
          data
        );
        fetchTasks();
      } catch (error) {
        console.error("Error adding task:", error);
        alert("Error adding task. Please try again.");
      }
    }
  };

  const handleCheckboxChange = async (currentStatus, addedOn) => {
    try {
      const newStatus = currentStatus === "pending" ? "completed" : "pending";
      const container = {
        username: username,
        addedOn: addedOn,
        status: newStatus,
      };
      const response = await axios.put(
        `http://localhost:9000/updateTaskStatus`,
        container
      );
      // If the backend call is successful, update the state
      if (response.data) {
        console.log(`Status: ${currentStatus} to ${newStatus}`);
        // Fetch tasks again after updating the task status
        fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="page-wrapper">
          <Navbar data={{ title: "Tasks" }} />
          <div className="content-wrapper">
            <div className="add-task-box" onClick={() => handleAddTask()}>
              <span>add a task</span>
              <svg
                width="180px"
                height="180px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M9 12H15"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M12 9L12 15"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className="task-list">
              {tasks.map((task) => (
                <div key={task._id} className="task-data">
                  <div className="exp">
                    <div className="checkbox">
                      <div>
                        <input
                          type="checkbox"
                          id={`check${task._id}`}
                          name="check"
                          value=""
                          checked={task.status === "completed"}
                          onChange={() =>
                            handleCheckboxChange(task.status, task.addedOn)
                          }
                        />
                        <label htmlFor={`check${task._id}`} className="label ">
                          <span></span>
                          {task.description}
                        </label>
                      </div>
                    </div>
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
