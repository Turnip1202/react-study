# React 学习指南

一个使用 Vite + TypeScript + npm 构建的综合性 React 学习项目。

## 项目概述

这个项目旨在通过实际示例和交互式演示帮助您学习 React 的所有方面。它涵盖了从基础组件到高级模式的所有内容。

## 功能特性

### ✅ 已实现功能：
- **首页**: 概览和学习路线图
- **基础组件**: 函数组件、类组件、JSX、props
- **Hooks 演示**: React hooks 完整指南和示例
  - useState、useEffect、useReducer
  - useMemo、useCallback、useRef
  - 自定义 hooks
- **状态管理**: 状态提升、Context API、useReducer 复杂状态管理
- **导航**: 使用 React Router 的清洁侧边栏导航

### 🚧 即将推出：
- 事件处理
- 表单处理（受控/非受控组件）
- 条件渲染
- 列表和 Keys
- 样式处理（CSS 模块、styled-components）
- 生命周期方法
- Context API 深入探讨
- 性能优化
- 高级模式（HOCs、Render Props 等）
- 测试

## 快速开始

1. **安装依赖**:
   ```bash
   npm install
   ```

2. **启动开发服务器**:
   ```bash
   npm run dev
   ```

3. **打开浏览器** 并导航到本地开发 URL（通常是 `http://localhost:5173`）

4. **使用左侧导航菜单探索不同部分**

## 学习路径

1. **从首页开始** - 了解您将学到什么
2. **基础组件** - 学习基础知识
3. **Hooks 演示** - 掌握 React hooks
4. **状态管理** - 理解不同的状态管理方法
5. 随着其他部分的推出继续学习

## 项目结构

```
src/
├── components/          # 公共组件
│   ├── Navigation.tsx   # 主导航组件
│   └── Navigation.css   # 导航样式
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── BasicComponents.tsx # 组件基础
│   ├── HooksDemo.tsx   # React hooks 示例
│   ├── StateManagement.tsx # 状态管理模式
│   └── ...             # 其他学习模块
├── App.tsx             # 主应用组件（包含路由）
├── App.css            # 全局样式
└── main.tsx           # 应用入口点
```

## 使用的技术

- **React 19** - 最新的 React 特性
- **TypeScript** - 类型安全和更好的开发体验
- **Vite** - 快速构建工具和开发服务器
- **React Router** - 客户端路由
- **CSS3** - 使用 Flexbox 和 Grid 的现代样式

## 核心学习概念

### 组件
- 函数组件 vs 类组件
- Props 和 children
- 组件组合
- JSX 语法和特性

### Hooks
- 使用 useState 进行状态管理
- 使用 useEffect 处理副作用
- 使用 useReducer 处理复杂状态
- 使用 useMemo 和 useCallback 进行性能优化
- 使用 useRef 进行 DOM 操作
- 创建自定义 hooks

### 状态管理
- 局部组件状态
- 状态提升
- 全局状态的 Context API
- 避免 prop drilling

## 学习技巧

1. **边做边学** - 修改示例看看会发生什么
2. **使用浏览器开发工具** - 检查组件并查看它们如何工作
3. **阅读代码** - 每个示例都有详细的注释
4. **实验** - 尝试创建您自己的变体
5. **构建项目** - 在小项目中应用所学知识

## 详细功能说明

### 1. 基础组件 (BasicComponents)

#### 函数组件示例
```typescript
const FunctionalGreeting: React.FC<{ name: string; age?: number }> = ({ name, age }) => {
  return (
    <div className="component-example">
      <h4>函数组件</h4>
      <p>你好, {name}! {age && `你 ${age} 岁了。`}</p>
    </div>
  )
}
```

**学习要点：**
- 函数组件的定义方式
- TypeScript 接口定义 props
- 可选 props 的使用
- JSX 中的条件渲染

#### 类组件示例
```typescript
class ClassGreeting extends React.Component<{ name: string; age?: number }> {
  render() {
    const { name, age } = this.props
    return (
      <div className="component-example">
        <h4>类组件</h4>
        <p>你好, {name}! {age && `你 ${age} 岁了。`}</p>
      </div>
    )
  }
}
```

**学习要点：**
- 类组件的结构
- props 的获取方式
- render 方法的使用

### 2. React Hooks 详解

#### useState - 状态管理
```typescript
const [count, setCount] = useState(0)
const [text, setText] = useState('')
const [todos, setTodos] = useState<string[]>([])
```

**核心概念：**
- 状态的初始化
- 状态更新函数
- 函数式更新模式
- 复杂状态的管理

#### useEffect - 副作用处理
```typescript
// 每次渲染都执行
useEffect(() => {
  document.title = `计数: ${count}`
})

// 依赖数组控制执行时机
useEffect(() => {
  console.log('计数改变:', count)
}, [count])

// 清理副作用
useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth)
  window.addEventListener('resize', handleResize)
  
  return () => window.removeEventListener('resize', handleResize)
}, [])
```

**学习要点：**
- 副作用的概念
- 依赖数组的作用
- 清理函数的使用
- 生命周期方法的替代

#### useReducer - 复杂状态管理
```typescript
type TodoAction = 
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
      }
    // ... 其他 case
  }
}
```

**核心概念：**
- Reducer 函数的编写
- Action 的设计
- 不可变状态更新
- 复杂业务逻辑的管理

#### 性能优化 Hooks

**useMemo - 计算值缓存**
```typescript
const expensiveValue = useMemo(() => {
  console.log('计算昂贵的值...')
  return count * 1000
}, [count])
```

**useCallback - 函数缓存**
```typescript
const increment = useCallback(() => {
  setCount(c => c + 1)
}, [])
```

### 3. 状态管理模式

#### 状态提升
```typescript
// 父组件管理状态
const [count, setCount] = useState(0)

// 传递给子组件
<ChildCounter 
  count={count}
  onIncrement={() => setCount(count + 1)}
  onDecrement={() => setCount(count - 1)}
/>
```

**学习要点：**
- 何时需要状态提升
- 状态的共享方式
- 回调函数的传递

#### Context API
```typescript
// 创建 Context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Provider 组件
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

// 使用 Context
const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
```

**核心概念：**
- Context 的创建和使用
- Provider 模式
- 避免 prop drilling
- 自定义 hook 封装

### 4. 自定义 Hooks

#### 计数器 Hook
```typescript
const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  
  return { count, increment, decrement, reset }
}
```

#### 数据获取 Hook
```typescript
const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 异步数据获取逻辑
  }, [url])

  return { data, loading, error }
}
```

**学习要点：**
- 逻辑复用的重要性
- Hook 的命名规范
- 依赖管理
- 错误处理

## 最佳实践

### 1. 组件设计原则
- **单一职责**: 每个组件只负责一个功能
- **props 接口清晰**: 使用 TypeScript 定义明确的 props 类型
- **可复用性**: 设计通用的组件接口
- **组合优于继承**: 使用组件组合而不是继承

### 2. 状态管理原则
- **就近原则**: 状态尽可能靠近使用它的组件
- **最小状态**: 只存储必要的状态，派生状态通过计算得出
- **不可变更新**: 始终返回新的状态对象
- **合理使用 Context**: 避免过度使用全局状态

### 3. 性能优化技巧
- **合理使用 useMemo**: 只对昂贵的计算使用缓存
- **useCallback 的使用**: 防止子组件不必要的重渲染
- **React.memo**: 对纯组件进行优化
- **懒加载**: 使用 React.lazy 和 Suspense

### 4. 错误处理
- **边界错误捕获**: 使用 Error Boundary
- **优雅降级**: 提供备用 UI
- **用户友好的错误信息**: 避免技术性错误信息

## 常见问题和解决方案

### Q1: 什么时候使用 useState vs useReducer？
**答案**: 
- **useState**: 简单的状态管理，状态更新逻辑简单
- **useReducer**: 复杂的状态逻辑，多个相关的状态更新

### Q2: 如何避免无限重渲染？
**答案**:
- 正确设置 useEffect 的依赖数组
- 使用 useCallback 缓存函数
- 避免在 render 中创建新对象

### Q3: Context 什么时候使用？
**答案**:
- 需要跨多层组件传递数据时
- 全局状态管理（主题、用户信息等）
- 避免过度使用，可能影响性能

### Q4: 自定义 Hook 的命名规范？
**答案**:
- 必须以 "use" 开头
- 使用驼峰命名法
- 名字要能表达功能

## 扩展学习资源

### 官方文档
- [React 官方文档](https://react.dev/)
- [React Hooks 文档](https://react.dev/reference/react)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

### 推荐学习材料
- [React 设计模式](https://patterns.dev/posts/reactpatterns-introduction/)
- [现代 React 开发](https://kentcdodds.com/blog/react-hooks-pitfalls)
- [React 性能优化](https://react.dev/learn/render-and-commit)

### 实践项目建议
1. **待办事项应用**: 练习状态管理和 CRUD 操作
2. **天气应用**: 学习 API 调用和异步状态
3. **博客系统**: 复杂的数据结构和路由
4. **电商页面**: 购物车状态管理和性能优化

## 贡献指南

这是一个学习项目！欢迎您：
- 添加更多示例
- 改进现有演示
- 修复 bug 或提高代码质量
- 添加更好的文档

## 技术支持

如果您在学习过程中遇到问题：
1. 检查浏览器开发者工具的控制台
2. 查看相关的官方文档
3. 尝试在示例代码中实验
4. 参考项目中的其他示例

## 版本历史

- **v1.0.0**: 初始版本，包含基础组件、Hooks 和状态管理
- **计划中**: 表单处理、性能优化、测试等模块

祝您学习愉快！🚀

---

*这个项目旨在提供一个全面的 React 学习体验。通过实际的代码示例和详细的解释，帮助您从基础到高级逐步掌握 React 开发。*