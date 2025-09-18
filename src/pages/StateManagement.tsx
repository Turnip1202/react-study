import React, { useState, createContext, useContext, useReducer } from 'react'
import './StateManagement.css'

// Simple State Lifting Example
const ChildCounter: React.FC<{ 
  count: number
  onIncrement: () => void
  onDecrement: () => void 
}> = ({ count, onIncrement, onDecrement }) => {
  return (
    <div className="child-component">
      <h4>Child Component</h4>
      <p>Count from parent: {count}</p>
      <button onClick={onIncrement}>+ from child</button>
      <button onClick={onDecrement}>- from child</button>
    </div>
  )
}

const StateLiftingDemo: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="demo-section">
      <h3>State Lifting</h3>
      <div className="parent-component">
        <h4>Parent Component</h4>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>+ from parent</button>
        <button onClick={() => setCount(count - 1)}>- from parent</button>
        
        <ChildCounter 
          count={count}
          onIncrement={() => setCount(count + 1)}
          onDecrement={() => setCount(count - 1)}
        />
      </div>
    </div>
  )
}

// Context API Example
type User = {
  id: number
  name: string
  role: 'admin' | 'user' | 'guest'
}

type UserContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

const UserProfile: React.FC = () => {
  const { user, logout } = useUser()

  if (!user) {
    return <p>No user logged in</p>
  }

  return (
    <div className="user-profile">
      <h4>User Profile</h4>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

const LoginForm: React.FC = () => {
  const { user, login } = useUser()
  const [name, setName] = useState('')
  const [role, setRole] = useState<'admin' | 'user' | 'guest'>('user')

  const handleLogin = () => {
    if (name.trim()) {
      login({ id: Date.now(), name, role })
      setName('')
    }
  }

  if (user) {
    return <UserProfile />
  }

  return (
    <div className="login-form">
      <h4>Login</h4>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <select value={role} onChange={(e) => setRole(e.target.value as any)}>
        <option value="guest">Guest</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

const ContextDemo: React.FC = () => {
  return (
    <div className="demo-section">
      <h3>Context API</h3>
      <UserProvider>
        <div className="context-demo">
          <LoginForm />
        </div>
      </UserProvider>
    </div>
  )
}

// Complex State with useReducer
type TodoItem = {
  id: number
  text: string
  completed: boolean
}

type TodoState = {
  todos: TodoItem[]
  filter: 'all' | 'completed' | 'active'
}

type TodoAction = 
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'completed' | 'active' }
  | { type: 'CLEAR_COMPLETED' }

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      }
    default:
      return state
  }
}

const TodoApp: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  })
  const [inputText, setInputText] = useState('')

  const addTodo = () => {
    if (inputText.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputText.trim() })
      setInputText('')
    }
  }

  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'completed':
        return todo.completed
      case 'active':
        return !todo.completed
      default:
        return true
    }
  })

  return (
    <div className="todo-app">
      <h4>Todo App with useReducer</h4>
      
      <div className="todo-input">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a todo"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-filters">
        <button 
          className={state.filter === 'all' ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
        >
          All ({state.todos.length})
        </button>
        <button 
          className={state.filter === 'active' ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
        >
          Active ({state.todos.filter(t => !t.completed).length})
        </button>
        <button 
          className={state.filter === 'completed' ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
        >
          Completed ({state.todos.filter(t => t.completed).length})
        </button>
        <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
          Clear Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span>{todo.text}</span>
            <button 
              className="delete-btn"
              onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ComplexStateDemo: React.FC = () => {
  return (
    <div className="demo-section">
      <h3>Complex State Management</h3>
      <TodoApp />
    </div>
  )
}

const StateManagement: React.FC = () => {
  return (
    <div className="state-management">
      <h1>State Management</h1>
      <p>Learn different approaches to managing state in React applications</p>

      <div className="demos-container">
        <StateLiftingDemo />
        <ContextDemo />
        <ComplexStateDemo />
      </div>

      <section className="concepts-section">
        <h2>State Management Concepts</h2>
        <div className="concepts-grid">
          <div className="concept">
            <h4>📈 State Lifting</h4>
            <p>Moving state up to the closest common ancestor when multiple components need to share state.</p>
          </div>
          <div className="concept">
            <h4>🌐 Context API</h4>
            <p>React's built-in solution for sharing state across the component tree without prop drilling.</p>
          </div>
          <div className="concept">
            <h4>🔄 useReducer</h4>
            <p>Manages complex state logic with actions and reducers, similar to Redux pattern.</p>
          </div>
          <div className="concept">
            <h4>🔗 Prop Drilling</h4>
            <p>The process of passing props through multiple component levels. Context helps avoid this.</p>
          </div>
          <div className="concept">
            <h4>🏪 Global State</h4>
            <p>State that needs to be accessed by many components across the application.</p>
          </div>
          <div className="concept">
            <h4>📍 Local State</h4>
            <p>State that only affects a single component or a small group of related components.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StateManagement