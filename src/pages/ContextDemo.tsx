import React, { createContext, useContext, useState, useReducer, type ReactNode } from 'react'
import './ContextDemo.css'

// Theme Context
interface Theme {
  primary: string
  secondary: string
  background: string
  text: string
}

interface ThemeContextType {
  theme: Theme
  themeName: string
  toggleTheme: () => void
}

const themes: Record<string, Theme> = {
  light: { primary: '#3498db', secondary: '#2ecc71', background: '#ffffff', text: '#2c3e50' },
  dark: { primary: '#5dade2', secondary: '#58d68d', background: '#2c3e50', text: '#ecf0f1' },
  purple: { primary: '#9b59b6', secondary: '#e74c3c', background: '#2c2c54', text: '#ffffff' }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// User Context
interface User {
  id: number
  name: string
  email: string
  role: string
}

interface UserContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Cart Context with useReducer
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(item => item.id === action.payload.id)
      if (existing) {
        const items = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return { items, total: state.total + action.payload.price }
      }
      const newItem = { ...action.payload, quantity: 1 }
      return {
        items: [...state.items, newItem],
        total: state.total + action.payload.price
      }
    }
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload)
      return {
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0)
      }
    case 'CLEAR_CART':
      return { items: [], total: 0 }
    default:
      return state
  }
}

// Custom Hooks
const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}

const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

// Providers
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState('light')
  const [theme, setTheme] = useState(themes.light)
  
  const toggleTheme = () => {
    const themeNames = Object.keys(themes)
    const currentIndex = themeNames.indexOf(themeName)
    const nextIndex = (currentIndex + 1) % themeNames.length
    const nextThemeName = themeNames[nextIndex]
    setThemeName(nextThemeName)
    setTheme(themes[nextThemeName])
  }
  
  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  
  const login = (userData: User) => setUser(userData)
  const logout = () => setUser(null)
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

// Components
const ThemeDisplay: React.FC = () => {
  const { theme, themeName, toggleTheme } = useTheme()
  
  return (
    <div className="theme-display" style={{ backgroundColor: theme.background, color: theme.text }}>
      <h4>🎨 主题控制</h4>
      <p>当前主题: <strong>{themeName}</strong></p>
      <div className="theme-colors">
        <div className="color-block" style={{ backgroundColor: theme.primary }}></div>
        <div className="color-block" style={{ backgroundColor: theme.secondary }}></div>
      </div>
      <button 
        onClick={toggleTheme}
        style={{ backgroundColor: theme.primary, color: theme.background }}
      >
        切换主题
      </button>
    </div>
  )
}

const UserProfile: React.FC = () => {
  const { user, login, logout } = useUser()
  const { theme } = useTheme()
  
  const sampleUsers = [
    { id: 1, name: '张三', email: 'zhang@example.com', role: 'admin' },
    { id: 2, name: '李四', email: 'li@example.com', role: 'user' }
  ]
  
  return (
    <div className="user-profile" style={{ backgroundColor: theme.background, color: theme.text }}>
      <h4>👤 用户信息</h4>
      {!user ? (
        <div>
          <p>选择用户登录:</p>
          {sampleUsers.map(u => (
            <button key={u.id} onClick={() => login(u)} style={{ backgroundColor: theme.primary, color: theme.background }}>
              {u.name} ({u.role})
            </button>
          ))}
        </div>
      ) : (
        <div>
          <p>欢迎, {user.name}!</p>
          <p>邮箱: {user.email}</p>
          <p>角色: {user.role}</p>
          <button onClick={logout} style={{ backgroundColor: '#e74c3c', color: 'white' }}>
            退出登录
          </button>
        </div>
      )}
    </div>
  )
}

const ShoppingCart: React.FC = () => {
  const { state, dispatch } = useCart()
  const { theme } = useTheme()
  
  const products = [
    { id: 1, name: 'MacBook Pro', price: 1999 },
    { id: 2, name: 'iPhone 15', price: 999 }
  ]
  
  return (
    <div className="shopping-cart" style={{ backgroundColor: theme.background, color: theme.text }}>
      <h4>🛒 购物车</h4>
      
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <span>{product.name} - ${product.price}</span>
            <button 
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
              style={{ backgroundColor: theme.primary, color: theme.background }}
            >
              添加
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart">
        <h5>购物车 ({state.items.length})</h5>
        {state.items.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name} x{item.quantity}</span>
            <button 
              onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
              style={{ backgroundColor: '#e74c3c', color: 'white' }}
            >
              删除
            </button>
          </div>
        ))}
        {state.items.length > 0 && (
          <>
            <p>总计: ${state.total}</p>
            <button 
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              style={{ backgroundColor: '#95a5a6', color: 'white' }}
            >
              清空购物车
            </button>
          </>
        )}
      </div>
    </div>
  )
}

const ContextDemo: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <ContextDemoContent />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

const ContextDemoContent: React.FC = () => {
  const { theme } = useTheme()
  
  return (
    <div className="context-container" style={{ backgroundColor: theme.background, color: theme.text }}>
      <h1>React Context API 🌐</h1>
      <p className="description">
        学习React Context API的使用，包括Context创建、Provider组件、useContext钩子和最佳实践
      </p>

      <section className="demo-section">
        <h2>🧠 核心概念</h2>
        <div className="concepts">
          <div className="concept">
            <h3>🌐 Context</h3>
            <p>在组件树中共享数据，避免prop drilling</p>
          </div>
          <div className="concept">
            <h3>🚀 Provider</h3>
            <p>提供数据给子组件</p>
          </div>
          <div className="concept">
            <h3>🎯 useContext</h3>
            <p>消费Context数据的Hook</p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>🎭 实际演示</h2>
        <div className="demo-grid">
          <ThemeDisplay />
          <UserProfile />
          <ShoppingCart />
        </div>
      </section>

      <section className="demo-section">
        <h2>✨ 最佳实践</h2>
        <div className="best-practices">
          <div className="practice">
            <h4>✅ 合理使用</h4>
            <ul>
              <li>用于真正的全局数据</li>
              <li>不要为每个状态创建Context</li>
              <li>避免过度嵌套Provider</li>
            </ul>
          </div>
          <div className="practice">
            <h4>⚡ 性能优化</h4>
            <ul>
              <li>拆分不同类型的Context</li>
              <li>使用React.memo防止重渲染</li>
              <li>使用useMemo优化value</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContextDemo