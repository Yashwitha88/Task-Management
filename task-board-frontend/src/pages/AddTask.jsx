import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/tasks", {
        name,
        description,
        createdBy,
        status: "TODO",
        priority,
      })
      .then(() => {
        alert("Task added successfully!");

        // Clear all inputs
        setName("");
        setDescription("");
        setPriority("");
        setCreatedBy("");

        navigate("/"); // redirect to home
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container d-flex justify-content-center mt-4 mx-auto">
    {/* <div className='containder'> */}
    

      <div className="card p-4 shadow" style={{ width: "500px" }}>
        <h3 className="text-center mb-4">Add New Task</h3>

        <form onSubmit={handleSubmit}>

          {/* Task Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Task Name</label>
            <input
              className="form-control form-control-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control"
              rows="4"                     // bigger text area
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Priority */}
          <div className="mb-3">
            <label className="form-label fw-bold">Priority</label>
            <input
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            />
          </div>

          {/* Created By */}
          <div className="mb-3">
            <label className="form-label fw-bold">Created By</label>
            <input
              className="form-control"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-success px-4">
              Add Task
            </button>

            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
