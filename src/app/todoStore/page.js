"use client";
import React, { useState, useEffect } from 'react';
import TodoItem from '../../../components/TaskItem';
import { getTodos, addTodo, deleteTodo } from '@/utils/api';
import Link from 'next/link';


const TodoStore = () => {
  const [todos, setTodos] = useState([]);
  const [externalTodos, setExternalTodos] = useState([]);
  const [errors, setErrors] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  // Function to handle deletion of a todo
  const handleDelete = (todoId) => {
    deleteTodo(todoId);
    setTodos(getTodos());
  };

  // Function to handle editing of a todo
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setNewTitle(todo.title);
  };

  // Function to save the edited todo
  const handleSaveEdit = () => {
    if (!editingTodo) return;

    const updatedTodos = todos.map(todo =>
      todo.id === editingTodo.id
        ? { ...todo, title: newTitle }
        : todo
    );

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
    setEditingTodo(null);
    setNewTitle("");
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditingTodo(null);
    setNewTitle("");
  };

  // Function to toggle the completed status of a todo
  const handleToggleCompleted = (todoId) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const fetchExternalTodos = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        // alert('data fetched succesfully')
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setExternalTodos(data);
      } catch (error) {
        setErrors(error.message);
        console.error(error);
      }
    };

    fetchExternalTodos();
    setTodos(getTodos());
  }, []);

  const allTodos = [...todos, ...externalTodos];

  return (
    <div className="container mx-auto p-4">
      <div>
      <h1 className="text-3xl font-bold mb-4 text-center">Todo Store</h1>

      <div className='my-4'>
      <Link href="./"><button className='bg-green-600 p-3 '>Go Back to Add Todo</button></Link>
      </div>
      </div>
      {errors && <p className="text-red-500 text-center">Error: {errors}</p>}
      <div className="grid grid-cols-4 gap-4 justify-center">
        {allTodos.map((todo) => (
          <div key={todo.id} className="w-full col-span-4 md:col-span-2 lg:col-span-1 p-2">
            <div className={`border p-4 rounded-lg shadow-md flex flex-col gap-2 ${todo.completed ? 'bg-green-200' : 'bg-slate-500'}`}>
              <TodoItem todo={todo} />
              <div className="flex gap-2">
                {editingTodo && editingTodo.id === todo.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="p-2 border border-gray-300 text-black rounded-md"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className=" flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleCompleted(todo.id)}
                      className={`py-2 px-4 ${todo.completed ? 'bg-gray-600' : 'bg-green-600'} text-white rounded-md hover:bg-gray-500 transition-colors`}
                    >
                      {todo.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="py-2 px-4 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoStore;
