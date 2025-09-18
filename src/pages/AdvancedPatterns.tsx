import React, { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react'
import './AdvancedPatterns.css'

// Higher-Order Component (HOC) Pattern
interface WithLoadingProps {
  isLoading: boolean
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P & WithLoadingProps) => {
    const { isLoading, ...restProps } = props
    
    if (isLoading) {
      return (
        <div className="loading-wrapper">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )
    }
    
    return <Component {...(restProps as P)} />
  }
}

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
    useEffect(() => {
      // Simulate auth check
      const timer = setTimeout(() => setIsAuthenticated(true), 1000)
      return () => clearTimeout(timer)
    }, [])
    
    if (!isAuthenticated) {
      return (
        <div className="auth-required">
          <h4>🔒 Authentication Required</h4>
          <p>Please wait while we verify your credentials...</p>
        </div>
      )
    }
    
    return <Component {...props} />
  }
}

// Base components for HOC demo
const UserProfile: React.FC<{ user: { name: string; email: string } }> = ({ user }) => (
  <div className="user-profile-card">
    <h4>👤 User Profile</h4>
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
  </div>
)

const DataList: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="data-list-card">
    <h4>📋 Data List</h4>
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)

// Enhanced components with HOCs
const EnhancedUserProfile = withAuth(withLoading(UserProfile))
const EnhancedDataList = withLoading(DataList)

// Render Props Pattern
interface MouseTrackerProps {
  children: (position: { x: number; y: number }) => ReactNode
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return <>{children(position)}</>
}

interface DataFetcherProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: string | null) => ReactNode
}

const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (url.includes('users')) {
          setData([
            { id: 1, name: '张三', role: 'admin' },
            { id: 2, name: '李四', role: 'user' }
          ] as T)
        } else {
          setData(['Item 1', 'Item 2', 'Item 3'] as T)
        }
      } catch (err) {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [url])
  
  return <>{children(data, loading, error)}</>
}

// Custom Hooks Pattern
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => setCount(prev => prev + 1), [])
  const decrement = useCallback(() => setCount(prev => prev - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  
  return { count, increment, decrement, reset }
}

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback(() => setValue(prev => !prev), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  
  return { value, toggle, setTrue, setFalse }
}

const useLocalStorage = <T,>(key: string, initialValue: T) => {
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
      console.error('Error saving to localStorage:', error)
    }
  }, [key, storedValue])
  
  return [storedValue, setValue] as const
}

// Compound Components Pattern
interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

interface TabsProps {
  defaultTab: string
  children: ReactNode
}

const Tabs: React.FC<TabsProps> & {
  List: React.FC<{ children: ReactNode }>
  Tab: React.FC<{ id: string; children: ReactNode }>
  Panels: React.FC<{ children: ReactNode }>
  Panel: React.FC<{ id: string; children: ReactNode }>
} = ({ defaultTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

Tabs.List = ({ children }) => (
  <div className="tabs-list">
    {children}
  </div>
)

Tabs.Tab = ({ id, children }) => {
  const { activeTab, setActiveTab } = useTabs()
  
  return (
    <button
      className={`tab-button ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  )
}

Tabs.Panels = ({ children }) => (
  <div className="tabs-panels">
    {children}
  </div>
)

Tabs.Panel = ({ id, children }) => {
  const { activeTab } = useTabs()
  
  if (activeTab !== id) return null
  
  return (
    <div className="tab-panel">
      {children}
    </div>
  )
}

// Component Demos
const HOCDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [userLoading, setUserLoading] = useState(false)
  
  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }
  
  const simulateUserLoading = () => {
    setUserLoading(true)
    setTimeout(() => setUserLoading(false), 2000)
  }
  
  return (
    <div className="hoc-demo">
      <h4>🔧 Higher-Order Components (HOC)</h4>
      
      <div className="demo-controls">
        <button onClick={simulateLoading}>Simulate Data Loading</button>
        <button onClick={simulateUserLoading}>Simulate User Loading</button>
      </div>
      
      <div className="hoc-examples">
        <EnhancedDataList 
          isLoading={isLoading}
          items={['React', 'Vue', 'Angular', 'Svelte']}
        />
        
        <EnhancedUserProfile 
          isLoading={userLoading}
          user={{ name: '张三', email: 'zhang@example.com' }}
        />
      </div>
      
      <div className="explanation">
        <p><strong>HOC特点:</strong></p>
        <ul>
          <li>🔄 组件逻辑复用</li>
          <li>🎯 关注点分离</li>
          <li>📦 功能组合</li>
        </ul>
      </div>
    </div>
  )
}

const RenderPropsDemo: React.FC = () => {
  return (
    <div className="render-props-demo">
      <h4>🎭 Render Props Pattern</h4>
      
      <div className="render-props-examples">
        <div className="mouse-tracker-demo">
          <h5>🐭 鼠标位置追踪:</h5>
          <MouseTracker>
            {({ x, y }) => (
              <div className="mouse-display">
                <p>鼠标位置: ({x}, {y})</p>
                <div 
                  className="mouse-follower"
                  style={{ left: x - 10, top: y - 10 }}
                />
              </div>
            )}
          </MouseTracker>
        </div>
        
        <div className="data-fetcher-demo">
          <h5>📡 数据获取:</h5>
          <DataFetcher<Array<{ id: number; name: string; role: string }>> url="/api/users">
            {(data, loading, error) => {
              if (loading) return <div className="loading-state">Loading users...</div>
              if (error) return <div className="error-state">Error: {error}</div>
              if (!data) return <div>No data</div>
              
              return (
                <div className="users-list">
                  {data.map(user => (
                    <div key={user.id} className="user-item">
                      <span>{user.name}</span>
                      <span className="role">{user.role}</span>
                    </div>
                  ))}
                </div>
              )
            }}
          </DataFetcher>
        </div>
      </div>
      
      <div className="explanation">
        <p><strong>Render Props特点:</strong></p>
        <ul>
          <li>🎯 灵活的渲染控制</li>
          <li>🔄 逻辑与UI分离</li>
          <li>💪 强大的组合能力</li>
        </ul>
      </div>
    </div>
  )
}

const CustomHooksDemo: React.FC = () => {
  const { count, increment, decrement, reset } = useCounter(0)
  const { value: isVisible, toggle, setTrue, setFalse } = useToggle(false)
  const [name, setName] = useLocalStorage('user-name', '')
  
  return (
    <div className="custom-hooks-demo">
      <h4>🪝 Custom Hooks Pattern</h4>
      
      <div className="hooks-examples">
        <div className="counter-hook">
          <h5>🔢 useCounter Hook:</h5>
          <div className="counter-display">
            <button onClick={decrement}>-</button>
            <span className="count">{count}</span>
            <button onClick={increment}>+</button>
            <button onClick={reset} className="reset-btn">Reset</button>
          </div>
        </div>
        
        <div className="toggle-hook">
          <h5>🔄 useToggle Hook:</h5>
          <div className="toggle-controls">
            <button onClick={toggle}>Toggle: {isVisible ? '✅' : '❌'}</button>
            <button onClick={setTrue}>Show</button>
            <button onClick={setFalse}>Hide</button>
          </div>
          {isVisible && (
            <div className="toggle-content">
              <p>🎉 This content is now visible!</p>
            </div>
          )}
        </div>
        
        <div className="localstorage-hook">
          <h5>💾 useLocalStorage Hook:</h5>
          <div className="storage-controls">
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <p>Stored name: <strong>{name || 'None'}</strong></p>
          </div>
        </div>
      </div>
      
      <div className="explanation">
        <p><strong>Custom Hooks优势:</strong></p>
        <ul>
          <li>🔄 状态逻辑复用</li>
          <li>🧹 组件代码简洁</li>
          <li>🔧 易于测试</li>
        </ul>
      </div>
    </div>
  )
}

const CompoundComponentsDemo: React.FC = () => {
  return (
    <div className="compound-components-demo">
      <h4>🏗️ Compound Components Pattern</h4>
      
      <div className="compound-example">
        <Tabs defaultTab="overview">
          <Tabs.List>
            <Tabs.Tab id="overview">📋 Overview</Tabs.Tab>
            <Tabs.Tab id="features">⭐ Features</Tabs.Tab>
            <Tabs.Tab id="examples">💡 Examples</Tabs.Tab>
          </Tabs.List>
          
          <Tabs.Panels>
            <Tabs.Panel id="overview">
              <div className="panel-content">
                <h5>Compound Components Overview</h5>
                <p>复合组件模式允许创建多个组件协同工作的API，提供了灵活且直观的使用方式。</p>
                <ul>
                  <li>组件间状态共享</li>
                  <li>声明式API</li>
                  <li>灵活的组合方式</li>
                </ul>
              </div>
            </Tabs.Panel>
            
            <Tabs.Panel id="features">
              <div className="panel-content">
                <h5>Key Features</h5>
                <div className="features-grid">
                  <div className="feature-item">
                    <h6>🎯 Context共享</h6>
                    <p>通过Context在组件间共享状态</p>
                  </div>
                  <div className="feature-item">
                    <h6>🔧 灵活组合</h6>
                    <p>用户可以自由组合子组件</p>
                  </div>
                  <div className="feature-item">
                    <h6>📝 声明式</h6>
                    <p>清晰的组件层次结构</p>
                  </div>
                </div>
              </div>
            </Tabs.Panel>
            
            <Tabs.Panel id="examples">
              <div className="panel-content">
                <h5>Common Examples</h5>
                <p>复合组件模式常见于:</p>
                <ul>
                  <li>🗂️ Tabs组件 (如本示例)</li>
                  <li>📋 Form组件</li>
                  <li>🎛️ Modal组件</li>
                  <li>🗃️ Accordion组件</li>
                  <li>🎮 Menu组件</li>
                </ul>
              </div>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>
      
      <div className="explanation">
        <p><strong>Compound Components特点:</strong></p>
        <ul>
          <li>🎯 直观的API设计</li>
          <li>🔧 高度可定制</li>
          <li>📦 封装复杂逻辑</li>
        </ul>
      </div>
    </div>
  )
}

const AdvancedPatterns: React.FC = () => {
  return (
    <div className="advanced-patterns-container">
      <h1>Advanced Patterns 🚀</h1>
      <p className="description">
        学习React高级模式和设计模式，包括HOC、Render Props、Custom Hooks和Compound Components
      </p>

      <section className="demo-section">
        <h2>🧠 核心概念</h2>
        <div className="concepts-overview">
          <div className="concept-card">
            <h3>🔧 Higher-Order Components</h3>
            <p>接受组件并返回新组件的函数，用于逻辑复用和功能增强</p>
          </div>
          <div className="concept-card">
            <h3>🎭 Render Props</h3>
            <p>使用函数作为prop来共享组件间的逻辑</p>
          </div>
          <div className="concept-card">
            <h3>🪝 Custom Hooks</h3>
            <p>提取和复用组件逻辑的现代方式</p>
          </div>
          <div className="concept-card">
            <h3>🏗️ Compound Components</h3>
            <p>多个组件协同工作，提供灵活的API</p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>🎭 实际演示</h2>
        <div className="patterns-demos">
          <HOCDemo />
          <RenderPropsDemo />
          <CustomHooksDemo />
          <CompoundComponentsDemo />
        </div>
      </section>

      <section className="demo-section">
        <h2>✨ 最佳实践</h2>
        <div className="best-practices-grid">
          <div className="practice-section">
            <h4>🎯 选择合适的模式</h4>
            <ul>
              <li>Simple logic reuse → Custom Hooks</li>
              <li>Component enhancement → HOC</li>
              <li>Flexible rendering → Render Props</li>
              <li>Related components → Compound Components</li>
            </ul>
          </div>
          <div className="practice-section">
            <h4>⚡ 性能考虑</h4>
            <ul>
              <li>避免在render中创建HOC</li>
              <li>合理使用React.memo</li>
              <li>注意Context更新频率</li>
              <li>优化依赖数组</li>
            </ul>
          </div>
          <div className="practice-section">
            <h4>🔧 代码质量</h4>
            <ul>
              <li>保持组件职责单一</li>
              <li>提供清晰的TypeScript类型</li>
              <li>编写完善的错误处理</li>
              <li>添加适当的测试</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdvancedPatterns