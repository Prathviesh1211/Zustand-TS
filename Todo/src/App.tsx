import React, { useState } from "react";
import { todoStore } from "./store/TodoStore";

let idCounter = 1;

const App = () => {
  const [todo, setTodo] = useState("");
  const todoState = todoStore();
  const generateUniqueId = (): number => {
    return idCounter++;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.length > 0) {
      todoState.addTodo({
        id: generateUniqueId(),
        todo: todo,
        isDone: false,
      });
      setTodo("");
    }
  };

  return (
    <div className="h-screen bg-gray-100  dark:bg-zinc-900 w-screen flex items-center justify-center">
      <div className="w-[600px] shadow-md rounded-md p-2 bg-slate-200 dark:bg-zinc-700 text-black dark:text-slate-300">
        <h1 className=" m-5 text-3xl font-bold mb-0.5">Todos</h1>
        <p className="mx-5">Add your daily tasks</p>
        <form onSubmit={handleSubmit}>
          <div className="m-5 flex gap-2">
            <input
              type="text"
              className="flex-1 outline-blue-500 bg-transparent h-10 p-2 border border-blue-400 rounded-lg"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Enter your todo"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              type="submit"
            >
              Add Todo
            </button>
          </div>
        </form>
        <div className="mt-5">
          {todoState.todos.length > 0 &&
            todoState.todos.map((todo) => (
              <div className="w-ful m-3 flex justify-between items-center rounded-lg  p-2 border border-blue-600">
                <h1 className={`${todo.isDone ? "line-through" : ""}`}>
                  {todo.todo}
                </h1>
                <div className="flex items-center">
                  <input
                  type="checkbox"
                  onChange={(e) =>
                    todoState.toggleTodo(todo.id, e.target.checked)
                  }
                  checked={todo.isDone}
                />
                <button className="ml-3" onClick={()=>{todoState.deleteTodo(todo.id)}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash-icon lucide-trash"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
