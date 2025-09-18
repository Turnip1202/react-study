# React 学习项目 🚀

一个全面的 React 学习平台，涵盖从基础到高级的所有 React 概念和最佳实践。

## 📋 项目概述

使用 **Vite + TypeScript + React** 构建的交互式学习项目，包含 **13 个核心模块**，每个模块都提供详细示例、最佳实践和交互式演示。

## 🛠️ 技术栈

- **前端框架**: React 18.x + TypeScript
- **构建工具**: Vite
- **包管理器**: pnpm
- **路由**: React Router
- **样式**: CSS + CSS Modules + Styled Components
- **状态管理**: React Hooks
- **部署**: GitHub Pages

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建项目
pnpm build

# 预览构建结果
pnpm preview
```

## 📚 学习模块详解

### 1. 🧱 基础组件 (Basic Components)
**学习目标**: 掌握 React 组件基本概念

**核心内容**:
- 函数组件 vs 类组件
- Props 传递和类型定义
- 组件组合和嵌套
- JSX 语法基础

```jsx
// 函数组件示例
const Welcome: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>
}

// Props 类型定义
interface UserProps {
  id: number
  name: string
  email: string
}
```

### 2. 🔄 状态管理 (State Management)
**学习目标**: 掌握 React 状态管理

**核心内容**:
- useState Hook 基础用法
- useReducer 复杂状态管理
- 状态提升和数据流
- 不可变状态更新

```jsx
// useState 基础
const [count, setCount] = useState(0)

// useReducer 复杂状态
const [state, dispatch] = useReducer(reducer, initialState)

// 不可变更新
setUsers(prev => [...prev, newUser]) // ✅ 正确
```

### 3. 🪝 Hooks 演示 (Hooks Demo)
**学习目标**: 全面掌握 React Hooks

**核心 Hooks**:
- `useState` - 状态管理
- `useEffect` - 副作用处理
- `useContext` - 上下文访问
- `useMemo` - 性能优化
- `useCallback` - 函数缓存
- `useRef` - DOM 引用

```jsx
// useEffect 生命周期
useEffect(() => {
  const timer = setInterval(() => {
    // 定时器逻辑
  }, 1000)
  
  return () => clearInterval(timer) // 清理
}, [dependency])

// useMemo 性能优化
const expensiveValue = useMemo(() => {
  return expensiveCalculation(data)
}, [data])
```

### 4. 🔀 条件渲染 (Conditional Rendering)
**学习目标**: 掌握各种条件渲染模式

**渲染模式**:
```jsx
// 三元运算符
{isLoggedIn ? <Dashboard /> : <LoginForm />}

// 逻辑与运算符
{showNotification && <Notification />}

// 多条件判断
{(() => {
  switch (status) {
    case 'loading': return <Loading />
    case 'error': return <Error />
    case 'success': return <Success />
    default: return null
  }
})()}
```

### 5. 🎯 事件处理 (Event Handling)
**学习目标**: 掌握 React 事件处理机制

**事件处理模式**:
```jsx
// 基础事件处理
const handleClick = (e: React.MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

// 带参数的事件处理
const handleDelete = (id: number) => (e: React.MouseEvent) => {
  deleteItem(id)
}

// 键盘事件
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSubmit()
  }
}
```

### 6. 📝 表单处理 (Forms)
**学习目标**: 掌握表单处理最佳实践

**表单模式**:
```jsx
// 受控组件
const [formData, setFormData] = useState({
  username: '',
  email: ''
})

const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
    ...prev,
    [field]: e.target.value
  }))
}

// 表单验证
const validateForm = (): boolean => {
  const errors: Record<string, string> = {}
  
  if (!formData.username.trim()) {
    errors.username = '用户名不能为空'
  }
  
  setErrors(errors)
  return Object.keys(errors).length === 0
}
```

### 7. 🎨 样式方案 (Styling)
**学习目标**: 掌握各种样式解决方案

**样式方案对比**:
```jsx
// CSS Modules
import styles from './Component.module.css'
<div className={styles.container} />

// Styled Components
const StyledButton = styled.button`
  background: ${props => props.theme.primary};
  padding: 12px 24px;
`

// 内联样式
const dynamicStyle = {
  backgroundColor: isActive ? '#007bff' : '#6c757d'
}

// CSS 变量
const themeStyle = {
  '--primary-color': theme === 'dark' ? '#fff' : '#000'
}
```

### 8. 📋 列表渲染 (Lists)
**学习目标**: 掌握列表渲染和性能优化

**列表渲染最佳实践**:
```jsx
// 基础列表渲染
{items.map(item => (
  <ListItem 
    key={item.id}  // ✅ 使用稳定的唯一 ID
    data={item}
  />
))}

// 性能优化的列表
const MemoizedListItem = React.memo(ListItem)
```

**Key 使用原则**:
- ✅ 使用稳定、唯一的标识符
- ✅ 避免使用数组索引作为 key
- ❌ 不要使用随机数作为 key

### 9. 🔄 生命周期方法 (Lifecycle Methods)
**学习目标**: 理解组件生命周期和 useEffect

**生命周期模式**:
```jsx
// 组件挂载
useEffect(() => {
  console.log('组件已挂载')
  fetchData()
}, []) // 空依赖数组

// 组件更新
useEffect(() => {
  updateTitle(count)
}, [count]) // 监听特定状态

// 组件卸载
useEffect(() => {
  const timer = setInterval(() => {}, 1000)
  
  return () => {
    clearInterval(timer) // 清理
  }
}, [])
```

### 10. 🌐 Context API (Context Demo)
**学习目标**: 掌握 React Context 使用

**Context 使用模式**:
```jsx
// 创建 Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 自定义 Hook
const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Provider 组件
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('light')
  
  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }), [theme])
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### 11. ⚡ 性能优化 (Performance Optimization)
**学习目标**: 掌握 React 性能优化技巧

**优化技巧**:
```jsx
// React.memo 防止不必要的重渲染
const ExpensiveComponent = React.memo(({ data }) => {
  // 组件逻辑
})

// useMemo 缓存计算结果
const expensiveValue = useMemo(() => {
  return data.reduce((sum, item) => sum + item.value, 0)
}, [data])

// useCallback 缓存函数
const handleClick = useCallback((id: string) => {
  onItemClick(id)
}, [onItemClick])
```

### 12. 🚀 高级模式 (Advanced Patterns)
**学习目标**: 掌握 React 高级设计模式

**设计模式**:

#### HOC (高阶组件)
```jsx
const withLoading = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P & { loading: boolean }) => {
    const { loading, ...restProps } = props
    return loading ? <LoadingSpinner /> : <Component {...(restProps as P)} />
  }
}
```

#### Render Props
```jsx
const DataFetcher = ({ url, children }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchData(url).then(setData).finally(() => setLoading(false))
  }, [url])
  
  return children({ data, loading })
}
```

#### Compound Components
```jsx
const Tabs = ({ defaultTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

Tabs.List = ({ children }) => <div className="tabs-list">{children}</div>
Tabs.Tab = ({ id, children }) => {
  const { activeTab, setActiveTab } = useTabsContext()
  return (
    <button onClick={() => setActiveTab(id)}>{children}</button>
  )
}
```

### 13. 🧪 测试演示 (Testing Demo)
**学习目标**: 掌握 React 组件测试最佳实践

**测试示例**:
```jsx
import { render, screen, fireEvent } from '@testing-library/react'

test('performs addition correctly', () => {
  render(<Calculator />)
  
  fireEvent.change(screen.getByLabelText('First number'), {
    target: { value: '10' }
  })
  fireEvent.change(screen.getByLabelText('Second number'), {
    target: { value: '5' }
  })
  fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
  
  expect(screen.getByTestId('result')).toHaveTextContent('15')
})
```

## 🎯 学习路线建议

### 📚 初学者路线 (1-2 周)
1. **基础组件** → 2. **状态管理** → 3. **事件处理** → 4. **条件渲染**

### 🚀 进阶路线 (3-4 周)
5. **Hooks 演示** → 6. **表单处理** → 7. **列表渲染** → 8. **生命周期**

### ⚡ 高级路线 (5-6 周)
9. **样式方案** → 10. **Context API** → 11. **性能优化** → 12. **高级模式** → 13. **测试演示**

## 📁 项目结构

```
react-study/
├── src/
│   ├── pages/             # 学习模块页面
│   │   ├── BasicComponents.tsx
│   │   ├── StateManagement.tsx
│   │   ├── HooksDemo.tsx
│   │   ├── ConditionalRendering.tsx
│   │   ├── EventHandling.tsx
│   │   ├── Forms.tsx
│   │   ├── Styling.tsx
│   │   ├── Lists.tsx
│   │   ├── LifecycleMethods.tsx
│   │   ├── ContextDemo.tsx
│   │   ├── PerformanceOptimization.tsx
│   │   ├── AdvancedPatterns.tsx
│   │   └── TestingDemo.tsx
│   ├── App.tsx            # 主应用组件
│   └── main.tsx           # 应用入口
├── package.json
├── vite.config.ts         # Vite 配置
└── tsconfig.json          # TypeScript 配置
```

## 🎨 设计特色

- **🇨🇳 中文界面**: 完全中文化的学习界面
- **🖱️ 交互式演示**: 每个概念都有可操作的示例
- **⚡ 实时反馈**: 代码修改立即看到效果
- **📱 响应式设计**: 支持桌面和移动设备
- **📈 循序渐进**: 从基础到高级的合理学习路径
- **💡 最佳实践**: 每个模块都包含最佳实践指南

## 🚀 部署说明

项目支持自动部署到 GitHub Pages：

1. **推送代码**到 `source` 分支
2. **GitHub Actions** 自动构建
3. **部署**到 `master` 分支
4. **访问** `https://your-username.github.io/react-study`

## 🛠️ 开发最佳实践

### 代码规范
- ✅ 使用 TypeScript 编写组件
- ✅ 组件命名使用 PascalCase
- ✅ 保持组件职责单一
- ✅ 合理拆分组件

### 性能优化
- ✅ 使用 React.memo 优化组件
- ✅ 合理使用 useMemo 和 useCallback
- ✅ 避免在 render 中创建新对象
- ✅ 正确使用依赖数组

### 状态管理
- ✅ 保持状态结构简单
- ✅ 使用 useReducer 管理复杂状态
- ✅ 状态更新遵循不可变原则
- ✅ 避免不必要的状态

### 测试策略
- ✅ 测试用户行为，而不是实现细节
- ✅ 使用语义化查询
- ✅ 适当使用 Mock
- ✅ 保持测试简单专注

## 📚 参考资源

### 官方文档
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)

### 推荐阅读
- [React 设计模式](https://patterns.dev/posts/reactpatterns-introduction)
- [React 性能优化指南](https://react.dev/learn/render-and-commit)
- [测试最佳实践](https://testing-library.com/docs/react-testing-library/intro/)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支
3. 提交修改
4. 发起 Pull Request

## 📄 许可证

MIT License

---

## 🎉 开始学习

现在就开始你的 React 学习之旅吧！从**基础组件**开始，逐步掌握 React 的精髓。

```bash
pnpm dev
```

访问 `http://localhost:5173` 开始学习！