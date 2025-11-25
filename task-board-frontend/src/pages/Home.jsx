
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css"; // Make sure styling loads

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter tasks by status
  const todo = tasks.filter((t) => t.status === "TODO");
  const progress = tasks.filter((t) => t.status === "IN_PROGRESS");
  const complete = tasks.filter((t) => t.status === "COMPLETED");

  return (
    <div className="container d-flex flex-column align-items-center mt-4">

      {/* Title */}
      <h1 className="text-center mb-4 fw-bold">Task Board</h1>

      {/* Add Task Button */}
      <Link to="/add" className="btn btn-primary mb-4">
        + Add Task
      </Link>

      {/* Task Board */}
      <div className="board-container d-flex justify-content-center gap-4">

        <Column title="TODO" tasks={todo} />
        <Column title="IN PROGRESS" tasks={progress} />
        <Column title="COMPLETED" tasks={complete} />

      </div>
    </div>
  );
}

function Column({ title, tasks }) {
  return (
    // <div className="task-column shadow-lg rounded p-3 bg-white">
    <div className='containder'>
      <h4 className="text-center fw-bold mb-3">{title}</h4>

      {tasks.length === 0 ? (
        <p className="text-muted text-center">No tasks</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item mb-2">
            <Link to={`/task/${task.id}`} className="text-primary fw-semibold">
              {task.name}
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
