import React, { useState } from "react";
import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";
import "./App.css";

// Redux Slice
const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return { payload: { id: nanoid(), text } };
      }
    },
    removeTodo(state, action) {
      return state.filter(todo => todo.id !== action.payload);
    }
  }
});
const { addTodo, removeTodo } = todoSlice.actions;

// Store
const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
});

function Todos() {
  const [text, setText] = useState("");
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <div>
        <input
          className="todo-input"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a todo"
        />
        <button
          className="todo-add-btn"
          onClick={() => {
            if (text) {
              dispatch(addTodo(text));
              setText("");
            }
          }}
        >
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Todos />
    </Provider>
  );
}

export default App;