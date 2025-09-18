import React, { useState, useEffect } from 'react'
import './TestingDemo.css'

// Simple Calculator Component for testing
interface CalculatorProps {
  onCalculate?: (result: number) => void
}

const Calculator: React.FC<CalculatorProps> = ({ onCalculate }) => {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [operation, setOperation] = useState('+')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState('')

  const calculate = () => {
    const n1 = parseFloat(num1)
    const n2 = parseFloat(num2)
    
    if (isNaN(n1) || isNaN(n2)) {
      setError('Please enter valid numbers')
      return
    }
    
    setError('')
    let calculatedResult: number
    
    switch (operation) {
      case '+':
        calculatedResult = n1 + n2
        break
      case '-':
        calculatedResult = n1 - n2
        break
      case '*':
        calculatedResult = n1 * n2
        break
      case '/':
        if (n2 === 0) {
          setError('Cannot divide by zero')
          return
        }
        calculatedResult = n1 / n2
        break
      default:
        calculatedResult = 0
    }
    
    setResult(calculatedResult)
    onCalculate?.(calculatedResult)
  }

  const clear = () => {
    setNum1('')
    setNum2('')
    setResult(null)
    setError('')
  }

  return (
    <div className="calculator" data-testid="calculator">
      <h4>🧮 Simple Calculator</h4>
      
      <div className="calculator-inputs">
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="First number"
          data-testid="num1-input"
        />
        
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          data-testid="operation-select"
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
        
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Second number"
          data-testid="num2-input"
        />
      </div>
      
      <div className="calculator-actions">
        <button onClick={calculate} data-testid="calculate-btn">
          Calculate
        </button>
        <button onClick={clear} data-testid="clear-btn">
          Clear
        </button>
      </div>
      
      {error && (
        <div className="error-message" data-testid="error-message">
          {error}
        </div>
      )}
      
      {result !== null && (
        <div className="result" data-testid="result">
          Result: {result}
        </div>
      )}
    </div>
  )
}

// User List Component for testing
interface User {
  id: number
  name: string
  email: string
  active: boolean
}

interface UserListProps {
  users: User[]
  onUserToggle?: (id: number) => void
  onUserDelete?: (id: number) => void
}

const UserList: React.FC<UserListProps> = ({ users, onUserToggle, onUserDelete }) => {
  if (users.length === 0) {
    return (
      <div className="empty-list" data-testid="empty-list">
        No users found
      </div>
    )
  }

  return (
    <div className="user-list" data-testid="user-list">
      <h4>👥 User List</h4>
      {users.map(user => (
        <div 
          key={user.id} 
          className={`user-item ${user.active ? 'active' : 'inactive'}`}
          data-testid={`user-${user.id}`}
        >
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
            <span className={`user-status ${user.active ? 'active' : 'inactive'}`}>
              {user.active ? '✅ Active' : '❌ Inactive'}
            </span>
          </div>
          
          <div className="user-actions">
            <button
              onClick={() => onUserToggle?.(user.id)}
              data-testid={`toggle-${user.id}`}
            >
              {user.active ? 'Deactivate' : 'Activate'}
            </button>
            <button
              onClick={() => onUserDelete?.(user.id)}
              className="delete-btn"
              data-testid={`delete-${user.id}`}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Async Data Component for testing
interface AsyncDataProps {
  url: string
}

const AsyncData: React.FC<AsyncDataProps> = ({ url }) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (url.includes('error')) {
          throw new Error('API Error: Failed to fetch data')
        }
        
        const mockData = {
          message: `Data from ${url}`,
          timestamp: Date.now(),
          items: ['Item 1', 'Item 2', 'Item 3']
        }
        
        setData(mockData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  if (loading) {
    return (
      <div className="loading" data-testid="loading">
        <div className="spinner"></div>
        Loading data...
      </div>
    )
  }

  if (error) {
    return (
      <div className="error" data-testid="error">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="async-data" data-testid="async-data">
      <h4>📡 Async Data</h4>
      <p><strong>Message:</strong> {data.message}</p>
      <p><strong>Timestamp:</strong> {new Date(data.timestamp).toLocaleString()}</p>
      <div className="data-items">
        <strong>Items:</strong>
        <ul>
          {data.items.map((item: string, index: number) => (
            <li key={index} data-testid={`item-${index}`}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Form Component for testing
interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setSubmitted(true)
      // Simulate form submission
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (submitted) {
    return (
      <div className="success-message" data-testid="success-message">
        ✅ Registration successful!
      </div>
    )
  }

  return (
    <form className="registration-form" onSubmit={handleSubmit} data-testid="registration-form">
      <h4>📝 Registration Form</h4>
      
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={handleChange('username')}
          data-testid="username-input"
        />
        {errors.username && (
          <span className="error-text" data-testid="username-error">
            {errors.username}
          </span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          data-testid="email-input"
        />
        {errors.email && (
          <span className="error-text" data-testid="email-error">
            {errors.email}
          </span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          data-testid="password-input"
        />
        {errors.password && (
          <span className="error-text" data-testid="password-error">
            {errors.password}
          </span>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          data-testid="confirm-password-input"
        />
        {errors.confirmPassword && (
          <span className="error-text" data-testid="confirm-password-error">
            {errors.confirmPassword}
          </span>
        )}
      </div>
      
      <button type="submit" data-testid="submit-btn">
        Register
      </button>
    </form>
  )
}

// Main Testing Demo Component
const TestingDemo: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: '张三', email: 'zhang@example.com', active: true },
    { id: 2, name: '李四', email: 'li@example.com', active: false },
    { id: 3, name: '王五', email: 'wang@example.com', active: true }
  ])
  
  const [calculatorResults, setCalculatorResults] = useState<number[]>([])
  const [dataUrl, setDataUrl] = useState('/api/data')

  const handleUserToggle = (id: number) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, active: !user.active } : user
    ))
  }

  const handleUserDelete = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id))
  }

  const handleCalculatorResult = (result: number) => {
    setCalculatorResults(prev => [...prev, result])
  }

  const clearCalculatorHistory = () => {
    setCalculatorResults([])
  }

  return (
    <div className="testing-container">
      <h1>Testing Demo 🧪</h1>
      <p className="description">
        学习React组件测试的各种场景，包括用户交互、异步操作、表单验证和状态管理测试
      </p>

      <section className="demo-section">
        <h2>🧠 测试概念</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>🔍 单元测试</h3>
            <p>测试单个组件或函数的功能</p>
            <ul>
              <li>组件渲染</li>
              <li>Props处理</li>
              <li>事件响应</li>
            </ul>
          </div>
          
          <div className="concept-card">
            <h3>🔗 集成测试</h3>
            <p>测试多个组件协同工作</p>
            <ul>
              <li>组件交互</li>
              <li>数据流转</li>
              <li>用户流程</li>
            </ul>
          </div>
          
          <div className="concept-card">
            <h3>🎭 端到端测试</h3>
            <p>测试完整的用户场景</p>
            <ul>
              <li>用户操作</li>
              <li>页面跳转</li>
              <li>完整流程</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>🧪 测试示例组件</h2>
        
        <div className="testing-examples">
          <div className="example-group">
            <Calculator onCalculate={handleCalculatorResult} />
            
            {calculatorResults.length > 0 && (
              <div className="calculator-history">
                <h5>📊 计算历史:</h5>
                <div className="history-items">
                  {calculatorResults.map((result, index) => (
                    <span key={index} className="history-item">
                      {result}
                    </span>
                  ))}
                </div>
                <button onClick={clearCalculatorHistory} className="clear-history">
                  清除历史
                </button>
              </div>
            )}
          </div>
          
          <div className="example-group">
            <UserList 
              users={users}
              onUserToggle={handleUserToggle}
              onUserDelete={handleUserDelete}
            />
          </div>
          
          <div className="example-group">
            <div className="async-controls">
              <h5>🔧 Async Data Controls:</h5>
              <div className="url-controls">
                <button onClick={() => setDataUrl('/api/data')}>Normal Data</button>
                <button onClick={() => setDataUrl('/api/error')}>Error Data</button>
              </div>
            </div>
            <AsyncData url={dataUrl} key={dataUrl} />
          </div>
          
          <div className="example-group">
            <RegistrationForm />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>📝 测试代码示例</h2>
        <div className="test-examples">
          <div className="test-category">
            <h4>🧮 Calculator 测试</h4>
            <div className="code-example">
              <pre><code>{`// Calculator.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Calculator from './Calculator'

describe('Calculator', () => {
  test('performs addition correctly', () => {
    render(<Calculator />)
    
    fireEvent.change(screen.getByTestId('num1-input'), {
      target: { value: '10' }
    })
    fireEvent.change(screen.getByTestId('num2-input'), {
      target: { value: '5' }
    })
    fireEvent.click(screen.getByTestId('calculate-btn'))
    
    expect(screen.getByTestId('result')).toHaveTextContent('Result: 15')
  })
  
  test('shows error for division by zero', () => {
    render(<Calculator />)
    
    fireEvent.change(screen.getByTestId('num1-input'), {
      target: { value: '10' }
    })
    fireEvent.change(screen.getByTestId('operation-select'), {
      target: { value: '/' }
    })
    fireEvent.change(screen.getByTestId('num2-input'), {
      target: { value: '0' }
    })
    fireEvent.click(screen.getByTestId('calculate-btn'))
    
    expect(screen.getByTestId('error-message'))
      .toHaveTextContent('Cannot divide by zero')
  })
})`}</code></pre>
            </div>
          </div>
          
          <div className="test-category">
            <h4>👥 UserList 测试</h4>
            <div className="code-example">
              <pre><code>{`// UserList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import UserList from './UserList'

const mockUsers = [
  { id: 1, name: '张三', email: 'zhang@example.com', active: true },
  { id: 2, name: '李四', email: 'li@example.com', active: false }
]

describe('UserList', () => {
  test('renders user list correctly', () => {
    render(<UserList users={mockUsers} />)
    
    expect(screen.getByText('张三')).toBeInTheDocument()
    expect(screen.getByText('li@example.com')).toBeInTheDocument()
  })
  
  test('calls onUserToggle when toggle button clicked', () => {
    const mockToggle = jest.fn()
    render(<UserList users={mockUsers} onUserToggle={mockToggle} />)
    
    fireEvent.click(screen.getByTestId('toggle-1'))
    expect(mockToggle).toHaveBeenCalledWith(1)
  })
  
  test('shows empty message when no users', () => {
    render(<UserList users={[]} />)
    expect(screen.getByTestId('empty-list')).toHaveTextContent('No users found')
  })
})`}</code></pre>
            </div>
          </div>
          
          <div className="test-category">
            <h4>📡 AsyncData 测试</h4>
            <div className="code-example">
              <pre><code>{`// AsyncData.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import AsyncData from './AsyncData'

describe('AsyncData', () => {
  test('shows loading state initially', () => {
    render(<AsyncData url="/api/data" />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })
  
  test('shows data after loading', async () => {
    render(<AsyncData url="/api/data" />)
    
    await waitFor(() => {
      expect(screen.getByTestId('async-data')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Data from /api/data')).toBeInTheDocument()
  })
  
  test('shows error state on API error', async () => {
    render(<AsyncData url="/api/error" />)
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })
    
    expect(screen.getByText(/API Error/)).toBeInTheDocument()
  })
})`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>✨ 测试最佳实践</h2>
        <div className="best-practices">
          <div className="practice-item">
            <h4>🎯 测试策略</h4>
            <ul>
              <li>✅ 从用户角度编写测试</li>
              <li>✅ 测试行为而非实现</li>
              <li>✅ 使用语义化的查询方式</li>
              <li>✅ 避免测试实现细节</li>
            </ul>
          </div>
          
          <div className="practice-item">
            <h4>🔧 工具选择</h4>
            <ul>
              <li>📚 Jest - 测试框架</li>
              <li>🧪 React Testing Library - 组件测试</li>
              <li>🎭 MSW - API Mock</li>
              <li>🔍 Testing Playground - 查询调试</li>
            </ul>
          </div>
          
          <div className="practice-item">
            <h4>⚡ 测试技巧</h4>
            <ul>
              <li>✅ 使用data-testid作为稳定选择器</li>
              <li>✅ 测试异步操作时使用waitFor</li>
              <li>✅ 模拟外部依赖</li>
              <li>✅ 保持测试简单和专注</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TestingDemo