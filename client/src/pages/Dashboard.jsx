import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // <-- add this
import API from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const handleTaskCreated = (task) => setTasks([...tasks, task]);
  const handleTaskUpdated = (updated) =>
    setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
  const handleTaskDeleted = (id) => setTasks(tasks.filter((t) => t._id !== id));

  return (
    <div
      className="container-fluid p-4"
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        width: "100vw",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h1 className="h3 fw-bold text-primary">Task Dashboard</h1>
        <button onClick={logout} className="btn btn-outline-danger mt-2 mt-md-0">
          Logout
        </button>
      </div>

      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => navigate("/kanban")} 
      >
        Open Kanban Board
      </button>

      {/* Task Form */}
      {(user?.role === "Admin" || user?.role === "Manager") && (
        <div className="mb-4 w-100">
          <div className="card shadow-sm w-100">
            <div className="card-body">
              <h5 className="card-title fw-bold text-secondary mb-3">Create a New Task</h5>
              <TaskForm onTaskCreated={handleTaskCreated} />
            </div>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="row g-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="col-12 col-md-6 col-lg-4">
              <TaskCard
                task={task}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
                role={user?.role}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            <p className="text-muted fs-5">
              No tasks available.{" "}
              {user?.role !== "Employee" && "Create one using the form above!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
