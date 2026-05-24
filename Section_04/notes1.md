# Section 4 — Fragments and Components

---

## 1. Fragments — The Invisible Wrapper

**What:**

A Fragment is a **wrapper that holds multiple elements together without adding any extra HTML element to the DOM.**

```jsx
// Without Fragment — you need a div wrapper
const App = () => {
  return (
    <div>           {/* this div is unnecessary — adds extra element to DOM */}
      <h1>Hello</h1>
      <h2>World</h2>
    </div>
  )
}

// With Fragment — no extra element in DOM
const App = () => {
  return (
    <>
      <h1>Hello</h1>
      <h2>World</h2>
    </>
  )
}
```

`<>...</>` is the shorthand for Fragment.

The full version is `<React.Fragment>...</React.Fragment>` — but `<>` is used everywhere.

**Why:**

React components must return one parent element — but sometimes you don't want an extra `div` in your HTML output.

That extra `div` clutters the DOM and can break CSS layouts (especially flexbox and grid — where direct parent-child relationships matter).

Fragment gives you the required single parent without polluting the DOM.

**Where it is used:**

- When returning multiple sibling elements from a component

- When extra wrapper `div` would break your CSS layout

- When building lists or table rows where extra `div` is not valid HTML

**Advantages:**

- Cleaner DOM — no unnecessary wrapper elements

- CSS layouts don't break — flexbox and grid children stay direct

- Valid HTML — for example, `<tr>` inside a table cannot have a `<div>` wrapper, but can have a Fragment

---

## 2. What are Components?

**What:**

A Component is a **reusable, independent piece of UI** — a JavaScript function that returns JSX.

Instead of building your entire website as one big block of code, you break it into small, manageable pieces — each piece is a component.

```jsx
// One big block — hard to manage
const App = () => {
  return (
    <div>
      <nav>...entire navbar code...</nav>
      <main>...entire page code...</main>
      <footer>...entire footer code...</footer>
    </div>
  )
}

// Broken into components — clean and manageable
const App = () => {
  return (
    <div>
      <Navbar />
      <Main />
      <Footer />
    </div>
  )
}
```

**Why we use Components:**

> Instead of making a website as one entity, we make reusable components under it.
> If we want to make some changes, we don't need to change the entire website — we only change that one component.

This is the core idea of React — **component-based architecture.**

**Advantages:**

- **Reusability** — write a `Button` component once, use it 50 times across your app

- **Maintainability** — change one component without touching the rest of the app

- **Readability** — `App.jsx` stays clean — just a list of components, easy to read

- **Separation of concerns** — each component owns its own JSX, CSS, and logic

- **Team friendly** — different developers can work on different components at the same time

**Real World Use Cases:**

| Component | Where you see it |
|---|---|
| `Navbar` | Top navigation on every page |
| `Footer` | Bottom section on every page |
| `ProductCard` | E-commerce — each product in a grid |
| `Modal` | Pop-up dialog box |
| `Button` | Used everywhere — styled once, reused |
| `Avatar` | User profile picture in apps like Twitter, Slack |
| `Sidebar` | Dashboard apps like Notion, VS Code |

---

## 3. The `components/` Folder — Is It Required?

**Short answer — No, it is not technically required.**

React doesn't force any folder structure on you.

**But — Yes, you should always create it. Here's why:**

As your app grows, you'll have many component files — `Header.jsx`, `Footer.jsx`, `Navbar.jsx`, `Card.jsx`, `Modal.jsx`, and so on.

If all of these live directly in `src/`, it becomes messy very fast:

```
src/
  App.jsx
  main.jsx
  index.css
  Header.jsx       ← lost in the clutter
  Footer.jsx       ← lost in the clutter
  Navbar.jsx       ← lost in the clutter
  Card.jsx         ← lost in the clutter
  Modal.jsx        ← lost in the clutter
```

With a `components/` folder:

```
src/
  components/
    Header.jsx     ← organized
    Footer.jsx     ← organized
    Navbar.jsx     ← organized
    Card.jsx       ← organized
  App.jsx
  main.jsx
  index.css
```

**Problems it solves:**

- Easy to find any component — you always know where to look

- `App.jsx` and `main.jsx` are not mixed up with component files

- Clean separation — setup files in `src/`, UI components in `src/components/`

- As the project scales, you can further organize: `components/ui/`, `components/layout/`, etc.

**Standard practice:**

Every React project you'll work on professionally will have a `components/` folder.

Make it a habit from the start.

---

## 4. Filename Must Start with a Capital Letter

**Rule:**

Component filenames in React **must start with a capital letter.**

```
header.jsx   ❌ Wrong
Header.jsx   ✅ Correct

footer.jsx   ❌ Wrong
Footer.jsx   ✅ Correct
```

**Why this rule exists:**

In JSX, React distinguishes between HTML tags and React components by the first letter:

- **Lowercase** → treated as a built-in HTML element: `<div>`, `<h1>`, `<input>`

- **Uppercase** → treated as a React component: `<Header />`, `<Footer />`

```jsx
<header />   // React thinks this is an HTML <header> tag
<Header />   // React knows this is your custom Header component
```

If you name your file `header.jsx` and use `<Header />`, it still works — but the naming convention is to match the file name and component name exactly, both starting with uppercase.

**Always name your component files with a capital first letter — it avoids confusion.**

---

## 5. Code Walkthrough — App.jsx with Components

```jsx
import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Header />
      <Footer />
    </>
  )
}

export default App
```

**Line by line:**

`import Header from './components/Header'` — brings the `Header` component from the `components` folder.

`import Footer from './components/Footer'` — same for Footer.

`<>...</>` — Fragment used as the wrapper, so no extra `div` in the DOM.

`<Header />` — calls the Header component and renders whatever it returns.

`<Footer />` — same for Footer.

`App.jsx` has no actual HTML of its own — it just assembles components. **This is the goal — keep App.jsx clean.**

---

## 6. Header Component — With Tailwind CSS

```jsx
// src/components/Header.jsx

import React from 'react'

const Header = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-zinc-900 text-white">

      <h2 className="text-xl font-bold tracking-wide">Sheriyans</h2>

      <div className="flex gap-8">
        <h4 className="cursor-pointer hover:text-zinc-400 transition-colors">About</h4>
        <h4 className="cursor-pointer hover:text-zinc-400 transition-colors">Contact</h4>
        <h4 className="cursor-pointer hover:text-zinc-400 transition-colors">Services</h4>
        <h4 className="cursor-pointer hover:text-zinc-400 transition-colors">Account</h4>
      </div>

    </nav>
  )
}

export default Header
```

**Tailwind classes used — what each does:**

| Class | What it does |
|---|---|
| `flex` | Makes nav a flex container |
| `items-center` | Vertically centers the children |
| `justify-between` | Pushes logo left, links right |
| `px-10 py-4` | Horizontal and vertical padding |
| `bg-zinc-900` | Dark background color |
| `text-white` | White text |
| `text-xl font-bold` | Larger, bold logo text |
| `tracking-wide` | Slightly spaced out letters |
| `flex gap-8` | Links in a row with spacing between |
| `hover:text-zinc-400` | Grey color on hover |
| `transition-colors` | Smooth color transition on hover |

---

## 7. Footer Component

```jsx
// src/components/Footer.jsx

import React from 'react'

const Footer = () => {
  return (
    <div className="text-center py-6 bg-zinc-900 text-zinc-400 text-sm">
      This is footer
    </div>
  )
}

export default Footer
```

---

## 8. The Big Picture — What App.jsx Should Look Like

This is the goal of using components — `App.jsx` stays completely clean:

```jsx
import React from 'react'
import Navbar from './components/Navbar'
import Page1 from './components/Page1'
import Page2 from './components/Page2'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />   {/* Navbar code lives in Navbar.jsx */}
      <Page1 />   {/* Page1 code lives in Page1.jsx */}
      <Page2 />   {/* Page2 code lives in Page2.jsx */}
      <Footer />  {/* Footer code lives in Footer.jsx */}
    </div>
  )
}

export default App
```

Each component owns its own code.

`App.jsx` just assembles them — like a table of contents for your UI.

If something breaks in the Navbar, you go to `Navbar.jsx` — you don't touch anything else.

If you want to add a new section, you create a new component and add one line in `App.jsx`.

**This is the React way of building UIs.**

---

## Summary

- **Fragment `<>...</>`** — invisible wrapper. Lets you return multiple elements without adding an extra `div` to the DOM. Keeps your HTML clean and CSS layouts intact.

- **Components** — reusable, independent pieces of UI. Each is a function that returns JSX. Build your entire app by composing components together.

- **Why components** — reusability, easy maintenance, clean code, team-friendly, change one thing without breaking everything else.

- **`components/` folder** — not forced by React, but always create it. Keeps your `src/` folder organized and scalable.

- **Capital letter rule** — filenames and component names must start with uppercase. React uses this to tell apart HTML tags (lowercase) from your components (uppercase).

- **`App.jsx` stays clean** — it only imports and assembles components. The actual code lives inside each component file.

- **The React way** — don't build a website as one big block. Break it into components, assemble them in `App.jsx`.

---

# Props and Props Drilling

---

## 1. What are Props?

**What:**

Props (short for **properties**) are a way to **pass data from a parent component to a child component.**

> Props mean — we can pass data into components.

Just like a function accepts arguments, a component accepts props.

```jsx
// Passing data to a component
<Card a="Sarthak" />

// Receiving that data inside the component
const Card = (props) => {
  return <h1>{props.a}</h1>
}
```

**Why:**

Without props, every component would show the same fixed content.

With props, **the same component can show different data** every time it's used — making components truly reusable.

**Advantages:**

- One component, many uses — just pass different data each time

- Parent controls what data the child receives

- Keeps components flexible and reusable

---

## 2. Example 1 — Basic Props

**App.jsx:**

```jsx
import React from 'react'
import Card from './components/Card'

const App = () => {
  return (
    <div>
      <Card a="Sarthak" />
      <Card a="Harsh" />
    </div>
  )
}

export default App
```

**Card.jsx:**

```jsx
import React from 'react'

const Card = (props) => {
  return (
    <div>
      <h1>Username is {props.a}</h1>
    </div>
  )
}

export default Card
```

**Output:**

```
Username is Sarthak
Username is Harsh
```

**What is happening:**

`<Card a="Sarthak" />` — `a` is the prop name, `"Sarthak"` is the value being passed.

React collects all the props you pass and bundles them into **one object** called `props`.

Inside `Card`, `props` looks like this:

```js
props = { a: "Sarthak" }
```

`props.a` accesses the value `"Sarthak"`.

The same `Card` component is used twice — with different data each time.

**Note — filename should start with capital letter:**

In your code the component is `const card` (lowercase) — that should be `const Card` (uppercase) to follow React convention.

---

## 3. Example 2 — Multiple Props

**App.jsx:**

```jsx
import React from 'react'
import Card from './components/Card'

const App = () => {
  return (
    <div>
      <Card user="Sarthak" surname="Sharma" age="55" city="Bhopal" />
    </div>
  )
}

export default App
```

**Card.jsx:**

```jsx
import React from 'react'

const Card = (props) => {
  return (
    <div>
      <h1>{props.user} {props.surname}</h1>
      <h2>{props.city}, {props.age}</h2>
      <button>Add Friend</button>
    </div>
  )
}

export default Card
```

**Output:**

```
Sarthak Sharma
Bhopal, 55
[Add Friend]
```

**What `props` looks like inside Card:**

```js
props = {
  user: "Sarthak",
  surname: "Sharma",
  age: "55",
  city: "Bhopal"
}
```

You access each value with `props.user`, `props.surname`, and so on.

---

## 4. Destructuring Props — Cleaner Way

Instead of writing `props.user`, `props.age` everywhere, you can **destructure** props directly in the function parameter:

```jsx
// Without destructuring
const Card = (props) => {
  return <h1>{props.user} {props.surname}</h1>
}

// With destructuring — cleaner
const Card = ({ user, surname, age, city }) => {
  return (
    <div>
      <h1>{user} {surname}</h1>
      <h2>{city}, {age}</h2>
      <button>Add Friend</button>
    </div>
  )
}
```

Same output — just cleaner code.

This is very commonly used in real projects and interviews.

---

## 5. What is Props Drilling?

**What:**

Props drilling means — **passing data through multiple layers of components** to reach a deeply nested child that actually needs it.

```
App  →  passes data to  →  Parent  →  passes to  →  Child  →  passes to  →  GrandChild
```

`GrandChild` needs the data — but it has to pass through `Parent` and `Child` even if they don't use it.

```jsx
// App passes username down the chain
const App = () => <Parent username="Sarthak" />

const Parent = (props) => <Child username={props.username} />
  // Parent doesn't use username — just passes it down

const Child = (props) => <GrandChild username={props.username} />
  // Child doesn't use it either — just passes it down

const GrandChild = (props) => <h1>Hello {props.username}</h1>
  // Finally used here
```

**Why it's a problem:**

- Middle components receive props they don't need

- If the data changes, you have to update every component in the chain

- Code becomes messy and hard to maintain as the app grows

**How it's solved:**

Props drilling is solved using **React Context** or **state management libraries** like Redux — which let any component access data directly without passing through every layer.

*(These are separate topics — you'll learn them soon.)*

---

## Summary

- **Props** — a way to pass data from parent to child component. Same component, different data each time.

- React bundles all passed attributes into one `props` object inside the child component.

- Access values with `props.name` — or destructure for cleaner code: `({ name })`.

- **Props drilling** — passing data through multiple component layers just to reach a deeply nested child. Works but gets messy in large apps.

- Props only flow **one way** — parent to child. Never child to parent.

---

