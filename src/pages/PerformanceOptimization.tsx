import React, { useState, useMemo, useCallback, memo, useRef } from 'react'
import './PerformanceOptimization.css'

// Expensive calculation simulation
const expensiveCalculation = (num: number): number => {
  console.log('📊 Expensive calculation running...')
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(num + i)
  }
  return result
}

// Child component without optimization
const UnoptimizedChild: React.FC<{ count: number; name: string }> = ({ count, name }) => {
  console.log(`🔄 UnoptimizedChild (${name}) re-rendered`)
  return (
    <div className="child-component unoptimized">
      <h4>未优化组件: {name}</h4>
      <p>计数: {count}</p>
      <p>渲染时间: {new Date().toLocaleTimeString()}</p>
    </div>
  )
}

// Child component with memo optimization
const OptimizedChild = memo<{ count: number; name: string }>(({ count, name }) => {
  console.log(`✨ OptimizedChild (${name}) re-rendered`)
  return (
    <div className="child-component optimized">
      <h4>优化组件: {name}</h4>
      <p>计数: {count}</p>
      <p>渲染时间: {new Date().toLocaleTimeString()}</p>
    </div>
  )
})

// Component demonstrating useMemo
const ExpensiveCalculationDemo: React.FC = () => {
  const [number, setNumber] = useState(5)
  const [unrelatedState, setUnrelatedState] = useState(0)
  
  // Without useMemo - recalculates on every render
  const expensiveResult = expensiveCalculation(number)
  
  // With useMemo - only recalculates when 'number' changes
  const memoizedResult = useMemo(() => {
    console.log('🎯 useMemo calculation triggered')
    return expensiveCalculation(number)
  }, [number])
  
  return (
    <div className="expensive-calc-demo">
      <h4>📊 昂贵计算优化</h4>
      
      <div className="controls">
        <div className="control-group">
          <label>计算数字:</label>
          <input 
            type="number" 
            value={number} 
            onChange={(e) => setNumber(Number(e.target.value))}
          />
        </div>
        
        <div className="control-group">
          <label>无关状态:</label>
          <button onClick={() => setUnrelatedState(prev => prev + 1)}>
            点击增加 ({unrelatedState})
          </button>
        </div>
      </div>
      
      <div className="results">
        <div className="result-item">
          <h5>未优化结果:</h5>
          <p>{expensiveResult.toFixed(2)}</p>
          <small>每次渲染都会重新计算</small>
        </div>
        
        <div className="result-item">
          <h5>useMemo 优化结果:</h5>
          <p>{memoizedResult.toFixed(2)}</p>
          <small>只在 number 变化时重新计算</small>
        </div>
      </div>
      
      <div className="tip">
        💡 打开控制台查看计算次数
      </div>
    </div>
  )
}

// Component demonstrating useCallback
const CallbackDemo: React.FC = () => {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const renderCount = useRef(0)
  
  renderCount.current++
  
  // Without useCallback - creates new function on every render
  const handleClick1 = () => {
    setCount1(prev => prev + 1)
  }
  
  // With useCallback - memoizes function
  const handleClick2 = useCallback(() => {
    setCount2(prev => prev + 1)
  }, [])
  
  return (
    <div className="callback-demo">
      <h4>📞 useCallback 优化</h4>
      
      <div className="render-info">
        <p>组件渲染次数: {renderCount.current}</p>
      </div>
      
      <div className="callback-examples">
        <div className="callback-item">
          <h5>未优化函数:</h5>
          <p>计数: {count1}</p>
          <UnoptimizedChild count={count1} name="未优化" />
          <button onClick={handleClick1}>+1</button>
        </div>
        
        <div className="callback-item">
          <h5>useCallback 优化:</h5>
          <p>计数: {count2}</p>
          <OptimizedChild count={count2} name="优化" />
          <button onClick={handleClick2}>+1</button>
        </div>
      </div>
      
      <div className="external-trigger">
        <button onClick={() => renderCount.current++}>
          触发重新渲染 (不影响计数)
        </button>
      </div>
      
      <div className="tip">
        💡 打开控制台查看组件重新渲染情况
      </div>
    </div>
  )
}

// Large list optimization demo
const ListOptimizationDemo: React.FC = () => {
  const [filter, setFilter] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  
  // Generate large dataset
  const largeDataset = useMemo(() => {
    console.log('📋 Generating large dataset...')
    return Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.floor(Math.random() * 1000),
      category: ['A', 'B', 'C'][i % 3]
    }))
  }, [])
  
  // Expensive filtering and sorting
  const filteredAndSorted = useMemo(() => {
    console.log('🔍 Filtering and sorting data...')
    let result = largeDataset
    
    if (filter) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase())
      )
    }
    
    result.sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1
      return (a.value - b.value) * multiplier
    })
    
    return result.slice(0, 100) // Only show first 100 items
  }, [largeDataset, filter, sortOrder])
  
  return (
    <div className="list-optimization-demo">
      <h4>📋 列表优化</h4>
      
      <div className="list-controls">
        <input 
          type="text"
          placeholder="过滤..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        
        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">升序</option>
          <option value="desc">降序</option>
        </select>
      </div>
      
      <div className="list-info">
        <p>原始数据: {largeDataset.length} 项</p>
        <p>过滤结果: {filteredAndSorted.length} 项 (显示前100项)</p>
      </div>
      
      <div className="optimized-list">
        {filteredAndSorted.map(item => (
          <div key={item.id} className="list-item">
            <span className="item-name">{item.name}</span>
            <span className="item-category">{item.category}</span>
            <span className="item-value">{item.value}</span>
          </div>
        ))}
      </div>
      
      <div className="tip">
        💡 useMemo 确保只在 filter 或 sortOrder 变化时重新计算
      </div>
    </div>
  )
}

// Virtual scrolling simulation (simplified)
const VirtualScrollDemo: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0)
  const [viewportHeight] = useState(400)
  const [itemHeight] = useState(50)
  const totalItems = 10000
  
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(startIndex + Math.ceil(viewportHeight / itemHeight) + 1, totalItems)
  
  const visibleItems = useMemo(() => {
    const items = []
    for (let i = startIndex; i < endIndex; i++) {
      items.push({
        id: i,
        content: `Virtual Item ${i}`,
        top: i * itemHeight
      })
    }
    return items
  }, [startIndex, endIndex, itemHeight])
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }
  
  return (
    <div className="virtual-scroll-demo">
      <h4>📦 虚拟滚动示例</h4>
      
      <div className="scroll-info">
        <p>总项目数: {totalItems}</p>
        <p>可见项目: {startIndex} - {endIndex}</p>
        <p>渲染项目数: {visibleItems.length}</p>
      </div>
      
      <div 
        className="virtual-scroll-container"
        style={{ height: viewportHeight }}
        onScroll={handleScroll}
      >
        <div 
          className="virtual-scroll-content"
          style={{ height: totalItems * itemHeight }}
        >
          {visibleItems.map(item => (
            <div 
              key={item.id}
              className="virtual-item"
              style={{
                position: 'absolute',
                top: item.top,
                height: itemHeight,
                width: '100%'
              }}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
      
      <div className="tip">
        💡 虚拟滚动只渲染可见项目，大幅提升性能
      </div>
    </div>
  )
}

const PerformanceOptimization: React.FC = () => {
  return (
    <div className="performance-container">
      <h1>Performance Optimization ⚡</h1>
      <p className="description">
        学习React性能优化技巧，包括useMemo、useCallback、React.memo和虚拟滚动等
      </p>

      <section className="demo-section">
        <h2>🧠 核心概念</h2>
        <div className="concepts">
          <div className="concept">
            <h3>🎯 useMemo</h3>
            <p>缓存昂贵计算的结果，只在依赖变化时重新计算</p>
          </div>
          <div className="concept">
            <h3>📞 useCallback</h3>
            <p>缓存函数引用，避免不必要的子组件重新渲染</p>
          </div>
          <div className="concept">
            <h3>✨ React.memo</h3>
            <p>高阶组件，防止不必要的重新渲染</p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>🎭 实际演示</h2>
        <div className="demos">
          <ExpensiveCalculationDemo />
          <CallbackDemo />
          <ListOptimizationDemo />
          <VirtualScrollDemo />
        </div>
      </section>

      <section className="demo-section">
        <h2>✨ 最佳实践</h2>
        <div className="best-practices">
          <div className="practice">
            <h4>✅ 何时使用 useMemo</h4>
            <ul>
              <li>昂贵的计算操作</li>
              <li>大量数据的过滤/排序</li>
              <li>复杂对象的创建</li>
            </ul>
          </div>
          <div className="practice">
            <h4>✅ 何时使用 useCallback</h4>
            <ul>
              <li>传递给子组件的函数</li>
              <li>作为 useEffect 的依赖</li>
              <li>传递给 React.memo 组件</li>
            </ul>
          </div>
          <div className="practice">
            <h4>❌ 过度优化</h4>
            <ul>
              <li>不要盲目使用 useMemo/useCallback</li>
              <li>首先测量性能问题</li>
              <li>避免过早优化</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PerformanceOptimization