import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: "",
    description: "",
    createdBy: "",
    status: "",
    priority: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tasks/${id}`)
      .then((res) => setTask(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .put(`http://localhost:8080/api/tasks/${id}`, task)
      .then(() => navigate("/"))  // 👉 Go back to Home Page
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
  axios
    .delete(`http://localhost:8080/api/tasks/${id}`)
    .then(() => navigate("/"))   // go home after delete
    .catch((err) => console.error(err));
};


  return (
    <div className="container d-flex justify-content-center align-items-center mx-auto" style={{ minHeight: "90vh" }}>
      <div className="card shadow p-4" style={{ width: "500px" }}>
        
        <h2 className="text-center mb-4">Edit Task</h2>

        <div className="mb-3">
          <label className="form-label">Task Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={task.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Created By</label>
          <input
            type="text"
            className="form-control"
            name="createdBy"
            value={task.createdBy}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            className="form-select"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

            <div className="d-flex justify-content-between mt-4">

    <button className="btn btn-success" onClick={handleSubmit}>
        Save
    </button>

    <button className="btn btn-danger" onClick={handleDelete}>
        Delete
    </button>

    <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Cancel
    </button>

    </div>


      </div>
    </div>
  );
}

export default EditTask;
