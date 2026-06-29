import { createSlice } from "@reduxjs/toolkit";

export const userList = [
  { id: "1", task: "first task", status: "Incomplete" },
  { id: "2", task: "second task", status: "Incomplete" },
];

export const todoSlice = createSlice({
  name: "todolist",
  initialState: userList,
  reducers: {
    addTodo: (state, action) => {
      const newTask = {
        id: (state.length + 1).toString(),
        task: action.payload.task,
        status: "Incomplete", 
      };
      state.push(newTask);
    },

    deleteTodo: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },

    editTodo: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskToEdit = state.find((task) => task.id === id);
      if (taskToEdit) {
        taskToEdit.task = updatedTask.task;
        taskToEdit.status = updatedTask.status; 
      }
    },

    toggleStatus: (state, action) => {
      const taskToToggle = state.find((task) => task.id === action.payload);
      if (taskToToggle) {
        taskToToggle.status = taskToToggle.status === "Incomplete" ? "Complete" : "Incomplete";
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo, toggleStatus } = todoSlice.actions;
export default todoSlice.reducer;
