import React, { useState, useRef, useCallback } from 'react'
import './EventHandling.css'

// 基本事件处理示例
const BasicEvents: React.FC = () => {
  const [message, setMessage] = useState('')
  const [clickCount, setClickCount] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setClickCount(prev => prev + 1)
    setMessage(`按钮被点击了 ${clickCount + 1} 次！`)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  const handleDoubleClick = () => {
    setClickCount(0)
    setMessage('计数器已重置！')
  }

  return (
    <div className="event-demo">
      <h3>基本事件处理</h3>
      
      <div className="event-area" onMouseMove={handleMouseMove}>
        <p>鼠标位置: X: {mousePosition.x}, Y: {mousePosition.y}</p>
        
        <div className="button-group">
          <button onClick={handleClick}>
            点击我 ({clickCount})
          </button>
          <button onDoubleClick={handleDoubleClick}>
            双击重置
          </button>
        </div>
        
        {message && (
          <div className="message">{message}</div>
        )}
      </div>
    </div>
  )
}

// 表单事件处理示例
const FormEvents: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general',
    newsletter: false
  })
  const [errors, setErrors] = useState<string[]>([])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (event.target as HTMLInputElement).checked
        : value
    }))
    
    // 清除相关错误
    if (errors.length > 0) {
      setErrors(prev => prev.filter(error => !error.includes(name)))
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const newErrors: string[] = []
    
    if (!formData.name.trim()) {
      newErrors.push('姓名不能为空')
    }
    
    if (!formData.email.trim()) {
      newErrors.push('邮箱不能为空')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push('邮箱格式不正确')
    }
    
    if (!formData.message.trim()) {
      newErrors.push('消息内容不能为空')
    }
    
    setErrors(newErrors)
    
    if (newErrors.length === 0) {
      alert('表单提交成功！\n' + JSON.stringify(formData, null, 2))
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      category: 'general',
      newsletter: false
    })
    setErrors([])
  }

  return (
    <div className="event-demo">
      <h3>表单事件处理</h3>
      
      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label htmlFor="name">姓名：</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="请输入您的姓名"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">邮箱：</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="请输入您的邮箱"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">类别：</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="general">一般咨询</option>
            <option value="technical">技术支持</option>
            <option value="billing">账单问题</option>
            <option value="other">其他</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="message">消息：</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="请输入您的消息"
            rows={4}
          />
        </div>
        
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
            />
            订阅邮件通知
          </label>
        </div>
        
        {errors.length > 0 && (
          <div className="error-list">
            {errors.map((error, index) => (
              <div key={index} className="error-item">❌ {error}</div>
            ))}
          </div>
        )}
        
        <div className="form-actions">
          <button type="submit">提交</button>
          <button type="button" onClick={handleReset}>重置</button>
        </div>
      </form>
    </div>
  )
}

// 键盘事件处理示例
const KeyboardEvents: React.FC = () => {
  const [input, setInput] = useState('')
  const [keyHistory, setKeyHistory] = useState<string[]>([])
  const [shortcuts, setShortcuts] = useState<string[]>([])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key
    
    // 记录按键历史
    setKeyHistory(prev => [...prev.slice(-9), key])
    
    // 处理快捷键
    if (event.ctrlKey && key === 's') {
      event.preventDefault()
      setShortcuts(prev => [...prev, 'Ctrl+S: 保存'])
    } else if (event.ctrlKey && key === 'z') {
      event.preventDefault()
      setShortcuts(prev => [...prev, 'Ctrl+Z: 撤销'])
    } else if (event.key === 'Enter') {
      setShortcuts(prev => [...prev, 'Enter: 确认输入'])
    } else if (event.key === 'Escape') {
      setInput('')
      setShortcuts(prev => [...prev, 'Escape: 清空输入'])
    }
  }

  const clearHistory = () => {
    setKeyHistory([])
    setShortcuts([])
  }

  return (
    <div className="event-demo">
      <h3>键盘事件处理</h3>
      
      <div className="keyboard-demo">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="在这里输入，尝试 Ctrl+S, Ctrl+Z, Enter, Escape"
          className="keyboard-input"
        />
        
        <div className="key-info">
          <div className="key-history">
            <h4>按键历史：</h4>
            <div className="key-list">
              {keyHistory.map((key, index) => (
                <span key={index} className="key-item">{key}</span>
              ))}
            </div>
          </div>
          
          <div className="shortcuts">
            <h4>快捷键操作：</h4>
            <div className="shortcut-list">
              {shortcuts.slice(-5).map((shortcut, index) => (
                <div key={index} className="shortcut-item">{shortcut}</div>
              ))}
            </div>
          </div>
          
          <button onClick={clearHistory}>清空历史</button>
        </div>
      </div>
    </div>
  )
}

// 高级事件处理示例
const AdvancedEvents: React.FC = () => {
  const [dragItem, setDragItem] = useState<string | null>(null)
  const [dropZoneContent, setDropZoneContent] = useState<string[]>([])
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // 使用 useCallback 优化事件处理函数
  const handleDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, item: string) => {
    setDragItem(item)
    event.dataTransfer.setData('text/plain', item)
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const item = event.dataTransfer.getData('text/plain')
    
    if (item && !dropZoneContent.includes(item)) {
      setDropZoneContent(prev => [...prev, item])
    }
    setDragItem(null)
  }, [dropZoneContent])

  const handleRemoveItem = (item: string) => {
    setDropZoneContent(prev => prev.filter(i => i !== item))
  }

  const draggableItems = ['🍎 苹果', '🍌 香蕉', '🍇 葡萄', '🍊 橙子', '🍓 草莓']

  return (
    <div className="event-demo">
      <h3>高级事件处理</h3>
      
      <div className="drag-drop-demo">
        <div className="drag-source">
          <h4>拖拽源：</h4>
          <div className="draggable-items">
            {draggableItems.map(item => (
              <div
                key={item}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className={`draggable-item ${dragItem === item ? 'dragging' : ''}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        
        <div
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="drop-zone"
        >
          <h4>放置区域：</h4>
          {dropZoneContent.length === 0 ? (
            <p className="drop-hint">将物品拖拽到这里</p>
          ) : (
            <div className="dropped-items">
              {dropZoneContent.map(item => (
                <div key={item} className="dropped-item">
                  {item}
                  <button onClick={() => handleRemoveItem(item)}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 事件委托示例
const EventDelegation: React.FC = () => {
  const [clickedItem, setClickedItem] = useState<string | null>(null)
  const [items] = useState([
    { id: 1, name: '项目 1', type: 'task' },
    { id: 2, name: '项目 2', type: 'note' },
    { id: 3, name: '项目 3', type: 'task' },
    { id: 4, name: '项目 4', type: 'reminder' },
  ])

  // 事件委托：在父元素上处理所有子元素的事件
  const handleListClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    const itemElement = target.closest('[data-item-id]') as HTMLElement
    
    if (itemElement) {
      const itemId = itemElement.getAttribute('data-item-id')
      const item = items.find(i => i.id.toString() === itemId)
      
      if (item) {
        if (target.classList.contains('delete-btn')) {
          setClickedItem(`删除: ${item.name}`)
        } else if (target.classList.contains('edit-btn')) {
          setClickedItem(`编辑: ${item.name}`)
        } else {
          setClickedItem(`查看: ${item.name}`)
        }
      }
    }
  }

  return (
    <div className="event-demo">
      <h3>事件委托</h3>
      
      <div className="delegation-demo">
        <div className="item-list" onClick={handleListClick}>
          {items.map(item => (
            <div
              key={item.id}
              data-item-id={item.id}
              className={`list-item ${item.type}`}
            >
              <span className="item-name">{item.name}</span>
              <div className="item-actions">
                <button className="edit-btn">编辑</button>
                <button className="delete-btn">删除</button>
              </div>
            </div>
          ))}
        </div>
        
        {clickedItem && (
          <div className="action-result">
            最后操作：{clickedItem}
          </div>
        )}
      </div>
    </div>
  )
}

const EventHandling: React.FC = () => {
  return (
    <div className="event-handling">
      <h1>事件处理</h1>
      <p>学习 React 中各种事件处理技巧和最佳实践</p>

      <div className="events-container">
        <BasicEvents />
        <FormEvents />
        <KeyboardEvents />
        <AdvancedEvents />
        <EventDelegation />
      </div>

      <section className="concepts">
        <h2>事件处理概念</h2>
        <div className="concepts-grid">
          <div className="concept">
            <h4>📝 合成事件</h4>
            <p>React 使用 SyntheticEvent 封装原生事件，提供一致的 API</p>
          </div>
          
          <div className="concept">
            <h4>⚡ 事件委托</h4>
            <p>在父元素上处理子元素事件，提高性能</p>
          </div>
          
          <div className="concept">
            <h4>🚫 防止默认行为</h4>
            <p>使用 preventDefault() 阻止浏览器默认行为</p>
          </div>
          
          <div className="concept">
            <h4>📋 事件对象</h4>
            <p>通过事件对象获取事件信息和目标元素</p>
          </div>
          
          <div className="concept">
            <h4>🎨 性能优化</h4>
            <p>使用 useCallback 缓存事件处理函数</p>
          </div>
          
          <div className="concept">
            <h4>⌨️ 键盘事件</h4>
            <p>处理用户键盘输入和快捷键</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventHandling