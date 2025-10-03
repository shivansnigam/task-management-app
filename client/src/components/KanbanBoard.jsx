import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { AuthContext } from "../contexts/AuthContext";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  // tasks ko status ke hisaab se group karna
  const columns = {
    "To Do": tasks.filter((t) => t.status === "To Do"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    "Done": tasks.filter((t) => t.status === "Done"),
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // same column me drag hua toh kuch nahi karna
    if (source.droppableId === destination.droppableId) return;

    // dragged task id
    const draggedTask = columns[source.droppableId][source.index];

    try {
      // backend me update
      const res = await API.put(`/tasks/${draggedTask._id}`, {
        status: destination.droppableId,
      });

      // frontend me update
      setTasks((prev) =>
        prev.map((t) => (t._id === draggedTask._id ? res.data : t))
      );
    } catch (err) {
      alert("Error updating task");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4">
        {Object.keys(columns).map((colKey) => (
          <Droppable key={colKey} droppableId={colKey}>
            {(provided) => (
              <div
                className="flex-1 p-2 border rounded bg-gray-50"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="text-lg font-bold mb-2">{colKey}</h2>
                {columns[colKey].map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="bg-white border p-2 mb-2 rounded shadow-sm"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h3 className="font-bold">{task.title}</h3>
                        <p>{task.description}</p>
                        <p className="text-sm">Priority: {task.priority}</p>
                        <p className="text-sm">
                          Due: {task.dueDate?.substring(0, 10)}
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
