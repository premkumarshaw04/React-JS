# ⚛️ React JS — Learning Journey

A structured, section-by-section documentation of my React JS learning — covering core concepts, code examples, and practice projects.

Built on top of a solid JavaScript foundation — Variables, Functions, Arrays, Objects, DOM, and Async JS.

---

## 🗂️ Repository Structure

```
React-JS/
├── Section_01/   → React Basics & Setup
├── Section_02/   → JSX, Hooks & useState
├── Section_03/   → Form Handling & Two Way Binding
├── Section_04/   → Components, Fragments & Props
├── Section_05/   → API Calling with Axios & useEffect
├── Section_06/   → React Router DOM
└── Section_07/   → Context API
```

---

## 📚 What's Covered

### Section 01 — React Basics & Setup
- Why React? Problems with Real DOM
- What is Virtual DOM and how React solves re-rendering
- What is React JS and ReactDOM
- CDN links — Development vs Production
- `React.createElement()` — DOM way vs React way
- Setting up React with **Vite**
- Project folder structure explained
- `index.html` body — `div#root` and script module
- Full render flow: `App.jsx → main.jsx → index.html → Browser`

### Section 02 — JSX, Hooks & useState
- What is JSX and why we use it over plain JS
- `rafce` — React Arrow Function Export Component
- Single parent rule — `div` wrapper and Fragments
- Variables and expressions in JSX using `{}`
- Event handling — `onClick`, `onChange` and more
- Why direct DOM change doesn't work in React
- **What are Hooks** — state management and other features
- Class components vs Functional components
- **`useState` hook** — `[variable, setter]` pattern
- Counter example — increment and decrement

### Section 03 — Form Handling & Two Way Binding
- What is form handling in React
- Default form behaviour — page reload problem
- `onSubmit`, `e` (Event Object), and `e.preventDefault()`
- Two ways to pass event handler — direct vs arrow function wrapper
- **Two Way Binding** — `value` + `onChange` pattern
- `e.target.value` — what it is and how it works
- Controlled vs Uncontrolled inputs

### Section 04 — Components, Fragments & Props
- **Fragments** `<>...</>` — invisible wrapper, no extra DOM element
- **Components** — reusable, independent pieces of UI
- `components/` folder — why and how to structure it
- Capital letter rule for component filenames
- **Props** — passing data from parent to child
- Destructuring props
- **Props Drilling** — passing data through multiple layers
- Rendering JSON data with `.map()`
- `key` prop — what it is and why React needs it
- Data always flows top to bottom

### Section 05 — API Calling with Axios & useEffect
- What is an API and what is API Calling
- **Axios** — why it's better than `fetch()`
- Installing Axios: `npm i axios`
- **`useEffect` hook** — running code after render
- Dependency array — `[]`, `[value]`, no array
- **`axios.get()`** — fetching data from an API
- Full working example with `jsonplaceholder` API
- Complete flow: component load → useEffect → axios → setState → render

### Section 06 — React Router DOM
- What is Routing and why React needs it
- Types of routing — Client-side, Server-side, Hash, Memory
- **React Router DOM** — external library for routing
- Installing: `npm i react-router-dom`
- Types of Routers — `BrowserRouter`, `HashRouter`, `MemoryRouter`, `StaticRouter`
- Setting up `BrowserRouter` in `main.jsx`
- `Routes` and `Route` — defining page routes
- **`<Link>`** — navigation without page reload
- **`<NavLink>`** — active link highlighting
- Full 4-page example — Home, About, Contact, Services

### Section 07 — Context API
- What is Context API and what problem it solves
- Props drilling vs Context API
- **`createContext()`** — creating the context object
- **`Provider`** — sharing data with all children
- **`children` prop** — how wrapper components work
- **`useContext()`** — consuming context in any component
- Full example — `Header`, `Section`, `Footer` all consuming shared data
- Combining Context with `useState` for dynamic data
- Context API vs Redux Toolkit — when to use which

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

---

## 🚀 Getting Started

To run any section locally:

```bash
# 1. Clone the repository
git clone https://github.com/premkumarshaw04/React-JS.git

# 2. Navigate into a section
cd React-JS/Section_01

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open `http://localhost:5173/` in your browser.

---

## 📋 Prerequisites

- Node.js v18 or above
- Basic knowledge of HTML, CSS, JavaScript

```bash
# Check your Node version
node -v
```

---

## 🎯 Learning Goal

Build a strong logic and understanding of React JS — notes and examples designed to be useful for both **revision** and **interviews**.

---

## 👨‍💻 Author

**Prem Kumar Shaw**

[![GitHub](https://img.shields.io/badge/GitHub-premkumarshaw04-181717?style=flat&logo=github)](https://github.com/premkumarshaw04)

---

*This repo is part of an ongoing React JS learning journey — more sections will be added as learning progresses.*
