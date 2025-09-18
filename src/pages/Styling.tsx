import React, { useState } from 'react'
import styled, { ThemeProvider, keyframes } from 'styled-components'
import './Styling.css'

// Styled-components examples
const StyledButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background-color: ${props => {
    switch (props.variant) {
      case 'danger': return '#e74c3c'
      case 'secondary': return '#95a5a6'
      default: return '#3498db'
    }
  }};
  
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    
    background-color: ${props => {
      switch (props.variant) {
        case 'danger': return '#c0392b'
        case 'secondary': return '#7f8c8d'
        default: return '#2980b9'
      }
    }};
  }
  
  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
    transform: none;
  }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const AnimatedCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 2s infinite;
  border-left: 4px solid #3498db;
`

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`

const theme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    danger: '#e74c3c',
    dark: '#2c3e50',
    light: '#ecf0f1'
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  }
}

const ThemedComponent = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.large};
  border-radius: 8px;
  text-align: center;
`

// CSS Modules example (simulated)
const CSSModulesDemo: React.FC = () => {
  return (
    <div className="styling-demo">
      <h3>CSS Modules Style</h3>
      <div className="css-modules-examples">
        <div className="module-card primary">
          <h4>Primary Card</h4>
          <p>Using CSS Modules with scoped classes</p>
          <button className="module-btn">Action</button>
        </div>
        
        <div className="module-card secondary">
          <h4>Secondary Card</h4>
          <p>Automatic CSS scoping prevents conflicts</p>
          <button className="module-btn outline">Outline</button>
        </div>
      </div>
    </div>
  )
}

// Inline styles example
const InlineStylesDemo: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  
  const containerStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '20px'
  }
  
  const dynamicButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: isHovered ? '#2980b9' : '#3498db',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
  }
  
  return (
    <div className="styling-demo">
      <h3>Inline Styles</h3>
      <div style={containerStyle}>
        <p style={{ color: '#2c3e50', marginBottom: '15px' }}>
          Inline styles with dynamic behavior
        </p>
        <button
          style={dynamicButtonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Hover Me
        </button>
      </div>
    </div>
  )
}

// Styled-components example
const StyledComponentsDemo: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false)
  
  return (
    <div className="styling-demo">
      <h3>Styled Components</h3>
      
      <FlexContainer>
        <StyledButton variant="primary">Primary</StyledButton>
        <StyledButton variant="secondary">Secondary</StyledButton>
        <StyledButton variant="danger">Danger</StyledButton>
        <StyledButton disabled={isDisabled}>
          {isDisabled ? 'Disabled' : 'Toggle Disable'}
        </StyledButton>
      </FlexContainer>
      
      <button 
        onClick={() => setIsDisabled(!isDisabled)}
        style={{ marginBottom: '20px' }}
      >
        Toggle Last Button State
      </button>
      
      <AnimatedCard>
        <h4>Animated Card</h4>
        <p>This card has a CSS animation defined with styled-components</p>
      </AnimatedCard>
      
      <ThemeProvider theme={theme}>
        <ThemedComponent>
          <h4>Themed Component</h4>
          <p>Using ThemeProvider for consistent styling</p>
        </ThemedComponent>
      </ThemeProvider>
    </div>
  )
}

// CSS Variables example
const CSSVariablesDemo: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')
  
  const themeClass = `css-variables-container ${currentTheme}-theme`
  
  return (
    <div className="styling-demo">
      <h3>CSS Variables (Custom Properties)</h3>
      
      <div className={themeClass}>
        <div className="theme-card">
          <h4>Dynamic Theming</h4>
          <p>Using CSS custom properties for theme switching</p>
          
          <div className="theme-controls">
            <button 
              className="theme-btn"
              onClick={() => setCurrentTheme('light')}
            >
              Light Theme
            </button>
            <button 
              className="theme-btn"
              onClick={() => setCurrentTheme('dark')}
            >
              Dark Theme
            </button>
          </div>
          
          <div className="color-palette">
            <div className="color-box primary">Primary</div>
            <div className="color-box secondary">Secondary</div>
            <div className="color-box accent">Accent</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Responsive design example
const ResponsiveDemo: React.FC = () => {
  return (
    <div className="styling-demo">
      <h3>Responsive Design</h3>
      
      <div className="responsive-grid">
        <div className="responsive-card">
          <h4>Card 1</h4>
          <p>This grid adapts to screen size</p>
        </div>
        <div className="responsive-card">
          <h4>Card 2</h4>
          <p>Try resizing your browser window</p>
        </div>
        <div className="responsive-card">
          <h4>Card 3</h4>
          <p>Mobile-first responsive design</p>
        </div>
        <div className="responsive-card">
          <h4>Card 4</h4>
          <p>CSS Grid and Flexbox</p>
        </div>
      </div>
      
      <div className="responsive-text">
        <h4>Responsive Typography</h4>
        <p>This text size adapts to screen size using clamp()</p>
      </div>
    </div>
  )
}

// Animation examples
const AnimationDemo: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  
  return (
    <div className="styling-demo">
      <h3>CSS Animations & Transitions</h3>
      
      <div className="animation-showcase">
        <div className="animation-card bounce">
          <h4>Bounce Animation</h4>
          <p>CSS keyframe animation</p>
        </div>
        
        <div className="animation-card slide">
          <h4>Slide Animation</h4>
          <p>Transform transitions</p>
        </div>
        
        <div 
          className={`animation-card interactive ${isAnimating ? 'active' : ''}`}
          onClick={() => setIsAnimating(!isAnimating)}
        >
          <h4>Click Me!</h4>
          <p>Interactive animation trigger</p>
        </div>
      </div>
      
      <div className="loading-demo">
        <div className="spinner"></div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  )
}

const Styling: React.FC = () => {
  return (
    <div className="styling">
      <h1>React Styling Approaches</h1>
      <p>Learn different ways to style React components and applications</p>

      <div className="styling-container">
        <CSSModulesDemo />
        <InlineStylesDemo />
        <StyledComponentsDemo />
        <CSSVariablesDemo />
        <ResponsiveDemo />
        <AnimationDemo />
      </div>

      <section className="concepts">
        <h2>Styling Concepts & Best Practices</h2>
        <div className="concepts-grid">
          <div className="concept">
            <h4>📦 CSS Modules</h4>
            <p>Locally scoped CSS with automatic class name generation</p>
            <ul>
              <li>Prevents CSS conflicts</li>
              <li>Component-scoped styles</li>
              <li>Build-time optimization</li>
            </ul>
          </div>
          
          <div className="concept">
            <h4>🎨 Inline Styles</h4>
            <p>JavaScript objects for dynamic styling</p>
            <ul>
              <li>Dynamic style generation</li>
              <li>Component-level encapsulation</li>
              <li>Performance considerations</li>
            </ul>
          </div>
          
          <div className="concept">
            <h4>💅 Styled Components</h4>
            <p>CSS-in-JS library with component-based styling</p>
            <ul>
              <li>Template literals for CSS</li>
              <li>Theme support</li>
              <li>Automatic vendor prefixing</li>
            </ul>
          </div>
          
          <div className="concept">
            <h4>🎯 CSS Variables</h4>
            <p>Custom properties for dynamic theming</p>
            <ul>
              <li>Runtime theme switching</li>
              <li>Better maintainability</li>
              <li>Browser-native support</li>
            </ul>
          </div>
          
          <div className="concept">
            <h4>📱 Responsive Design</h4>
            <p>Mobile-first approach with CSS Grid and Flexbox</p>
            <ul>
              <li>Media queries</li>
              <li>Flexible layouts</li>
              <li>Scalable typography</li>
            </ul>
          </div>
          
          <div className="concept">
            <h4>⚡ Performance</h4>
            <p>Optimization strategies for styling</p>
            <ul>
              <li>CSS bundle splitting</li>
              <li>Critical CSS</li>
              <li>Animation optimization</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Styling