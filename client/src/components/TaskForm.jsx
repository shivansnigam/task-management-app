import { useState, useEffect } from "react";
import API from "../api/axios";

export default function TaskForm({ onTaskCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    assignedTo: ""
  });

  const [users, setUsers] = useState([]); 

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users"); 
        setUsers(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/tasks", form);
      onTaskCreated(res.data);
      setForm({ title: "", description: "", priority: "Medium", dueDate: "", assignedTo: "" });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error creating task");
    }
  };

  return (
    <div className="container-fluid px-2 px-md-5 my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg rounded-4 border-0">
            <div className="card-body p-4 p-md-5">
              <h4 className="card-title text-center fw-bold mb-4 text-primary">Create New Task</h4>

              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Task Title</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter task title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Enter description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="row g-3 mb-3">
                  {/* Priority */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Priority</label>
                    <select
                      className="form-select form-select-lg"
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>

                  {/* Due Date */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Due Date</label>
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      value={form.dueDate}
                      onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    />
                  </div>
                </div>

                {/* Assigned To */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Assign To</label>
                  <select
                    className="form-select form-select-lg"
                    value={form.assignedTo}
                    onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                    required
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name} ({user.role})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg fw-semibold shadow-sm"
                >
                  Create Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
