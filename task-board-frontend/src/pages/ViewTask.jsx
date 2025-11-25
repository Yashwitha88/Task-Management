import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

function ViewTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tasks/${id}`)
      .then((res) => setTask(res.data))
      .catch((err) => console.error(err));
  }, [id]);

    const handleDelete = () => {
  axios
    .delete(`http://localhost:8080/api/tasks/${id}`)
    .then(() => navigate("/"))   // go home after delete
    .catch((err) => console.error(err));
};

  if (!task)
    return (
      <div className="container mt-5 text-center">
        <p>No task found for ID {id}</p>
      </div>
    );

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}> 
      <div className="card shadow p-4" style={{ width: "60%" }}>
        <h2 className="text-center mb-4">{task.name}</h2>

        <ul className="list-group mb-4">
          <li className="list-group-item">
            <strong>Description:</strong> {task.description}
          </li>
          <li className="list-group-item">
            <strong>Created By:</strong> {task.createdBy}
          </li>
          <li className="list-group-item">
            <strong>Created On:</strong> {task.createdOn}
          </li>
          <li className="list-group-item">
            <strong>Status:</strong> {task.status}
          </li>
          <li className="list-group-item">
            <strong>Priority:</strong> {task.priority}
          </li>
        </ul>

        {/* BUTTONS */}
        <div className="d-flex justify-content-between">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="btn btn-primary px-4"
          >
            Edit
          </button>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary px-4">
            Back
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
              Delete
        </button>
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
