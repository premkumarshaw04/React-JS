# Section 7 — Context API

---

## 1. What is Context API?

**What:**

Context API is a built-in React feature that lets you **share data across multiple components without passing props manually at every level.**

It is React's solution to the **props drilling problem.**

**The Problem it Solves — Props Drilling:**

Remember props drilling from earlier?

```
App  →  passes data to  →  Header  →  passes to  →  SubHeader  →  passes to  →  Title
```

Every component in the chain had to receive and pass the prop — even if it didn't need it.

With Context API:

```
App  →  puts data in Context
         ↓
Header, Section, Footer  →  directly access data from Context
                             No chain. No drilling. ✅
```

Any component can directly reach into the context and grab the data it needs.

**Why we use it:**

- Avoid passing the same prop through 5 levels of components

- Share global data — logged-in user, theme (dark/light), language, cart items

- Cleaner code — components only receive what they actually need

**Advantages:**

- No props drilling — any component accesses shared data directly

- Built into React — no extra library needed

- Centralized data — one place to update, all consumers reflect the change

- Works well with `useState` — update context data and all consumers re-render

---

## 2. How Context API Works — 3 Steps

```
Step 1: CREATE the context        →  createContext()
Step 2: PROVIDE the data          →  <DataContext.Provider value={...}>
Step 3: CONSUME the data          →  useContext(DataContext)
```

---

## 3. The Scenario

We have `App.jsx` rendering three components — `Header`, `Section`, and `Footer`.

We have a `user` object in context that all three components need.

Instead of passing it as props to each one, we put it in Context — and each component grabs it directly.

---

## 4. File Structure

```
src/
├── context/
│   └── UserContext.jsx      ← context created here
├── components/
│   ├── Header.jsx
│   ├── Section.jsx
│   └── Footer.jsx
├── App.jsx
└── main.jsx
```

It is good practice to keep context files in a separate `context/` folder.

---

## 5. Step 1 — Creating the Context

```jsx
// src/context/UserContext.jsx

import React, { createContext } from 'react'

export const DataContext = createContext()

const UserContext = ({ children }) => {

  const user = {
    name: "Sarthak",
    age: 22,
    city: "Bhopal"
  }

  return (
    <DataContext.Provider value={{ user }}>
      {children}
    </DataContext.Provider>
  )
}

export default UserContext
```

**Line by line:**

`import { createContext } from 'react'` — `createContext` is a built-in React function.

`export const DataContext = createContext()` — creates a new context object called `DataContext`.

This is the context that components will subscribe to.

It is exported so other files can import it to consume the data.

`const UserContext = ({ children })` — `UserContext` is a wrapper component.

`children` is a special prop in React — it represents **whatever is placed inside this component** when it is used.

```jsx
// Whatever is between <UserContext> tags becomes children
<UserContext>
  <App />       ← this is children
</UserContext>
```

`const user = { ... }` — this is the data we want to share across all components.

`<DataContext.Provider value={{ user }}>` — the Provider makes the data available to all components inside it.

`value={{ user }}` — the `value` prop is what gets shared. Any component that consumes this context will receive `{ user }`.

`{children}` — renders whatever is wrapped inside `<UserContext>` — in our case, `<App />` and all its children.

---

## 6. Step 2 — Wrapping App with the Provider

```jsx
// main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContext>
      <App />
    </UserContext>
  </BrowserRouter>
)
```

`<UserContext>` wraps `<App />` — so every component inside `App` has access to the context data.

`<App />` becomes the `children` inside `UserContext`.

---

## 7. App.jsx — Rendering the Three Components

```jsx
// App.jsx

import React from 'react'
import Header from './components/Header'
import Section from './components/Section'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Header />
      <Section />
      <Footer />
    </div>
  )
}

export default App
```

`App.jsx` is clean — it just assembles the three components.

No props being passed from here — each component will directly get data from context.

---

## 8. Step 3 — Consuming Context in Each Component

### `Header.jsx`

```jsx
import React, { useContext } from 'react'
import { DataContext } from '../context/UserContext'

const Header = () => {

  const { user } = useContext(DataContext)

  return (
    <div className="p-6 bg-zinc-900 text-white">
      <h1 className="text-2xl font-bold">Header</h1>
      <p>Welcome, {user.name}</p>
    </div>
  )
}

export default Header
```

`import { DataContext } from '../context/UserContext'` — imports the context object so we can subscribe to it.

`useContext(DataContext)` — this hook gives direct access to whatever is in `value` of the Provider.

The Provider had `value={{ user }}` — so `useContext(DataContext)` returns `{ user }`.

`const { user } = useContext(DataContext)` — destructuring to get `user` directly.

Now `user.name`, `user.age`, `user.city` are available — no props needed.

---

### `Section.jsx`

```jsx
import React, { useContext } from 'react'
import { DataContext } from '../context/UserContext'

const Section = () => {

  const { user } = useContext(DataContext)

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Section</h2>
      <p>User: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>City: {user.city}</p>
    </div>
  )
}

export default Section
```

Same pattern — `useContext(DataContext)` gives direct access to the user data.

No props passed from `App.jsx`. Section reaches into context and takes what it needs.

---

### `Footer.jsx`

```jsx
import React, { useContext } from 'react'
import { DataContext } from '../context/UserContext'

const Footer = () => {

  const { user } = useContext(DataContext)

  return (
    <div className="p-6 bg-zinc-900 text-white text-center">
      <p>Footer — Logged in as {user.name} from {user.city}</p>
    </div>
  )
}

export default Footer
```

All three components — `Header`, `Section`, `Footer` — consume the same context.

All three show `user` data — and none of them received it via props.

---

## 9. Full Flow — How Context API Works

```
main.jsx
  → <UserContext> wraps <App />
    → user data is placed in DataContext.Provider
      → value={{ user }} is now available to all children
            ↓
App.jsx renders Header, Section, Footer
            ↓
Each component calls useContext(DataContext)
  → gets { user } from the Provider
    → displays user.name, user.age, user.city ✅

No props passed anywhere — all components access data directly
```

---

## 10. What if the Data Changes?

You can combine Context with `useState` to make the data dynamic:

```jsx
// UserContext.jsx — with useState
import React, { createContext, useState } from 'react'

export const DataContext = createContext()

const UserContext = ({ children }) => {

  const [user, setUser] = useState({
    name: "Sarthak",
    age: 22,
    city: "Bhopal"
  })

  return (
    <DataContext.Provider value={{ user, setUser }}>
      {children}
    </DataContext.Provider>
  )
}

export default UserContext
```

Now any component can also update the user:

```jsx
const { user, setUser } = useContext(DataContext)

// Update user from any component
setUser({ name: "Aryan", age: 25, city: "Delhi" })
```

All components consuming the context will **automatically re-render** with the new data.

---

## 11. Context API vs Redux Toolkit

| | Context API | Redux Toolkit |
|---|---|---|
| **Best for** | Small to medium apps | Large, complex apps |
| **Setup** | Simple — built into React | Needs installation and setup |
| **Performance** | Re-renders all consumers on change | More optimized updates |
| **Learning curve** | Easy | Steeper |
| **Use when** | Sharing a few global values | Complex state with many actions |

> For a smaller level application we can use Context API and for large applications we use Redux Toolkit.

---

## Summary

- **Context API** — built-in React feature to share data across components without props drilling.

- **3 steps:** `createContext()` → `Provider` with `value` → `useContext()` in consumers.

- **`createContext()`** — creates the context object. Export it so components can subscribe.

- **`Provider`** — wraps your app (or part of it). Whatever is in `value` is accessible to all children.

- **`children` prop** — represents everything placed inside a wrapper component. `<UserContext><App /></UserContext>` — `<App />` is `children`.

- **`useContext(DataContext)`** — hook that reads the current value from the Provider. No props needed.

- Combine with `useState` to make context data dynamic — any update re-renders all consumers.

- **Context API for small apps. Redux Toolkit for large apps.**

---