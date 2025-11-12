"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({ id: "1", title: "Task Title", description: "Sample Description",
  completed: false,});


  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      {/* ✅ Retrieve all todos */}
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      {/* ✅ Retrieve a todo by ID */}
      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        defaultValue={todo.id}
        className="w-50"
        type="number"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      {/* ✅ Filter todos by completed */}
      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-success me-2"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <a
        id="wd-retrieve-incomplete-todos"
        className="btn btn-warning"
        href={`${API}?completed=false`}
      >
        Get Incomplete Todos
      </a>
      <hr />

      {/* ✅ Create new todo */}
      <h4>Creating new Items in an Array</h4>
      <a
        id="wd-create-todo"
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr />

      <h3>Removing from an Array</h3>
<a
  id="wd-remove-todo"
  className="btn btn-danger float-end"
  href={`${API}/${todo.id}/delete`}
>
  Remove Todo with ID = {todo.id}
</a>
<FormControl
  defaultValue={todo.id}
  className="w-50"
  type="number"
  onChange={(e) => setTodo({ ...todo, id: e.target.value })}
/>
<hr />

 {/* ✅ Update todo */}
      <h3>Updating an Item in an Array</h3>
      <a
        id="wd-update-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Todo
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-25 float-start me-2"
        type="number"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        defaultValue={todo.title}
        className="w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <br />
      <hr />



      {/* ✅ Update description and completed */}
<h3>Updating Todo Description & Completion</h3>

{/* --- Update Description --- */}
<a
  id="wd-update-todo-description"
  className="btn btn-info float-end"
  href={`${API}/${todo.id}/description/${todo.description}`}
>
  Update Description
</a>
<FormControl
  placeholder="New description"
  defaultValue={todo.description}
  className="w-50"
  onChange={(e) => setTodo({ ...todo, description: e.target.value })}
/>
<hr />

{/* --- Update Completed --- */}
<a
  id="wd-update-todo-completed"
  className="btn btn-success float-end"
  href={`${API}/${todo.id}/completed/${todo.completed}`}
>
  Update Completed
</a>
<input
  type="checkbox"
  checked={todo.completed}
  className="form-check-input"
  onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
/>
<hr />









    </div>
  );
}
