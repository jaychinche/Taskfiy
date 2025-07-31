import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    setIsLoading(true);
    const savedTodos = localStorage.getItem(`todos_${user.userId}`);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setIsLoading(false);
  };

  const addTodo = () => {
    if (!input.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      title: input,
      priority,
      completed: false,
      userId: user.userId
    };
    
    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    localStorage.setItem(`todos_${user.userId}`, JSON.stringify(updatedTodos));
    setInput('');
    setPriority('medium');
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem(`todos_${user.userId}`, JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem(`todos_${user.userId}`, JSON.stringify(updatedTodos));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    backgroundDecoration: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    },
    blob1: {
      position: 'absolute',
      top: '-10rem',
      right: '-10rem',
      width: '20rem',
      height: '20rem',
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.1) 100%)',
      borderRadius: '50%',
      filter: 'blur(40px)'
    },
    blob2: {
      position: 'absolute',
      bottom: '-10rem',
      left: '-10rem',
      width: '20rem',
      height: '20rem',
      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(99, 102, 241, 0.1) 100%)',
      borderRadius: '50%',
      filter: 'blur(40px)'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1.5rem',
      padding: '2.5rem',
      width: '100%',
      maxWidth: '48rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'relative',
      zIndex: 1
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '1.5rem'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    logo: {
      width: '3rem',
      height: '3rem',
      borderRadius: '0.5rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    username: {
      color: '#4b5563',
      fontWeight: '600'
    },
    logoutButton: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.75rem',
      border: 'none',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)'
    },
    logoutButtonHover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)'
    },
    inputContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem'
    },
    input: {
      flex: 1,
      padding: '0.875rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      background: 'rgba(255, 255, 255, 0.8)',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    select: {
      padding: '0.875rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      background: 'rgba(255, 255, 255, 0.8)',
      outline: 'none',
      minWidth: '8rem'
    },
    addButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '0.875rem 1.5rem',
      borderRadius: '0.75rem',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.39)'
    },
    addButtonHover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
    },
    todoList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    todoItem: {
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '1rem 1.5rem',
      borderRadius: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    todoItemCompleted: {
      opacity: 0.7,
      textDecoration: 'line-through'
    },
    todoText: {
      flex: 1,
      color: '#1f2937',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    priority: {
      fontSize: '0.75rem',
      fontWeight: '600',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem'
    },
    priorityLow: {
      background: '#ecfdf5',
      color: '#059669'
    },
    priorityMedium: {
      background: '#eff6ff',
      color: '#2563eb'
    },
    priorityHigh: {
      background: '#fef2f2',
      color: '#dc2626'
    },
    deleteButton: {
      background: '#fef2f2',
      color: '#dc2626',
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0.5rem 0.75rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    deleteButtonHover: {
      background: '#fee2e2'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem'
    },
    spinner: {
      width: '2rem',
      height: '2rem',
      border: '3px solid rgba(102, 126, 234, 0.3)',
      borderTop: '3px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    emptyState: {
      textAlign: 'center',
      padding: '2rem',
      color: '#6b7280'
    }
  };

  // CSS animations
  const cssAnimations = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'low':
        return { ...styles.priority, ...styles.priorityLow };
      case 'medium':
        return { ...styles.priority, ...styles.priorityMedium };
      case 'high':
        return { ...styles.priority, ...styles.priorityHigh };
      default:
        return { ...styles.priority, ...styles.priorityMedium };
    }
  };

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        {/* Background decoration */}
        <div style={styles.backgroundDecoration}>
          <div style={styles.blob1}></div>
          <div style={styles.blob2}></div>
        </div>

        <div style={styles.card}>
          {/* Header with logo */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <img 
                src="https://todo-logo.s3.ap-south-1.amazonaws.com/to-do_logo.jpeg" 
                alt="Todo Logo" 
                style={styles.logo}
              />
              <h1 style={styles.title}>Your Todo List</h1>
            </div>
            <div style={styles.userInfo}>
              <span style={styles.username}>{user.username}</span>
              <button
                style={styles.logoutButton}
                onClick={handleLogout}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.logoutButtonHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, { transform: 'none', boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)' })}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Input area */}
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Add a new todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              style={{
                ...styles.input,
                ...(document.activeElement?.id === 'todo-input' ? styles.inputFocus : {})
              }}
              id="todo-input"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={styles.select}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              onClick={addTodo}
              style={styles.addButton}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.addButtonHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, { transform: 'none', boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.39)' })}
            >
              Add Todo
            </button>
          </div>

          {/* Todo list */}
          {isLoading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
            </div>
          ) : todos.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No todos yet. Add one to get started!</p>
            </div>
          ) : (
            <ul style={styles.todoList}>
              {todos.map((todo) => (
                <li 
                  key={todo.id} 
                  style={{
                    ...styles.todoItem,
                    ...(todo.completed ? styles.todoItemCompleted : {})
                  }}
                >
                  <div 
                    style={styles.todoText}
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.title}
                    <span style={getPriorityStyle(todo.priority)}>
                      {todo.priority}
                    </span>
                  </div>
                  <button
                    style={styles.deleteButton}
                    onClick={() => deleteTodo(todo.id)}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteButtonHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, { background: '#fef2f2' })}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoPage;