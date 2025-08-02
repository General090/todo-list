// TodoItem.jsx
export default function TodoItem({ todo }) {
  return (
    <li className="border-b py-2">
      <p className="text-lg text-white">{todo.title}</p>
      <p className={todo.completed ? 'text-green-500' : 'text-red-500'}>
        {todo.completed ? 'Completed' : 'Not Completed'}
      </p>
    </li>
  );
}
