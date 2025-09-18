# React Hooks 完全指南 - 第二部分

## 目录
1. [useReducer - 复杂状态管理](#usereducer---复杂状态管理)
2. [useMemo - 计算值缓存](#usememo---计算值缓存)
3. [useCallback - 函数缓存](#usecallback---函数缓存)
4. [useRef - 引用管理](#useref---引用管理)
5. [自定义 Hooks](#自定义-hooks)
6. [Hooks 规则和最佳实践](#hooks-规则和最佳实践)

## useReducer - 复杂状态管理

当状态逻辑比较复杂时，useReducer 比 useState 更适合。

### 基本用法
```typescript
import React, { useReducer } from 'react'

interface CounterState {
  count: number
}

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

const CounterWithReducer = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })

  return (
    <div>
      <p>计数: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'set', payload: 10 })}>设为10</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </div>
  )
}
```

## useMemo - 计算值缓存

useMemo 返回一个 memoized 值，只有当依赖项改变时才重新计算。

### 基本用法
```typescript
import React, { useState, useMemo } from 'react'

const ExpensiveCalculation = () => {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState('')

  // 昂贵的计算，只在 count 变化时重新计算
  const expensiveValue = useMemo(() => {
    console.log('执行昂贵的计算...')
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += count
    }
    return result
  }, [count])

  return (
    <div>
      <div>
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
        <p>计算结果: {expensiveValue}</p>
      </div>
      
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入不会触发重新计算"
        />
      </div>
    </div>
  )
}
```

## useCallback - 函数缓存

useCallback 返回一个 memoized 回调函数。

### 基本用法
```typescript
import React, { useState, useCallback } from 'react'

const ChildComponent = React.memo<{ 
  onIncrement: () => void 
}>(({ onIncrement }) => {
  console.log('ChildComponent 渲染')
  return <button onClick={onIncrement}>+</button>
})

const ParentComponent = () => {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)

  // 缓存回调函数
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  return (
    <div>
      <p>Count: {count}</p>
      <p>Other: {other}</p>
      <button onClick={() => setOther(other + 1)}>更新 Other</button>
      <ChildComponent onIncrement={handleIncrement} />
    </div>
  )
}
```

## useRef - 引用管理

useRef 返回一个可变的 ref 对象。

### DOM 引用
```typescript
import React, { useRef, useEffect } from 'react'

const FocusInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleFocus = () => {
    inputRef.current?.focus()
  }

  return (
    <div>
      <input ref={inputRef} placeholder="我会自动聚焦" />
      <button onClick={handleFocus}>聚焦输入框</button>
    </div>
  )
}
```

### 存储可变值
```typescript
const Timer = () => {
  const [count, setCount] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1)
      }, 1000)
    }
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={startTimer}>开始</button>
      <button onClick={stopTimer}>停止</button>
    </div>
  )
}
```

## 自定义 Hooks

自定义 Hooks 是一个函数，其名称以 "use" 开头。

### 数据获取 Hook
```typescript
interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

const useApi = <T>(url: string): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
```

### 本地存储 Hook
```typescript
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}
```

## Hooks 规则和最佳实践

### Hooks 的规则
1. **只在最顶层调用 Hook** - 不要在循环、条件或嵌套函数中调用
2. **只在 React 函数中调用 Hook** - 不要在普通的 JavaScript 函数中调用

### 最佳实践

#### 状态管理
- 使用 useState 处理简单状态
- 使用 useReducer 处理复杂状态逻辑
- 将相关状态组合在一起

#### 性能优化
- 谨慎使用 useMemo 和 useCallback
- 只在真正需要时才使用性能优化
- 测量性能影响

#### 副作用管理
- 正确设置 useEffect 依赖
- 及时清理副作用
- 避免无限循环

#### 自定义 Hooks
- 提取可复用的逻辑
- 使用清晰的命名
- 返回稳定的接口

### 常见陷阱

1. **闭包陷阱**: 在 useEffect 中使用过期的值
2. **依赖遗漏**: useEffect 依赖数组不完整
3. **过度优化**: 不必要的 useMemo 和 useCallback
4. **状态更新时机**: 在错误的时机更新状态

通过遵循这些规则和最佳实践，你可以更好地使用 React Hooks 构建高质量的应用程序。

参考阅读:
- [React Hooks 完全指南 - 第一部分](./React-Hooks指南-第一部分.md)
- [组件基础详解](./组件基础详解.md)