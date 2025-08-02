// api.js
export const getTodos = () => {
  try {
    const todos = JSON.parse(localStorage.getItem('todos'));
    return Array.isArray(todos) ? todos : [];
  } catch (error) {
    console.error('Error parsing todos from localStorage', error);
    return [];
  }
};

export const addTodo = (todo) => {
  try {
    const todos = getTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Error adding todo to localStorage', error);
  }
};

export const deleteTodo = (todoId) => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const updatedTodos = todos.filter(todo => todo.id !== todoId);
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
};
