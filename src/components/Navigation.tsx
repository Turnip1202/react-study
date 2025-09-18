import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/basic-components', label: 'Basic Components' },
    { path: '/hooks', label: 'Hooks' },
    { path: '/state-management', label: 'State Management' },
    { path: '/event-handling', label: 'Event Handling' },
    { path: '/forms', label: 'Forms' },
    { path: '/conditional-rendering', label: 'Conditional Rendering' },
    { path: '/lists', label: 'Lists' },
    { path: '/styling', label: 'Styling' },
    { path: '/lifecycle', label: 'Lifecycle' },
    { path: '/context', label: 'Context' },
    { path: '/performance', label: 'Performance' },
    { path: '/advanced-patterns', label: 'Advanced Patterns' },
    { path: '/testing', label: 'Testing' }
  ]

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h2>React Study Guide</h2>
      </div>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link to={item.path} className="nav-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation