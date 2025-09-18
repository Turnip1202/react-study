import React, { useState } from 'react'
import './ConditionalRendering.css'

// 用户权限枚举
type UserRole = 'guest' | 'user' | 'admin'

interface User {
  id: number
  name: string
  role: UserRole
  isOnline: boolean
}

// 三元运算符示例
const LoginStatus: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  return (
    <div className="status-card">
      <h4>登录状态</h4>
      <p>{isLoggedIn ? '欢迎回来！' : '请先登录'}</p>
      <span className={`status-indicator ${isLoggedIn ? 'online' : 'offline'}`}>
        {isLoggedIn ? '在线' : '离线'}
      </span>
    </div>
  )
}

// 逻辑与运算符示例
const NotificationBanner: React.FC<{ 
  hasNotifications: boolean
  count: number 
}> = ({ hasNotifications, count }) => {
  return (
    <div className="notification-section">
      <h4>通知消息</h4>
      {hasNotifications && (
        <div className="notification-banner">
          <span>您有 {count} 条新消息</span>
          <button>查看</button>
        </div>
      )}
      {!hasNotifications && (
        <p className="no-notifications">暂无新消息</p>
      )}
    </div>
  )
}

// 多条件渲染示例
const UserProfile: React.FC<{ user: User | null }> = ({ user }) => {
  const getRoleDisplay = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return { text: '管理员', color: 'red' }
      case 'user':
        return { text: '普通用户', color: 'blue' }
      case 'guest':
        return { text: '访客', color: 'gray' }
      default:
        return { text: '未知', color: 'gray' }
    }
  }

  if (!user) {
    return (
      <div className="user-profile">
        <p>用户信息加载中...</p>
      </div>
    )
  }

  const roleInfo = getRoleDisplay(user.role)

  return (
    <div className="user-profile">
      <div className="user-header">
        <h4>{user.name}</h4>
        <span 
          className="role-badge" 
          style={{ backgroundColor: roleInfo.color }}
        >
          {roleInfo.text}
        </span>
      </div>
      
      {/* 根据用户角色显示不同功能 */}
      {user.role === 'admin' && (
        <div className="admin-panel">
          <h5>管理员功能</h5>
          <button>用户管理</button>
          <button>系统设置</button>
        </div>
      )}
      
      {user.role === 'user' && (
        <div className="user-panel">
          <h5>用户功能</h5>
          <button>个人设置</button>
          <button>我的订单</button>
        </div>
      )}
      
      {user.role === 'guest' && (
        <div className="guest-panel">
          <p>请注册账号以获得更多功能</p>
          <button>立即注册</button>
        </div>
      )}
    </div>
  )
}

// 列表条件渲染示例
const ProductList: React.FC = () => {
  const [products] = useState([
    { id: 1, name: 'iPhone 15', price: 6999, inStock: true },
    { id: 2, name: 'MacBook Pro', price: 12999, inStock: false },
    { id: 3, name: 'iPad Air', price: 4999, inStock: true },
  ])
  
  const [showOutOfStock, setShowOutOfStock] = useState(false)

  const filteredProducts = showOutOfStock 
    ? products 
    : products.filter(product => product.inStock)

  return (
    <div className="product-section">
      <div className="product-controls">
        <h4>商品列表</h4>
        <label>
          <input
            type="checkbox"
            checked={showOutOfStock}
            onChange={(e) => setShowOutOfStock(e.target.checked)}
          />
          显示缺货商品
        </label>
      </div>
      
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <h5>{product.name}</h5>
              <p>¥{product.price}</p>
              {product.inStock ? (
                <button className="add-to-cart">加入购物车</button>
              ) : (
                <button className="out-of-stock" disabled>
                  缺货
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="empty-message">没有符合条件的商品</p>
        )}
      </div>
    </div>
  )
}

// 复杂条件渲染示例
const WeatherWidget: React.FC = () => {
  const [weather] = useState({
    temperature: 22,
    condition: 'sunny', // sunny, rainy, cloudy, snowy
    humidity: 65,
    windSpeed: 12
  })

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny': return '☀️'
      case 'rainy': return '🌧️'
      case 'cloudy': return '☁️'
      case 'snowy': return '❄️'
      default: return '🌤️'
    }
  }

  const getTemperatureColor = (temp: number) => {
    if (temp > 30) return '#ff4444'
    if (temp > 20) return '#ff9944'
    if (temp > 10) return '#44ff44'
    return '#4444ff'
  }

  const getComfortLevel = () => {
    const { temperature, humidity } = weather
    
    if (temperature > 35 || temperature < 0) {
      return { level: '极端', color: '#ff0000' }
    }
    if (temperature > 28 && humidity > 70) {
      return { level: '闷热', color: '#ff6600' }
    }
    if (temperature >= 18 && temperature <= 25 && humidity < 60) {
      return { level: '舒适', color: '#00cc00' }
    }
    return { level: '一般', color: '#cccc00' }
  }

  const comfort = getComfortLevel()

  return (
    <div className="weather-widget">
      <h4>天气信息</h4>
      <div className="weather-display">
        <div className="weather-icon">{getWeatherIcon()}</div>
        <div className="weather-info">
          <span 
            className="temperature"
            style={{ color: getTemperatureColor(weather.temperature) }}
          >
            {weather.temperature}°C
          </span>
          <div className="weather-details">
            <p>湿度: {weather.humidity}%</p>
            <p>风速: {weather.windSpeed} km/h</p>
            <p>
              舒适度: 
              <span style={{ color: comfort.color }}>
                {comfort.level}
              </span>
            </p>
          </div>
        </div>
      </div>
      
      {/* 根据天气条件给出建议 */}
      {weather.condition === 'rainy' && (
        <div className="weather-tip rain">
          💡 建议携带雨具出行
        </div>
      )}
      
      {weather.temperature > 30 && (
        <div className="weather-tip hot">
          💡 天气炎热，注意防暑降温
        </div>
      )}
      
      {weather.temperature < 5 && (
        <div className="weather-tip cold">
          💡 天气寒冷，注意保暖
        </div>
      )}
    </div>
  )
}

const ConditionalRendering: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [notificationCount, setNotificationCount] = useState(3)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setUser({
      id: 1,
      name: '张三',
      role: 'user',
      isOnline: true
    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role })
    }
  }

  return (
    <div className="conditional-rendering">
      <h1>条件渲染</h1>
      <p>学习 React 中各种条件渲染的技巧和最佳实践</p>

      {/* 控制面板 */}
      <section className="control-panel">
        <h2>控制面板</h2>
        <div className="controls">
          <button onClick={isLoggedIn ? handleLogout : handleLogin}>
            {isLoggedIn ? '退出登录' : '登录'}
          </button>
          
          {user && (
            <div className="role-switcher">
              <span>切换角色：</span>
              {(['guest', 'user', 'admin'] as UserRole[]).map(role => (
                <button
                  key={role}
                  onClick={() => switchRole(role)}
                  className={user.role === role ? 'active' : ''}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
          
          <button 
            onClick={() => setNotificationCount(count => count > 0 ? 0 : 3)}
          >
            {notificationCount > 0 ? '清除通知' : '添加通知'}
          </button>
        </div>
      </section>

      {/* 示例展示 */}
      <div className="examples-grid">
        <LoginStatus isLoggedIn={isLoggedIn} />
        <NotificationBanner 
          hasNotifications={notificationCount > 0} 
          count={notificationCount} 
        />
        <UserProfile user={user} />
        <ProductList />
        <WeatherWidget />
      </div>

      {/* 概念说明 */}
      <section className="concepts">
        <h2>条件渲染技巧</h2>
        <div className="concepts-grid">
          <div className="concept">
            <h4>🔀 三元运算符</h4>
            <p>condition ? valueIfTrue : valueIfFalse</p>
            <code>{`{isLoggedIn ? '欢迎' : '请登录'}`}</code>
          </div>
          
          <div className="concept">
            <h4>⚡ 逻辑与运算符</h4>
            <p>condition && JSX</p>
            <code>{`{hasData && <DataComponent />}`}</code>
          </div>
          
          <div className="concept">
            <h4>🎛️ Switch 语句</h4>
            <p>处理多个条件分支</p>
            <code>{`switch (userRole) { case 'admin': ... }`}</code>
          </div>
          
          <div className="concept">
            <h4>🔍 提前返回</h4>
            <p>在组件开始处理理特殊情况</p>
            <code>if (!user) return &lt;Loading /&gt;</code>
          </div>
          
          <div className="concept">
            <h4>📝 条件样式</h4>
            <p>根据状态动态应用样式</p>
            <code>{`className={active ? 'active' : ''}`}</code>
          </div>
          
          <div className="concept">
            <h4>🎨 内联条件</h4>
            <p>在JSX属性中使用条件</p>
            <code>{`style={{ color: isError ? 'red' : 'green' }}`}</code>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ConditionalRendering