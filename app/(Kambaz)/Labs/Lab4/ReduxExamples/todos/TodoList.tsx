"use client";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div className="d-flex justify-content-center mt-4" id="wd-todo-list-redux">
      <div className="border rounded p-3 shadow-sm" style={{ width: "300px" }}>
        <h2 className="text-center mb-3">Todo List</h2>
        <ListGroup>
          <TodoForm />
          {todos.map((todo: any) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ListGroup>
        <hr />
      </div>
    </div>
  );
}
