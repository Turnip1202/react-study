# React Hooks 完全指南 - 第一部分

## 目录
1. [Hooks 概述](#hooks-概述)
2. [useState - 状态管理](#usestate---状态管理)
3. [useEffect - 副作用处理](#useeffect---副作用处理)
4. [useContext - 上下文管理](#usecontext---上下文管理)

## Hooks 概述

React Hooks 是 React 16.8 引入的新特性，让你可以在不编写 class 的情况下使用 state 以及其他 React 特性。

### 为什么需要 Hooks？
- **逻辑复用困难**: 高阶组件和 render props 模式复杂
- **复杂组件难以理解**: 生命周期方法分散相关逻辑
- **class 组件的问题**: this 绑定、代码压缩困难

### Hooks 的优势
- **更简洁的代码**: 函数组件比类组件更简洁
- **更好的逻辑复用**: 自定义 Hooks 让逻辑复用变得简单
- **更容易测试**: 纯函数更容易测试
- **更好的性能**: 函数组件结合优化 hooks 性能更佳

## useState - 状态管理

useState 是最基础的 Hook，用于在函数组件中添加状态。

### 基本用法
```typescript
import React, { useState } from 'react'

const Counter = () => {
  // 声明一个名为 count 的状态变量，初始值为 0
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  )
}
```

### 函数式更新
```typescript
const CounterWithFunctionalUpdate = () => {
  const [count, setCount] = useState(0)

  // 推荐：使用函数式更新，避免闭包陷阱
  const increment = () => setCount(prevCount => prevCount + 1)
  const decrement = () => setCount(prevCount => prevCount - 1)

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </div>
  )
}
```

### 复杂状态管理
```typescript
interface User {
  name: string
  email: string
  age: number
}

const UserForm = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    age: 0
  })

  const updateUser = (field: keyof User, value: string | number) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }))
  }

  return (
    <form>
      <input
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
        placeholder="姓名"
      />
      <input
        value={user.email}
        onChange={(e) => updateUser('email', e.target.value)}
        placeholder="邮箱"
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => updateUser('age', parseInt(e.target.value))}
        placeholder="年龄"
      />
    </form>
  )
}
```

## useEffect - 副作用处理

useEffect 让你能够在函数组件中执行副作用操作。

### 基本用法
```typescript
import React, { useState, useEffect } from 'react'

const DocumentTitle = () => {
  const [count, setCount] = useState(0)

  // 每次渲染后都会执行
  useEffect(() => {
    document.title = `点击了 ${count} 次`
  })

  return (
    <div>
      <p>点击次数: {count}</p>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  )
}
```

### 依赖数组
```typescript
const EffectWithDependencies = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // 只在 count 变化时执行
  useEffect(() => {
    console.log('Count changed:', count)
  }, [count])

  // 只在组件挂载时执行一次
  useEffect(() => {
    console.log('Component mounted')
  }, [])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入名字"
      />
    </div>
  )
}
```

### 清理副作用
```typescript
const Timer = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1)
    }, 1000)

    // 清理函数：在组件卸载或依赖变化时执行
    return () => {
      clearInterval(intervalId)
    }
  }, []) // 空依赖数组，只在挂载时运行

  return <div>秒数: {seconds}</div>
}
```

## useContext - 上下文管理

useContext 让你可以订阅 React context 的变更。

### 创建和使用 Context
```typescript
import React, { createContext, useContext, useState } from 'react'

// 创建主题 Context
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Provider 组件
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 自定义 Hook
const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// 使用 Context 的组件
const ThemedButton = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      切换主题 (当前: {theme})
    </button>
  )
}
```

## 最佳实践要点

### useState 最佳实践
- 使用函数式更新避免闭包陷阱
- 合理拆分状态，避免单个状态过于复杂
- 相关状态可以合并为一个对象

### useEffect 最佳实践
- 正确设置依赖数组
- 及时清理副作用
- 将相关逻辑放在同一个 useEffect 中

### useContext 最佳实践  
- 不要过度使用 Context
- 为 Context 提供默认值
- 使用自定义 Hook 封装 Context 使用

继续阅读 [React Hooks 完全指南 - 第二部分](./React-Hooks指南-第二部分.md)