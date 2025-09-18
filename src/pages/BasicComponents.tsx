import React from 'react'
import './BasicComponents.css'

// Functional Component Example
const FunctionalGreeting: React.FC<{ name: string; age?: number }> = ({ name, age }) => {
  return (
    <div className="component-example">
      <h4>Functional Component</h4>
      <p>Hello, {name}! {age && `You are ${age} years old.`}</p>
    </div>
  )
}

// Class Component Example
class ClassGreeting extends React.Component<{ name: string; age?: number }> {
  render() {
    const { name, age } = this.props
    return (
      <div className="component-example">
        <h4>Class Component</h4>
        <p>Hello, {name}! {age && `You are ${age} years old.`}</p>
      </div>
    )
  }
}

// Component with children
const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="card">
      <h4>{title}</h4>
      <div className="card-content">{children}</div>
    </div>
  )
}

// Component with default props
const Button: React.FC<{
  text: string
  type?: 'primary' | 'secondary' | 'danger'
  onClick?: () => void
}> = ({ text, type = 'primary', onClick }) => {
  return (
    <button 
      className={`btn btn-${type}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

// Destructuring props example
const UserInfo: React.FC<{
  user: {
    id: number
    name: string
    email: string
    avatar?: string
  }
}> = ({ user: { name, email, avatar } }) => {
  return (
    <div className="user-info">
      {avatar && <img src={avatar} alt={name} className="avatar" />}
      <div>
        <h5>{name}</h5>
        <p>{email}</p>
      </div>
    </div>
  )
}

// JSX Examples
const JSXExamples: React.FC = () => {
  const title = "Dynamic Title"
  const isLoggedIn = true
  const users = ["Alice", "Bob", "Charlie"]
  
  return (
    <div className="jsx-examples">
      <h4>JSX Examples</h4>
      
      {/* JavaScript expressions in JSX */}
      <p>Current time: {new Date().toLocaleTimeString()}</p>
      <p>Math: 2 + 2 = {2 + 2}</p>
      
      {/* Dynamic content */}
      <h5>{title}</h5>
      
      {/* Conditional rendering */}
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in</p>}
      
      {/* List rendering */}
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      
      {/* JSX attributes */}
      <div 
        className="highlight" 
        style={{ backgroundColor: '#f0f0f0', padding: '10px' }}
        data-testid="jsx-example"
      >
        JSX with dynamic attributes
      </div>
    </div>
  )
}

const BasicComponents: React.FC = () => {
  const sampleUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/50"
  }

  const handleButtonClick = () => {
    alert('Button clicked!')
  }

  return (
    <div className="basic-components">
      <h1>Basic Components</h1>
      <p>Learn about React components, JSX, and props</p>

      <section className="section">
        <h2>Component Types</h2>
        <div className="components-grid">
          <FunctionalGreeting name="Alice" age={25} />
          <ClassGreeting name="Bob" age={30} />
        </div>
      </section>

      <section className="section">
        <h2>Props and Children</h2>
        <Card title="Card with Children">
          <p>This content is passed as children to the Card component.</p>
          <Button text="Click me" onClick={handleButtonClick} />
        </Card>
      </section>

      <section className="section">
        <h2>Component Variations</h2>
        <div className="button-group">
          <Button text="Primary" type="primary" />
          <Button text="Secondary" type="secondary" />
          <Button text="Danger" type="danger" />
        </div>
      </section>

      <section className="section">
        <h2>Complex Props</h2>
        <UserInfo user={sampleUser} />
      </section>

      <section className="section">
        <h2>JSX Features</h2>
        <JSXExamples />
      </section>

      <section className="section">
        <h2>Key Concepts</h2>
        <div className="concepts">
          <div className="concept">
            <h4>🧩 Components</h4>
            <p>Building blocks of React applications. Can be functional or class-based.</p>
          </div>
          <div className="concept">
            <h4>📊 Props</h4>
            <p>Data passed from parent to child components. Read-only and immutable.</p>
          </div>
          <div className="concept">
            <h4>🏷️ JSX</h4>
            <p>Syntax extension that allows writing HTML-like code in JavaScript.</p>
          </div>
          <div className="concept">
            <h4>👶 Children</h4>
            <p>Special prop that contains the content between component opening and closing tags.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BasicComponents