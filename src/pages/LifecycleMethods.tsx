import React, { useState, useEffect, useRef, useCallback } from 'react'
import './LifecycleMethods.css'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface User {
  id: number
  name: string
  email: string
}

interface TimerComponentProps {
  onTimeUpdate: (time: number) => void
}

// 生命周期钩子演示组件
const TimerComponent: React.FC<TimerComponentProps> = ({ onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<number | null>(null)

  // 组件挂载时启动计时器 (componentDidMount 等效)
  useEffect(() => {
    console.log('⏰ Timer 组件已挂载')
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        const newTime = prev + 1
        onTimeUpdate(newTime)
        return newTime
      })
    }, 1000)

    // 清理函数 (componentWillUnmount 等效)
    return () => {
      console.log('⏰ Timer 组件将要卸载')
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [onTimeUpdate])

  // 当 seconds 变化时执行 (componentDidUpdate 等效)
  useEffect(() => {
    console.log(`⏰ Timer 更新: ${seconds} 秒`)
    document.title = `计时器: ${seconds}s`

    // 清理 document.title
    return () => {
      document.title = 'React Study'
    }
  }, [seconds])

  return (
    <div className="timer-component">
      <h4>⏰ 计时器组件</h4>
      <div className="timer-display">
        <span className="time-value">{seconds}</span>
        <span className="time-unit">秒</span>
      </div>
      <div className="timer-info">
        <p>这个组件演示了 useEffect 的不同用法：</p>
        <ul>
          <li>空依赖数组 [] - 仅在挂载/卸载时执行</li>
          <li>有依赖数组 [seconds] - 在依赖变化时执行</li>
          <li>返回清理函数 - 相当于 componentWillUnmount</li>
        </ul>
      </div>
    </div>
  )
}

// 数据获取组件
const DataFetcher: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<number>(1)
  const abortControllerRef = useRef<AbortController | null>(null)

  // 模拟 API 调用
  const mockFetchPosts = useCallback(async (userId: number, signal: AbortSignal): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟网络延迟
    
    if (signal.aborted) {
      throw new Error('请求被取消')
    }
    
    return [
      { id: 1, title: `用户${userId}的第一篇文章`, body: '这是文章内容...', userId },
      { id: 2, title: `用户${userId}的第二篇文章`, body: '这是另一篇文章内容...', userId },
      { id: 3, title: `用户${userId}的第三篇文章`, body: '更多精彩内容...', userId }
    ]
  }, [])

  const mockFetchUsers = useCallback(async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return [
      { id: 1, name: '张三', email: 'zhang@example.com' },
      { id: 2, name: '李四', email: 'li@example.com' },
      { id: 3, name: '王五', email: 'wang@example.com' }
    ]
  }, [])

  // 获取用户列表 (仅在组件挂载时执行)
  useEffect(() => {
    console.log('📡 开始获取用户列表')
    
    const fetchUsers = async () => {
      try {
        const userData = await mockFetchUsers()
        setUsers(userData)
        console.log('✅ 用户列表获取成功')
      } catch (err) {
        console.error('❌ 获取用户列表失败:', err)
        setError('获取用户列表失败')
      }
    }

    fetchUsers()
  }, [mockFetchUsers])

  // 根据选中用户获取文章 (当 selectedUserId 变化时执行)
  useEffect(() => {
    console.log(`📡 开始获取用户${selectedUserId}的文章`)
    
    // 取消之前的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    // 创建新的 AbortController
    abortControllerRef.current = new AbortController()
    const currentController = abortControllerRef.current
    
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const postData = await mockFetchPosts(selectedUserId, currentController.signal)
        
        if (!currentController.signal.aborted) {
          setPosts(postData)
          console.log('✅ 文章获取成功')
        }
      } catch (err) {
        if (!currentController.signal.aborted) {
          console.error('❌ 获取文章失败:', err)
          setError('获取文章失败')
        }
      } finally {
        if (!currentController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPosts()

    // 清理函数：取消请求
    return () => {
      if (currentController) {
        currentController.abort()
      }
    }
  }, [selectedUserId, mockFetchPosts])

  // 组件卸载时取消所有请求
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return (
    <div className="data-fetcher">
      <h4>📡 数据获取组件</h4>
      
      <div className="user-selector">
        <label>选择用户:</label>
        <select 
          value={selectedUserId} 
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
          className="user-select"
        >
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <span>正在加载文章...</span>
        </div>
      )}

      {error && (
        <div className="error">
          <span>❌ {error}</span>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="posts-list">
          <h5>📝 文章列表</h5>
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h6>{post.title}</h6>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}

      <div className="lifecycle-info">
        <p>这个组件演示了:</p>
        <ul>
          <li>🔄 数据获取的生命周期管理</li>
          <li>🚫 取消网络请求防止内存泄漏</li>
          <li>⚡ 依赖变化时重新获取数据</li>
          <li>🛡️ 错误处理和加载状态</li>
        </ul>
      </div>
    </div>
  )
}

// 窗口大小监听组件
const WindowSizeTracker: React.FC = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  
  const [resizeCount, setResizeCount] = useState(0)

  useEffect(() => {
    console.log('🖼️ 开始监听窗口大小变化')
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
      setResizeCount(prev => prev + 1)
      console.log('🖼️ 窗口大小已变化')
    }

    // 添加事件监听器
    window.addEventListener('resize', handleResize)

    // 清理事件监听器
    return () => {
      console.log('🖼️ 停止监听窗口大小变化')
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="window-tracker">
      <h4>🖼️ 窗口大小追踪器</h4>
      <div className="size-display">
        <div className="size-item">
          <span className="label">宽度:</span>
          <span className="value">{windowSize.width}px</span>
        </div>
        <div className="size-item">
          <span className="label">高度:</span>
          <span className="value">{windowSize.height}px</span>
        </div>
        <div className="size-item">
          <span className="label">变化次数:</span>
          <span className="value">{resizeCount}</span>
        </div>
      </div>
      <div className="responsive-info">
        <p>🖥️ 设备类型: {windowSize.width < 768 ? '移动设备' : windowSize.width < 1024 ? '平板设备' : '桌面设备'}</p>
      </div>
      <div className="tracker-info">
        <p>这个组件演示了:</p>
        <ul>
          <li>🎯 事件监听器的正确添加和清理</li>
          <li>🔄 实时响应窗口大小变化</li>
          <li>📱 响应式设计的基础</li>
        </ul>
      </div>
    </div>
  )
}

// 主组件
const LifecycleMethods: React.FC = () => {
  const [showTimer, setShowTimer] = useState(true)
  const [showDataFetcher, setShowDataFetcher] = useState(true)
  const [showWindowTracker, setShowWindowTracker] = useState(true)
  const [totalTime, setTotalTime] = useState(0)
  const [mountCount, setMountCount] = useState(0)

  const handleTimeUpdate = useCallback((time: number) => {
    setTotalTime(time)
  }, [])

  const toggleComponent = (component: string) => {
    switch (component) {
      case 'timer':
        setShowTimer(prev => {
          if (!prev) setMountCount(count => count + 1)
          return !prev
        })
        break
      case 'dataFetcher':
        setShowDataFetcher(prev => !prev)
        break
      case 'windowTracker':
        setShowWindowTracker(prev => !prev)
        break
    }
  }

  // 组件挂载时的日志
  useEffect(() => {
    console.log('🏠 LifecycleMethods 主组件已挂载')
    
    return () => {
      console.log('🏠 LifecycleMethods 主组件将要卸载')
    }
  }, [])

  return (
    <div className="lifecycle-container">
      <h1>Lifecycle Methods & useEffect 🔄</h1>
      <p className="description">
        学习React组件生命周期和useEffect钩子的使用，包括挂载、更新、卸载以及副作用处理
      </p>

      {/* 概念说明 */}
      <section className="demo-section">
        <h2>🧠 核心概念</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>🔧 useEffect</h3>
            <p>React函数组件中的副作用钩子，相当于类组件中的生命周期方法</p>
            <ul>
              <li><code>useEffect(() =&gt; {}, [])</code> - 挂载时执行</li>
              <li><code>useEffect(() =&gt; {}, [dep])</code> - 依赖变化时执行</li>
              <li><code>useEffect(() =&gt; () =&gt; {})</code> - 返回清理函数</li>
            </ul>
          </div>
          
          <div className="concept-card">
            <h3>🎯 副作用</h3>
            <p>组件渲染之外的操作，如API调用、订阅、DOM操作等</p>
            <ul>
              <li>数据获取 (Data Fetching)</li>
              <li>事件监听 (Event Listeners)</li>
              <li>定时器 (Timers)</li>
              <li>手动DOM操作</li>
            </ul>
          </div>
          
          <div className="concept-card">
            <h3>🧹 清理</h3>
            <p>防止内存泄漏和不必要的副作用</p>
            <ul>
              <li>清除定时器</li>
              <li>取消网络请求</li>
              <li>移除事件监听器</li>
              <li>取消订阅</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 组件控制面板 */}
      <section className="demo-section">
        <h2>🎮 组件控制面板</h2>
        <div className="control-panel">
          <div className="control-item">
            <button 
              onClick={() => toggleComponent('timer')}
              className={`control-btn ${showTimer ? 'active' : 'inactive'}`}
            >
              {showTimer ? '⏸️ 停止计时器' : '▶️ 启动计时器'}
            </button>
            <span className="status">
              总时间: {totalTime}s | 挂载次数: {mountCount}
            </span>
          </div>
          
          <div className="control-item">
            <button 
              onClick={() => toggleComponent('dataFetcher')}
              className={`control-btn ${showDataFetcher ? 'active' : 'inactive'}`}
            >
              {showDataFetcher ? '🔌 卸载数据组件' : '🔗 挂载数据组件'}
            </button>
          </div>
          
          <div className="control-item">
            <button 
              onClick={() => toggleComponent('windowTracker')}
              className={`control-btn ${showWindowTracker ? 'active' : 'inactive'}`}
            >
              {showWindowTracker ? '🔇 停止窗口监听' : '🔊 开始窗口监听'}
            </button>
          </div>
        </div>
        
        <div className="panel-info">
          <p>💡 打开浏览器的开发者工具查看控制台输出，观察组件的生命周期</p>
        </div>
      </section>

      {/* 动态组件展示 */}
      <section className="demo-section">
        <h2>🎭 动态组件演示</h2>
        
        <div className="components-grid">
          {showTimer && (
            <TimerComponent onTimeUpdate={handleTimeUpdate} />
          )}
          
          {showDataFetcher && (
            <DataFetcher />
          )}
          
          {showWindowTracker && (
            <WindowSizeTracker />
          )}
        </div>
        
        {!showTimer && !showDataFetcher && !showWindowTracker && (
          <div className="no-components">
            <p>🚫 所有组件都已卸载</p>
            <p>使用上面的控制面板重新挂载组件</p>
          </div>
        )}
      </section>

      {/* 最佳实践 */}
      <section className="demo-section">
        <h2>✨ 最佳实践</h2>
        <div className="best-practices">
          <div className="practice-item">
            <h4>1. 🎯 正确使用依赖数组</h4>
            <ul>
              <li>✅ 包含所有在effect中使用的变量</li>
              <li>✅ 使用useCallback和useMemo优化依赖</li>
              <li>❌ 不要省略必要的依赖</li>
            </ul>
          </div>
          
          <div className="practice-item">
            <h4>2. 🧹 总是进行清理</h4>
            <ul>
              <li>✅ 清除定时器和间隔器</li>
              <li>✅ 取消网络请求</li>
              <li>✅ 移除事件监听器</li>
              <li>✅ 取消订阅</li>
            </ul>
          </div>
          
          <div className="practice-item">
            <h4>3. ⚡ 优化性能</h4>
            <ul>
              <li>✅ 使用空依赖数组进行一次性操作</li>
              <li>✅ 拆分多个useEffect按职责分离</li>
              <li>✅ 避免在effect中创建新对象</li>
            </ul>
          </div>
          
          <div className="practice-item">
            <h4>4. 🛡️ 错误处理</h4>
            <ul>
              <li>✅ 使用try-catch处理异步操作</li>
              <li>✅ 检查组件是否已卸载</li>
              <li>✅ 使用AbortController取消请求</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LifecycleMethods