import React from 'react'
import './Home.css'

const Home: React.FC = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to React Study Guide</h1>
        <p className="subtitle">A comprehensive guide to learning React.js</p>
      </header>

      <section className="overview">
        <h2>What You'll Learn</h2>
        <div className="learning-grid">
          <div className="learning-card">
            <h3>📦 Basic Components</h3>
            <p>Learn about functional and class components, JSX syntax, and component composition.</p>
          </div>
          
          <div className="learning-card">
            <h3>🎣 Hooks</h3>
            <p>Master useState, useEffect, useContext, useReducer, useMemo, useCallback, and custom hooks.</p>
          </div>
          
          <div className="learning-card">
            <h3>🔄 State Management</h3>
            <p>Understand state lifting, prop drilling, and advanced state management patterns.</p>
          </div>
          
          <div className="learning-card">
            <h3>🎯 Event Handling</h3>
            <p>Learn event handling, synthetic events, and event delegation in React.</p>
          </div>
          
          <div className="learning-card">
            <h3>📝 Forms</h3>
            <p>Handle controlled and uncontrolled components, form validation, and form libraries.</p>
          </div>
          
          <div className="learning-card">
            <h3>🔀 Conditional Rendering</h3>
            <p>Master different techniques for conditional rendering and dynamic content.</p>
          </div>
          
          <div className="learning-card">
            <h3>📋 Lists & Keys</h3>
            <p>Render dynamic lists, understand keys, and optimize list performance.</p>
          </div>
          
          <div className="learning-card">
            <h3>🎨 Styling</h3>
            <p>Explore CSS modules, styled-components, and various styling approaches.</p>
          </div>
          
          <div className="learning-card">
            <h3>♻️ Lifecycle</h3>
            <p>Understand component lifecycle methods and their useEffect equivalents.</p>
          </div>
          
          <div className="learning-card">
            <h3>🌐 Context</h3>
            <p>Learn React Context API for state management across component trees.</p>
          </div>
          
          <div className="learning-card">
            <h3>⚡ Performance</h3>
            <p>Optimize React apps with React.memo, useMemo, useCallback, and lazy loading.</p>
          </div>
          
          <div className="learning-card">
            <h3>🏗️ Advanced Patterns</h3>
            <p>Higher-order components, render props, compound components, and more.</p>
          </div>
        </div>
      </section>

      <section className="getting-started">
        <h2>Getting Started</h2>
        <p>
          Navigate through the menu on the left to explore different React concepts. 
          Each section contains practical examples, explanations, and interactive demos 
          to help you understand React deeply.
        </p>
        <div className="tips">
          <h3>💡 Tips for Learning</h3>
          <ul>
            <li>Start with the basics and gradually move to advanced topics</li>
            <li>Practice by modifying the code examples</li>
            <li>Open the browser dev tools to inspect components</li>
            <li>Try to understand why each pattern is useful</li>
            <li>Experiment with your own examples</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Home