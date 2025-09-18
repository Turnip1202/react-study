import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation.tsx'
import Home from './pages/Home.tsx'
import BasicComponents from './pages/BasicComponents.tsx'
import HooksDemo from './pages/HooksDemo.tsx'
import StateManagement from './pages/StateManagement.tsx'
import EventHandling from './pages/EventHandling.tsx'
import Forms from './pages/Forms.tsx'
import ConditionalRendering from './pages/ConditionalRendering.tsx'
import Lists from './pages/Lists.tsx'
import Styling from './pages/Styling.tsx'
import LifecycleMethods from './pages/LifecycleMethods.tsx'
import ContextDemo from './pages/ContextDemo.tsx'
import PerformanceOptimization from './pages/PerformanceOptimization.tsx'
import AdvancedPatterns from './pages/AdvancedPatterns.tsx'
import TestingDemo from './pages/TestingDemo.tsx'
import './App.css'

function App() {
  return (
    <Router basename="/react-study">
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basic-components" element={<BasicComponents />} />
            <Route path="/hooks" element={<HooksDemo />} />
            <Route path="/state-management" element={<StateManagement />} />
            <Route path="/event-handling" element={<EventHandling />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/conditional-rendering" element={<ConditionalRendering />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/styling" element={<Styling />} />
            <Route path="/lifecycle" element={<LifecycleMethods />} />
            <Route path="/context" element={<ContextDemo />} />
            <Route path="/performance" element={<PerformanceOptimization />} />
            <Route path="/advanced-patterns" element={<AdvancedPatterns />} />
            <Route path="/testing" element={<TestingDemo />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
