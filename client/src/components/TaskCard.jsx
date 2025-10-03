import API from "../api/axios";

export default function TaskCard({ task, onTaskUpdated, onTaskDeleted, role }) {
  const updateStatus = async (newStatus) => {
    try {
      const res = await API.put(`/tasks/${task._id}`, { status: newStatus });
      onTaskUpdated(res.data);
    } catch (err) {
      alert("Error updating task");
    }
  };

  const deleteTask = async () => {
    try {
      await API.delete(`/tasks/${task._id}`);
      onTaskDeleted(task._id);
    } catch (err) {
      alert("Error deleting task");
    }
  };

  // Priority color mapping
  const priorityColor = {
    High: "bg-danger text-white",
    Medium: "bg-warning text-dark",
    Low: "bg-success text-white"
  };

  // Status color mapping
  const statusColor = {
    "To Do": "bg-secondary text-white",
    "In Progress": "bg-info text-white",
    Done: "bg-success text-white"
  };

  return (
    <div className="card shadow-sm rounded-4 border-0 mb-4 h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold mb-2">{task.title}</h5>
        <p className="card-text mb-2 text-muted">{task.description}</p>

        <div className="mb-2 d-flex flex-wrap gap-2">
          <span className={`badge ${statusColor[task.status] || "bg-secondary"}`}>
            {task.status}
          </span>
          <span className={`badge ${priorityColor[task.priority] || "bg-primary"}`}>
            {task.priority}
          </span>
          <span className="badge bg-light text-dark">
            Due: {task.dueDate?.substring(0, 10)}
          </span>
        </div>

        {/* Buttons role ke hisaab se */}
        <div className="mt-auto d-flex flex-wrap gap-2">
          {(role === "Admin" || role === "Manager" || role === "Employee") && (
            <>
              <button
                onClick={() => updateStatus("In Progress")}
                className="btn btn-sm btn-outline-warning flex-grow-1"
              >
                In Progress
              </button>
              <button
                onClick={() => updateStatus("Done")}
                className="btn btn-sm btn-outline-success flex-grow-1"
              >
                Done
              </button>
            </>
          )}
          {(role === "Admin" || role === "Manager") && (
            <button
              onClick={deleteTask}
              className="btn btn-sm btn-outline-danger flex-grow-1"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
