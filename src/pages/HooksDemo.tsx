import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef } from 'react'
import './HooksDemo.css'

// Custom Hook Example
const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  
  return { count, increment, decrement, reset }
}

// Custom Hook for API calls
const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

// useReducer example
type CounterState = { count: number }
type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number }

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    case 'set':
      return { count: action.payload }
    default:
      return state
  }
}

// useState Demo
const UseStateDemo: React.FC = () => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<string[]>([])

  const addTodo = () => {
    if (text.trim()) {
      setTodos(prev => [...prev, text])
      setText('')
    }
  }

  return (
    <div className="hook-demo">
      <h3>useState Hook</h3>
      <div className="demo-content">
        <div className="counter-demo">
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>
        
        <div className="todo-demo">
          <h4>Simple Todo</h4>
          <input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a todo"
          />
          <button onClick={addTodo}>Add</button>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// useEffect Demo
const UseEffectDemo: React.FC = () => {
  const [count, setCount] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Effect runs on every render
  useEffect(() => {
    document.title = `Count: ${count}`
  })

  // Effect with dependency array
  useEffect(() => {
    console.log('Count changed:', count)
  }, [count])

  // Effect with cleanup
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="hook-demo">
      <h3>useEffect Hook</h3>
      <div className="demo-content">
        <p>Count: {count} (check document title)</p>
        <p>Window width: {windowWidth}px</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  )
}

// useReducer Demo
const UseReducerDemo: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })

  return (
    <div className="hook-demo">
      <h3>useReducer Hook</h3>
      <div className="demo-content">
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
        <button onClick={() => dispatch({ type: 'set', payload: 10 })}>Set to 10</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    </div>
  )
}

// useMemo Demo
const UseMemoDemo: React.FC = () => {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState('')

  // Expensive calculation
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...')
    return count * 1000
  }, [count])

  return (
    <div className="hook-demo">
      <h3>useMemo Hook</h3>
      <div className="demo-content">
        <p>Count: {count}</p>
        <p>Expensive calculation result: {expensiveValue}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        
        <div>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something (won't trigger recalculation)"
          />
        </div>
      </div>
    </div>
  )
}

// useCallback Demo
const UseCallbackDemo: React.FC = () => {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)

  const increment = useCallback(() => {
    setCount(c => c + 1)
  }, [])

  const expensiveCallback = useCallback(() => {
    console.log('Expensive callback called')
    return count * 2
  }, [count])

  return (
    <div className="hook-demo">
      <h3>useCallback Hook</h3>
      <div className="demo-content">
        <p>Count: {count}</p>
        <p>Other: {other}</p>
        <button onClick={increment}>Increment Count</button>
        <button onClick={() => setOther(other + 1)}>Increment Other</button>
        <button onClick={() => console.log(expensiveCallback())}>
          Call Expensive Function
        </button>
      </div>
    </div>
  )
}

// useRef Demo
const UseRefDemo: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const countRef = useRef(0)
  const [, forceUpdate] = useState({})

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const incrementRef = () => {
    countRef.current += 1
    forceUpdate({}) // Force re-render to show updated ref value
  }

  return (
    <div className="hook-demo">
      <h3>useRef Hook</h3>
      <div className="demo-content">
        <div>
          <input ref={inputRef} placeholder="Click button to focus" />
          <button onClick={focusInput}>Focus Input</button>
        </div>
        
        <div>
          <p>Ref count (persists across renders): {countRef.current}</p>
          <button onClick={incrementRef}>Increment Ref</button>
        </div>
      </div>
    </div>
  )
}

// Custom Hook Demo
const CustomHookDemo: React.FC = () => {
  const { count, increment, decrement, reset } = useCounter(10)
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts/1')

  return (
    <div className="hook-demo">
      <h3>Custom Hooks</h3>
      <div className="demo-content">
        <div className="custom-counter">
          <h4>Custom Counter Hook</h4>
          <p>Count: {count}</p>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
          <button onClick={reset}>Reset</button>
        </div>
        
        <div className="custom-fetch">
          <h4>Custom Fetch Hook</h4>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {data && (
            <div>
              <h5>{data.title}</h5>
              <p>{data.body}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const HooksDemo: React.FC = () => {
  return (
    <div className="hooks-demo">
      <h1>React Hooks</h1>
      <p>Learn about React Hooks and how they enable state and side effects in functional components</p>

      <div className="hooks-grid">
        <UseStateDemo />
        <UseEffectDemo />
        <UseReducerDemo />
        <UseMemoDemo />
        <UseCallbackDemo />
        <UseRefDemo />
        <CustomHookDemo />
      </div>

      <section className="hooks-concepts">
        <h2>Hook Rules & Concepts</h2>
        <div className="concepts-grid">
          <div className="concept">
            <h4>🎣 Hook Rules</h4>
            <ul>
              <li>Only call hooks at the top level</li>
              <li>Only call hooks from React functions</li>
              <li>Use ESLint plugin for enforcement</li>
            </ul>
          </div>
          <div className="concept">
            <h4>🔄 useState</h4>
            <p>Manages local component state. Returns current state and setter function.</p>
          </div>
          <div className="concept">
            <h4>⚡ useEffect</h4>
            <p>Handles side effects. Replaces componentDidMount, componentDidUpdate, and componentWillUnmount.</p>
          </div>
          <div className="concept">
            <h4>🏗️ useReducer</h4>
            <p>Alternative to useState for complex state logic. Uses reducer pattern.</p>
          </div>
          <div className="concept">
            <h4>🧠 useMemo</h4>
            <p>Memoizes expensive calculations. Only recalculates when dependencies change.</p>
          </div>
          <div className="concept">
            <h4>📞 useCallback</h4>
            <p>Memoizes functions. Prevents unnecessary re-renders of child components.</p>
          </div>
          <div className="concept">
            <h4>🎯 useRef</h4>
            <p>References DOM elements or stores mutable values that persist across renders.</p>
          </div>
          <div className="concept">
            <h4>🔧 Custom Hooks</h4>
            <p>Reusable stateful logic. Extract component logic into reusable functions.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HooksDemo