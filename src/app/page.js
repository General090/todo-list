"use client";
import { useState } from "react";
import Link from "next/link";
import { addTodo } from "../utils/api"; // Import the mock API
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainPage = () => {
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState(null);

  const handleAddTodo = () => {

    if (newTodo.trim() === "") {
      
      toast.error("Todo cannot be empty");
      return;
    }

    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
    };

    addTodo(newTodoItem); // Add todo to the mock API
    setNewTodo("");
    toast("Todo Added, Check the todo store!");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-400">
      <div className="container  items-center justify-center w-[80%] md:w-[80%} lg:w-[50%] mx-auto p-6 bg-slate-900">
        <h1 className="text-3xl font-bold text-center mb-4">Add Todo</h1>
        {error && <p className="text-red-500">Error: {error}</p>}

        <ToastContainer />
        <div className=" flex flex-wrap gap-4 items-center justify-center">
          <input
            className="p-3 w-[90%]  text-black"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <div className="flex items-center justify-center gap-4 ">

            <button onClick={handleAddTodo} className="addTodo py-3 px-5 bg-green-700 text-white">
              Add Todo
            </button>
            <Link href="/todoStore" className="py-3 px-5 bg-blue-600 text-white">
              Go to Todo Store
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MainPage;
