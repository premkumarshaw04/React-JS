# Section 2 — JSX, Hooks, and useState

---

## 1. What is JSX, Why We Use It, and Its Advantages

**What:**

JSX stands for **JavaScript XML**.

It is a syntax that lets you write **HTML-like code directly inside JavaScript**.

```jsx
function App() {
  return <h1>Hello From React</h1>
}
```

That `<h1>` sitting inside a JavaScript function — that is JSX.

It looks like HTML but it is JavaScript under the hood.

**Why:**

Without JSX, creating UI in React means writing `React.createElement()` for every single element.

```js
// Without JSX — hard to read, hard to write
React.createElement('div', null,
  React.createElement('h1', null, "Title"),
  React.createElement('p', null, "Paragraph"),
  React.createElement('button', null, "Click Me")
)
```

```jsx
// With JSX — clean, readable, looks natural
<div>
  <h1>Title</h1>
  <p>Paragraph</p>
  <button>Click Me</button>
</div>
```

Both produce the exact same output — but JSX is far easier to read, write, and debug.

**Advantages of JSX:**

- Looks like HTML — easy to visualize the UI structure

- JavaScript and UI logic live together in the same place

- Easy to use JavaScript expressions inside UI using `{}`

- Easier to debug — errors are much more readable

- Vite + Babel converts JSX to plain JavaScript before the browser sees it — so browsers have no issues running it

---

## 2. `rafce` — React Arrow Function Export Component

**What:**

`rafce` is a **VS Code snippet** — a shortcut that auto-generates a React component for you.

When you type `rafce` inside a `.jsx` file in VS Code and press Enter, it generates this:

```jsx
import React from 'react'

const App = () => {
  return (
    <div>App</div>
  )
}

export default App
```

**Why we use it:**

Every time you create a new component, the structure is always the same — import React, make an arrow function, export it.

Instead of typing all of this every time, `rafce` generates it instantly.

**What does this generated code do:**

- `import React from 'react'` — brings in React (needed for JSX)

- `const App = () => {}` — creates the component as an arrow function

- `return (...)` — returns the JSX (the UI) from the component

- `export default App` — makes this component available to other files

**To use `rafce`:**

Install the **ES7+ React/Redux/React-Native snippets** extension in VS Code.

Then in any `.jsx` file, type `rafce` and press Enter.

---

## 3. You Cannot Return More Than One Element from a Component

**What:**

In React, a component function can only return **one parent element**.

You cannot return two sibling elements directly.

```jsx
// ❌ Wrong — returning two elements directly
const App = () => {
  return (
    <h1>Hello</h1>
    <h2>Hello 2</h2>
  )
}
```

This will throw an error.

**Why:**

A function can only return one value.

JSX gets converted to `React.createElement()` calls — and you cannot return two `createElement` calls from one function.

**How — Wrap everything in one parent div:**

```jsx
// ✅ Correct — wrapped in one parent div
import React from 'react'

const App = () => {
  return (
    <div>
      <h1>Hello</h1>
      <h2>Hello 2</h2>
    </div>
  )
}

export default App
```

Now there is one parent (`div`) that contains both children — and only that one parent is returned.

**Alternative — React Fragment:**

If you don't want an extra `div` in the DOM, you can use a **Fragment** — an empty wrapper that doesn't add any real HTML element:

```jsx
// ✅ Using Fragment — no extra div in DOM
const App = () => {
  return (
    <>
      <h1>Hello</h1>
      <h2>Hello 2</h2>
    </>
  )
}
```

`<>...</>` is shorthand for `<React.Fragment>...</React.Fragment>`.

---

## 4. Variables in JSX

**What:**

You can declare variables inside a component and use them in JSX using `{}` curly braces.

Anything inside `{}` is treated as a **JavaScript expression**.

**Accessing a variable in JSX:**

```jsx
import React from 'react'

const App = () => {
  const user = "Prem"
  const age = 100

  return (
    <div>
      <h1>Hello {user}, {age}</h1>
    </div>
  )
}

export default App

// Output: Hello Prem, 100
```

`{user}` and `{age}` are replaced by their actual values when React renders the component.

**What you can put inside `{}`:**

```jsx
const name = "Prashant"
const num = 5

// Variable
<h1>{name}</h1>

// Expression
<h1>{num * 2}</h1>

// Ternary
<h1>{num > 3 ? "Greater" : "Smaller"}</h1>

// Function call
<h1>{getName()}</h1>
```

**What you cannot put inside `{}`:**

```jsx
// ❌ if/else statements don't work inside JSX directly
<h1>{if(true){ "Hello" }}</h1>  // Error

// ✅ Use ternary instead
<h1>{true ? "Hello" : "Bye"}</h1>
```

---

## 5. Event Handling in JSX — `onClick` and Others

**What:**

In JSX, you attach events to elements using **event attributes** like `onClick`, `onChange`, `onSubmit`, etc.

These are the JSX versions of HTML's `onclick`, `onchange`, `onsubmit` — written in **camelCase**.

```jsx
<button onClick={someFunction}>Click Me</button>
```

**Common Event Handlers:**

| JSX Event | When it fires |
|---|---|
| `onClick` | When the element is clicked |
| `onChange` | When input value changes |
| `onSubmit` | When a form is submitted |
| `onMouseEnter` | When mouse hovers over element |
| `onMouseLeave` | When mouse leaves element |
| `onKeyDown` | When a keyboard key is pressed |
| `onFocus` | When an input is focused |
| `onBlur` | When an input loses focus |

**How to pass a function to an event:**

```jsx
const changeUser = () => {
  console.log("Button clicked")
}

// ✅ Correct — pass the function reference
<button onClick={changeUser}>Change User</button>

// ❌ Wrong — this calls the function immediately on render, not on click
<button onClick={changeUser()}>Change User</button>
```

Pass the **function reference** — not the function call.

No `()` after the function name unless you're wrapping it inside an arrow function.

---

## 6. Why Direct DOM Change Does Not Work in React

**The Problem:**

```jsx
const App = () => {
  let user = 'Sarthak'

  const changeUser = () => {
    user = "Aryan"  // ❌ This changes the variable but nothing happens on screen
  }

  return (
    <div>
      <h1>Username is {user}</h1>
      <button onClick={changeUser}>Change User</button>
    </div>
  )
}
```

You click the button, `user` becomes `"Aryan"` in memory — but the screen still shows `"Sarthak"`.

**Why:**

React does not know that your variable changed.

React only re-renders (updates the screen) when it is **told** that something changed.

Simply changing a plain `let` variable does not tell React anything.

You are directly manipulating a variable — React has no idea, so the UI stays the same.

**The React way of thinking:**

> React wants you to *tell it what you want* — and React will update the UI for you.

For this, React gives us **Hooks** — and specifically `useState`.

---

## 7. What are Hooks?

**What:**

Hooks are **special functions** built into React that give your components powerful features.

They always start with the word `use` — like `useState`, `useEffect`, `useRef`, etc.

> Hooks are special type of functions which provide powerful features in React — like state management and more.

**Why Hooks exist:**

Previously, React worked with **Class Components** — for every feature (state, lifecycle, etc.) you had to create a class with specific methods.

Classes were long, complex, and hard to reuse logic from.

React then introduced **Functional Components + Hooks** — which are simpler, cleaner, and much easier to work with.

Now everything is done with simple functions + hooks.

**What features do Hooks provide:**

| Hook | What it does |
|---|---|
| `useState` | Manages state — stores and updates data in a component |
| `useEffect` | Runs code after render — for API calls, timers, etc. |
| `useRef` | Holds a reference to a DOM element or a value |
| `useContext` | Shares data across components without passing props |
| `useMemo` | Caches expensive calculations for performance |
| `useCallback` | Caches functions to avoid unnecessary re-renders |

**What is State Management:**

State is **data that belongs to a component** — data that can change over time and affects what the UI looks like.

State management means — keeping track of that data, and updating the UI automatically whenever that data changes.

Example: a counter value, a user's name, whether a modal is open or closed — all of these are "state."

**Custom Hooks:**

You can also make your own hooks — called **custom hooks**.

If you have logic you want to reuse across multiple components, you can put it in a custom hook.

Custom hooks also start with `use` — like `useWindowSize`, `useFetch`, etc.

---

## 8. `useState` Hook — The Most Important Hook

**What:**

`useState` is a hook that lets you create a **state variable** in a component.

When a state variable changes, React automatically **re-renders** the component — updating the UI.

**Syntax:**

```jsx
const [a, setA] = useState(10)
```

This one line does three things:

- Creates a state variable `a` with initial value `10`

- Creates `setA` — a function to update `a`

- Whenever `setA` is called, React re-renders the component with the new value

**Breaking it down:**

| Part | What it is | Role |
|---|---|---|
| `a` | State variable | **Readable** — you display this in JSX |
| `setA` | Setter function | **Writable** — you call this to change `a` |
| `useState(10)` | Hook call | Sets initial value of `a` as `10` |

**Why you cannot change state directly:**

```jsx
// ❌ Wrong — React doesn't know about this change
a = 20

// ✅ Correct — setA tells React to update and re-render
setA(20)
```

`setA(20)` does two things internally:

1. Updates the value of `a` to `20`

2. Tells React — *"something changed, please re-render this component"*

React then re-renders the component and the UI shows the new value.

**Full example:**

```jsx
import React, { useState } from 'react'

const App = () => {
  const [a, setA] = useState(10)

  const changeA = () => {
    setA(20)  // Updates a to 20 and triggers re-render
  }

  return (
    <div>
      <h1>Value of a is {a}</h1>
      <button onClick={changeA}>Change A</button>
    </div>
  )
}

export default App
```

When the button is clicked:

```
changeA() runs
  → setA(20) is called
    → React updates a to 20
      → Component re-renders
        → UI shows: "Value of a is 20" ✅
```

**Importing useState:**

`useState` is not available globally — you must import it from React:

```jsx
import React, { useState } from 'react'
```

`{ useState }` is a named import from the `react` package.

---

## 9. Counter — Putting It All Together

**What:**

A counter is a classic example to understand `useState` — increment and decrement a number using buttons.

```jsx
import React, { useState } from 'react'

const App = () => {
  const [num, setNum] = useState(0)  // Initial value is 0

  return (
    <div>
      <h3>Number is {num}</h3>

      {/* Using a normal function inside onClick */}
      <button onClick={function() {
        setNum(num + 10)
      }}>Increment</button>

      {/* Using an arrow function inside onClick */}
      <button onClick={() => {
        setNum(num - 10)
      }}>Decrement</button>
    </div>
  )
}

export default App
```

**What is happening:**

- `useState(0)` — `num` starts at `0`

- Increment button — calls `setNum(num + 10)`, React re-renders with new value

- Decrement button — calls `setNum(num - 10)`, React re-renders with new value

**Two ways to write inline functions on events:**

```jsx
// Normal function
onClick={function() { setNum(num + 10) }}

// Arrow function (cleaner, preferred)
onClick={() => { setNum(num + 10) }}
```

Both do the same thing — arrow function is just shorter and cleaner.

**Why each click updates the screen:**

```
Button clicked
  → setNum() called with new value
    → React sees state changed
      → Re-renders the component
        → {num} in JSX shows new value ✅
```

This is the power of `useState` — you change the state, React handles the rest.

---

## Summary

- **JSX** — combination of JavaScript and HTML. Makes writing UI natural and readable. Vite converts it to plain JS before the browser sees it.

- **`rafce`** — VS Code snippet that generates a React arrow function component instantly.

- A component can only **return one parent element** — wrap siblings in a `div` or `<>` fragment.

- **Variables in JSX** — use `{}` to inject any JavaScript expression into JSX.

- **Events in JSX** — written in camelCase (`onClick`, `onChange`). Pass function reference, not function call.

- **Direct variable change doesn't work** — React only re-renders when told via state. Plain `let` variables don't trigger re-renders.

- **Hooks** — special functions that give components powerful features. Always start with `use`. React moved from class components to functional components + hooks.

- **State** — data that belongs to a component and can change over time. When state changes, React updates the UI.

- **`useState(initialValue)`** — returns `[variable, setterFunction]`. Use the setter to change state — React re-renders automatically.

- **Counter** — `useState(0)` + `setNum(num + 10)` / `setNum(num - 10)` — every setter call triggers a re-render with the updated value.

---

# Adding CSS in React — Normal CSS and Tailwind CSS

---

## 1. Adding Normal CSS in React

**What:**

In React, you write your CSS in a separate `.css` file and import it directly into your component or into `main.jsx`.

**How:**

```jsx
// In main.jsx or any component file
import './index.css'
```

Once imported, the styles in that CSS file apply to the entire app (if imported in `main.jsx`) or to that specific component's file.

**Example:**

```css
/* index.css */
h1 {
  color: red;
  font-size: 2rem;
}
```

```jsx
// main.jsx
import './index.css'
```

Now every `h1` in your app will be red.

**For component-level CSS:**

You can also create a CSS file per component and import it only in that component:

```jsx
// App.jsx
import './App.css'
```

This keeps styles organized — each component has its own CSS file.

---

## 2. What is Tailwind CSS?

**What:**

Tailwind CSS is a **utility-first CSS framework**.

Instead of writing CSS in a separate file, you apply small pre-built CSS classes **directly on your HTML/JSX elements**.

```jsx
// Normal CSS way
<h1 className="title">Hello</h1>

// CSS file
.title {
  font-size: 2rem;
  font-weight: bold;
  color: blue;
}
```

```jsx
// Tailwind way — no separate CSS file needed
<h1 className="text-2xl font-bold text-blue-500">Hello</h1>
```

Both produce the same result — but with Tailwind, the styling is written directly on the element using ready-made class names.

**Why we use Tailwind:**

- You don't have to switch between JSX and CSS files constantly

- No time wasted thinking of class names like `.title`, `.container`, `.wrapper`

- Tailwind classes are consistent — `text-sm`, `text-lg`, `text-xl` — predictable sizing system

- Building responsive designs is very fast with built-in responsive classes

- Your CSS file stays small — Tailwind only includes the classes you actually use

**Advantages of Tailwind over Normal CSS:**

| | Normal CSS | Tailwind CSS |
|---|---|---|
| **Where styles are written** | Separate `.css` file | Directly on elements |
| **Class naming** | You invent names | Pre-built class names |
| **Responsive design** | Write media queries manually | Built-in: `md:`, `lg:` prefixes |
| **File size** | Can grow large over time | Only used classes are included |
| **Speed of development** | Slower | Much faster |
| **Consistency** | Depends on developer | Built-in design system |

---

## 3. Adding Tailwind CSS in React — v4 Setup (Current Method)

**Important note about versions:**

The old Tailwind setup commands you may have seen online:

```bash
# ❌ OLD — Tailwind v3 way (no longer needed in v4)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

These commands created two config files — `tailwind.config.js` and `postcss.config.js`.

**In Tailwind v4, both of these files are gone by default.**

The setup is now simpler, faster, and directly integrated with Vite.

---

### Current Setup Steps — Tailwind v4 with Vite + React

**Step 1 — Install Tailwind and the Vite plugin:**

```bash
npm install tailwindcss @tailwindcss/vite
```

Two packages:

- `tailwindcss` — the core Tailwind library

- `@tailwindcss/vite` — official Tailwind plugin for Vite (new in v4)

No `postcss`, no `autoprefixer` — Vite handles all of that internally now.

---

**Step 2 — Add Tailwind plugin to `vite.config.js`:**

Open your `vite.config.js` and update it:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ← add this

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),    // ← add this
  ],
})
```

This tells Vite to process your CSS through Tailwind automatically.

---

**Step 3 — Import Tailwind in your CSS file:**

Open `src/index.css` and replace everything in it with just this one line:

```css
@import "tailwindcss";
```

This single line activates all of Tailwind's utility classes in your project.

---

**Step 4 — Make sure `index.css` is imported in `main.jsx`:**

```jsx
// main.jsx
import './index.css'
```

It is usually already there by default — just confirm it exists.

---

**Step 5 — Start the dev server and test:**

```bash
npm run dev
```

Test if Tailwind is working by adding a class to any element:

```jsx
// App.jsx
function App() {
  return (
    <h1 className="text-3xl font-bold text-blue-500">
      Tailwind is working!
    </h1>
  )
}
```

If the heading appears large, bold, and blue — Tailwind is set up correctly. ✅

---

## 4. What Were `tailwind.config.js` and `postcss.config.js`? (v3 Context)

These files existed in **Tailwind v3** — understanding them helps when you see older code or tutorials.

### `tailwind.config.js` (v3)

This was Tailwind's configuration file.

It told Tailwind **which files to scan** for class names, and allowed you to customize colors, fonts, spacing, etc.

```js
// tailwind.config.js (v3 — no longer needed in v4)
module.exports = {
  content: ["./src/**/*.{js,jsx}"],  // scan these files for class names
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
      }
    }
  }
}
```

### `postcss.config.js` (v3)

PostCSS is a tool that transforms CSS.

Tailwind v3 ran as a PostCSS plugin — so this file was needed to connect them.

```js
// postcss.config.js (v3 — no longer needed in v4)
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

`autoprefixer` automatically added browser-specific CSS prefixes (like `-webkit-`) so your CSS worked across all browsers.

### Why Both Are Gone in v4:

Tailwind v4 changed the setup process significantly — no `tailwind.config.js` is required by default, PostCSS configuration is simpler, and the way you import Tailwind into your project is different.

In v4, customization is now done inside your CSS files directly using the `@theme` directive instead of a JavaScript config file.

So instead of `tailwind.config.js`, you now customize inside `index.css`:

```css
/* index.css — v4 way of customizing */
@import "tailwindcss";

@theme {
  --color-primary: #6366f1;
  --font-sans: "Inter", sans-serif;
}
```

Clean, simple, and all in one place.

---

## Complete Setup Summary — Tailwind v4 + Vite + React

```bash
# 1. Install
npm install tailwindcss @tailwindcss/vite
```

```js
// 2. vite.config.js — add the plugin
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

```css
/* 3. src/index.css — activate Tailwind */
@import "tailwindcss";
```

```jsx
// 4. main.jsx — confirm CSS is imported
import './index.css'
```

```bash
# 5. Run and test
npm run dev
```

---

## Summary

- Normal CSS in React — create a `.css` file and `import` it in your component or `main.jsx`.

- **Tailwind CSS** is a utility-first framework — you style elements using pre-built class names directly in JSX.

- Tailwind is faster to write, more consistent, and keeps your CSS file size small.

- **Old v3 setup** needed `tailwind.config.js` and `postcss.config.js` — those are gone in v4.

- **New v4 setup** — just install `tailwindcss @tailwindcss/vite`, add the Vite plugin, and add `@import "tailwindcss"` to your CSS. Done.

- Customization in v4 is done inside CSS using `@theme` — not in a JS config file.

---
