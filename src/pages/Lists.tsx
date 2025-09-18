import React, { useState, useMemo } from 'react'
import './Lists.css'

interface Item {
  id: number
  name: string
  category: string
  price: number
  inStock: boolean
  rating: number
}

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  avatar: string
}

const Lists: React.FC = () => {
  // 商品列表数据
  const [items] = useState<Item[]>([
    { id: 1, name: 'MacBook Pro', category: 'Electronics', price: 1999, inStock: true, rating: 4.8 },
    { id: 2, name: 'iPhone 15', category: 'Electronics', price: 999, inStock: false, rating: 4.7 },
    { id: 3, name: 'AirPods Pro', category: 'Electronics', price: 249, inStock: true, rating: 4.6 },
    { id: 4, name: 'Nike Shoes', category: 'Fashion', price: 120, inStock: true, rating: 4.3 },
    { id: 5, name: 'Adidas T-shirt', category: 'Fashion', price: 45, inStock: true, rating: 4.1 },
    { id: 6, name: 'Coffee Maker', category: 'Home', price: 89, inStock: false, rating: 4.4 }
  ])

  // 用户列表数据
  const [users] = useState<User[]>([
    { id: 1, name: '张三', email: 'zhang@example.com', role: 'admin', avatar: '👨‍💼' },
    { id: 2, name: '李四', email: 'li@example.com', role: 'user', avatar: '👩‍💻' },
    { id: 3, name: '王五', email: 'wang@example.com', role: 'guest', avatar: '👨‍🎓' },
    { id: 4, name: 'Alice', email: 'alice@example.com', role: 'admin', avatar: '👩‍🔬' },
    { id: 5, name: 'Bob', email: 'bob@example.com', role: 'user', avatar: '👨‍🎨' }
  ])

  // 过滤和排序状态
  const [itemFilter, setItemFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)

  // 动态列表操作
  const [dynamicList, setDynamicList] = useState<string[]>(['Apple', 'Banana', 'Orange'])
  const [newItem, setNewItem] = useState('')

  // 获取唯一分类
  const categories = useMemo(() => {
    const cats = [...new Set(items.map(item => item.category))]
    return cats
  }, [items])

  // 过滤和排序商品
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items

    // 按名称过滤
    if (itemFilter) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(itemFilter.toLowerCase())
      )
    }

    // 按分类过滤
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter)
    }

    // 只显示有库存
    if (showOnlyInStock) {
      filtered = filtered.filter(item => item.inStock)
    }

    // 排序
    filtered.sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = (bVal as string).toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
      }
    })

    return filtered
  }, [items, itemFilter, categoryFilter, sortBy, sortOrder, showOnlyInStock])

  // 动态列表操作
  const addItem = () => {
    if (newItem.trim()) {
      setDynamicList([...dynamicList, newItem.trim()])
      setNewItem('')
    }
  }

  const removeItem = (index: number) => {
    setDynamicList(dynamicList.filter((_, i) => i !== index))
  }

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newList = [...dynamicList]
    const [movedItem] = newList.splice(fromIndex, 1)
    newList.splice(toIndex, 0, movedItem)
    setDynamicList(newList)
  }

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'admin'
      case 'user': return 'user'
      case 'guest': return 'guest'
      default: return ''
    }
  }

  return (
    <div className="lists-container">
      <h1>Lists and Rendering 📋</h1>
      <p className="description">
        学习React中的列表渲染、key的使用、过滤排序、动态操作等核心概念
      </p>

      {/* 基础列表渲染 */}
      <section className="demo-section">
        <h2>🔸 基础列表渲染</h2>
        <div className="basic-list">
          <h3>简单数字列表</h3>
          <ul className="number-list">
            {[1, 2, 3, 4, 5].map(num => (
              <li key={num} className="number-item">
                数字: {num} (平方: {num * num})
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 用户列表 */}
      <section className="demo-section">
        <h2>🔸 用户列表渲染</h2>
        <div className="user-list">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">{user.avatar}</div>
              <div className="user-info">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <span className={`role-badge ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 过滤和排序 */}
      <section className="demo-section">
        <h2>🔸 商品列表 - 过滤和排序</h2>
        
        <div className="controls">
          <div className="control-group">
            <label>搜索商品:</label>
            <input
              type="text"
              value={itemFilter}
              onChange={(e) => setItemFilter(e.target.value)}
              placeholder="输入商品名称..."
              className="search-input"
            />
          </div>

          <div className="control-group">
            <label>分类:</label>
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">所有分类</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>排序:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
              className="sort-select"
            >
              <option value="name">名称</option>
              <option value="price">价格</option>
              <option value="rating">评分</option>
            </select>
            
            <button 
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="sort-order-btn"
            >
              {sortOrder === 'asc' ? '↑ 升序' : '↓ 降序'}
            </button>
          </div>

          <div className="control-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showOnlyInStock}
                onChange={(e) => setShowOnlyInStock(e.target.checked)}
              />
              只显示有库存
            </label>
          </div>
        </div>

        <div className="items-grid">
          {filteredAndSortedItems.length === 0 ? (
            <div className="no-results">
              <p>没有找到匹配的商品 😕</p>
            </div>
          ) : (
            filteredAndSortedItems.map(item => (
              <div key={item.id} className={`item-card ${!item.inStock ? 'out-of-stock' : ''}`}>
                <h4>{item.name}</h4>
                <p className="category">{item.category}</p>
                <div className="price">${item.price}</div>
                <div className="rating">⭐ {item.rating}</div>
                <div className="stock-status">
                  {item.inStock ? (
                    <span className="in-stock">✅ 有库存</span>
                  ) : (
                    <span className="out-of-stock-label">❌ 缺货</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="results-summary">
          显示 {filteredAndSortedItems.length} / {items.length} 个商品
        </div>
      </section>

      {/* 动态列表操作 */}
      <section className="demo-section">
        <h2>🔸 动态列表操作</h2>
        
        <div className="dynamic-controls">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="添加新项目..."
            className="add-input"
          />
          <button onClick={addItem} className="add-btn">
            ➕ 添加
          </button>
        </div>

        <div className="dynamic-list">
          {dynamicList.map((item, index) => (
            <div key={`${item}-${index}`} className="dynamic-item">
              <span className="item-text">{item}</span>
              <div className="item-actions">
                <button 
                  onClick={() => moveItem(index, Math.max(0, index - 1))}
                  disabled={index === 0}
                  className="move-btn"
                  title="上移"
                >
                  ⬆️
                </button>
                <button 
                  onClick={() => moveItem(index, Math.min(dynamicList.length - 1, index + 1))}
                  disabled={index === dynamicList.length - 1}
                  className="move-btn"
                  title="下移"
                >
                  ⬇️
                </button>
                <button 
                  onClick={() => removeItem(index)}
                  className="remove-btn"
                  title="删除"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {dynamicList.length === 0 && (
          <div className="empty-list">
            <p>列表为空，添加一些项目吧！ 🎯</p>
          </div>
        )}
      </section>

      {/* Key的重要性演示 */}
      <section className="demo-section">
        <h2>🔸 Key的重要性</h2>
        <div className="key-demo">
          <div className="demo-explanation">
            <h3>为什么Key很重要？</h3>
            <ul>
              <li><strong>性能优化</strong>: React通过key识别哪些元素发生了变化</li>
              <li><strong>状态保持</strong>: 正确的key帮助React保持组件状态</li>
              <li><strong>避免Bug</strong>: 错误的key可能导致意外的渲染问题</li>
            </ul>
            
            <div className="key-rules">
              <h4>Key使用规则:</h4>
              <ul>
                <li>✅ 使用稳定、唯一的标识符 (如 id)</li>
                <li>✅ 避免使用数组索引作为key (除非列表静态)</li>
                <li>✅ Key在兄弟元素中必须唯一</li>
                <li>❌ 不要使用随机数或时间戳</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 嵌套列表 */}
      <section className="demo-section">
        <h2>🔸 嵌套列表示例</h2>
        <div className="nested-lists">
          {[
            {
              category: 'Frontend',
              technologies: ['React', 'Vue', 'Angular', 'Svelte']
            },
            {
              category: 'Backend', 
              technologies: ['Node.js', 'Python', 'Java', 'Go']
            },
            {
              category: 'Database',
              technologies: ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL']
            }
          ].map(group => (
            <div key={group.category} className="tech-group">
              <h4>{group.category}</h4>
              <ul className="tech-list">
                {group.technologies.map(tech => (
                  <li key={tech} className="tech-item">{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Lists