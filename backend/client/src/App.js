import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchTodos = async (uid) => {
    const res = await axios.get(`/todos/${uid}`);
    setTodos(res.data);
  };

  const register = async () => {
    const res = await axios.post("/register", { username, password });
    if (res.data.success) {
      setUserId(res.data.userId);
      fetchTodos(res.data.userId);
    }
  };

  const login = async () => {
    const res = await axios.post("/login", { username, password });
    if (res.data.success) {
      setUserId(res.data.userId);
      fetchTodos(res.data.userId);
    }
  };

  const addTodo = async () => {
    await axios.post("/todos", { title, userId });
    setTitle("");
    fetchTodos(userId);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/todos/${id}`);
    fetchTodos(userId);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Taskify - Todo App</h1>

      {!userId ? (
        <div>
          <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}</h2>
          <input placeholder="Enter Todo" value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={addTodo}>Add</button>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>{todo.title} <button onClick={() => deleteTodo(todo.id)}>Delete</button></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
