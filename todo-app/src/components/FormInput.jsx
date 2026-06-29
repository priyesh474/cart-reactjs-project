import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo, toggleStatus } from "../slice/todoSlice";

const FormInput = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("Incomplete");
  const [editingTaskId, setEditingTaskId] = useState(null); 
  const users = useSelector((state) => state.todolist);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (editingTaskId) {
        dispatch(editTodo({ id: editingTaskId, updatedTask: { task, status } }));
        setEditingTaskId(null); 
      } else {
        dispatch(addTodo({ task }));
      }
      setTask(""); 
      setStatus("Incomplete"); 
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id)); 
  };

  const handleEdit = (id) => {
    const taskToEdit = users.find((task) => task.id === id);
    setTask(taskToEdit.task);
    setStatus(taskToEdit.status);
    setEditingTaskId(id); 
  };

  const handleToggleStatus = (id) => {
    dispatch(toggleStatus(id)); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editingTaskId ? "Edit your Todo" : "Add your new Todo"}</h2>
        <div>
          <input
            type="text"
            placeholder="Enter your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Incomplete">Incomplete</option>
            <option value="Complete">Complete</option>
          </select>
          <button type="submit">{editingTaskId ? "Update" : "Add"}</button>
        </div>
      </form>
      <hr />
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Mark Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.task}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleToggleStatus(user.id)} className={user.status === "Complete" ? "mark-incomplete" : "mark-complete"}>
                  {user.status === "Complete" ? "Mark Incomplete" : "Mark Complete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormInput;
