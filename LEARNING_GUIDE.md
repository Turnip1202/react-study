# React Study Guide

A comprehensive React learning project created with Vite + TypeScript + npm.

## Overview

This project is designed to help you learn all aspects of React through practical examples and interactive demos. It covers everything from basic components to advanced patterns.

## Features Covered

### ✅ Currently Implemented:
- **Home Page**: Overview and learning roadmap
- **Basic Components**: Functional components, class components, JSX, props
- **Hooks Demo**: Complete guide to React hooks with examples
  - useState, useEffect, useReducer
  - useMemo, useCallback, useRef
  - Custom hooks
- **State Management**: State lifting, Context API, complex state with useReducer
- **Navigation**: Clean sidebar navigation with React Router

### 🚧 Coming Soon:
- Event Handling
- Forms (controlled/uncontrolled components)
- Conditional Rendering
- Lists and Keys
- Styling (CSS modules, styled-components)
- Lifecycle Methods
- Context API Deep Dive
- Performance Optimization
- Advanced Patterns (HOCs, Render Props, etc.)
- Testing

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to the local development URL (typically `http://localhost:5173`)

4. **Explore the different sections** using the navigation menu on the left

## Learning Path

1. **Start with the Home page** to understand what you'll learn
2. **Basic Components** - Learn the fundamentals
3. **Hooks Demo** - Master React hooks
4. **State Management** - Understand different state management approaches
5. Continue through other sections as they become available

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx     # Main navigation component
│   └── Navigation.css     # Navigation styles
├── pages/
│   ├── Home.tsx          # Landing page
│   ├── BasicComponents.tsx # Component fundamentals
│   ├── HooksDemo.tsx     # React hooks examples
│   ├── StateManagement.tsx # State management patterns
│   └── ...               # Other learning modules
├── App.tsx               # Main app component with routing
├── App.css              # Global styles
└── main.tsx             # App entry point
```

## Technologies Used

- **React 19** - Latest React features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **CSS3** - Modern styling with flexbox and grid

## Key Learning Concepts

### Components
- Functional vs Class components
- Props and children
- Component composition
- JSX syntax and features

### Hooks
- State management with useState
- Side effects with useEffect
- Complex state with useReducer
- Performance optimization with useMemo and useCallback
- DOM manipulation with useRef
- Creating custom hooks

### State Management
- Local component state
- State lifting
- Context API for global state
- Avoiding prop drilling

## Tips for Learning

1. **Practice by doing** - Modify the examples and see what happens
2. **Use browser dev tools** - Inspect components and see how they work
3. **Read the code** - Each example is well-commented
4. **Experiment** - Try creating your own variations
5. **Build something** - Apply what you learn in a small project

## Contributing

This is a learning project! Feel free to:
- Add more examples
- Improve existing demos
- Fix bugs or improve code quality
- Add better documentation

## Resources

- [React Official Documentation](https://react.dev/)
- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)

Happy learning! 🚀