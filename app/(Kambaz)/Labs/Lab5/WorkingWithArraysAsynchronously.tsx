"use client";
import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { FaTrash, FaPlusCircle, FaPencilAlt} from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  

  // ✅ Fetch all todos
  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };

  // ✅ Remove a todo with error handling
const removeTodo = async (todo: any) => {
  try {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
    setErrorMessage(null); // clear error if success
  } catch (error: any) {
    console.error(error);
    setErrorMessage(error.response?.data?.message || "Failed to delete todo.");
  }
};

// ✅ Update todo on server with error handling
const updateTodo = async (todo: any) => {
  try {
    await client.updateTodo(todo);
    setTodos(
      todos.map((t) => (t.id === todo.id ? { ...todo } : t))
    );
    setErrorMessage(null);
  } catch (error: any) {
    console.error(error);
    setErrorMessage(error.response?.data?.message || "Failed to update todo.");
  }
};


 

  // ✅ Create a new todo using GET
  const createNewTodo = async () => {
    const todos = await client.createNewTodo();
    setTodos(todos);
  };

  // ✅ Create a new todo using POST
  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos([...todos, newTodo]);
  };

  // ✅ Edit todo mode
  const editTodo = (todo: any) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  

  // ✅ Load on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
  <div
    id="wd-todo-error-message"
    className="alert alert-danger mb-2 mt-2"
    role="alert"
  >
    {errorMessage}
  </div>
)}

      <h4>
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
          title="Create via GET"
          style={{ cursor: "pointer" }}
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
          title="Create via POST"
          style={{ cursor: "pointer" }}
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            {/* 🗑️ Delete */}
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
              style={{ cursor: "pointer" }}
              title="Delete todo"
            />

            {/* ✏️ Edit */}
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
              style={{ cursor: "pointer" }}
              title="Edit todo"
            />

            {/* ✅ Checkbox */}
            <input
              type="checkbox"
              className="form-check-input me-2 float-start"
              checked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />

            {/* 📝 Editable title */}
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) =>
                  updateTodo({ ...todo, title: e.target.value })
                }
              />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
