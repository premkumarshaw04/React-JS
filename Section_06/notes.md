# Section 6 — React Router DOM

---

## What are Routes?

Routes are the **rules that tell React which component to show based on the current URL.**

```
URL: /          →  Show <Home />
URL: /about     →  Show <About />
URL: /contact   →  Show <Contact />
```

In React Router DOM, you define routes like this:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

**`<Routes>`** — the container that holds all your route definitions.

At any given time, it looks at the current URL and renders **only the one matching route.**

**`<Route>`** — defines one rule: *"if the URL is this `path`, render this `element`."*

Think of it like a switch statement:

```
Current URL = "/about"
  → Routes checks all paths
    → path="/"       ? No
    → path="/about"  ? Yes ✅
      → Render <About />
```

Only one route renders at a time — whichever path matches the current URL.

---

---

## 1. What is Routing?

**What:**

Routing means — **showing different pages or views based on the URL in the browser.**

When you go to `website.com/about`, you see the About page.

When you go to `website.com/contact`, you see the Contact page.

This switching between pages based on URL is called **routing.**

**How it works:**

```
User visits /home     →  Show Home component
User visits /about    →  Show About component
User visits /contact  →  Show Contact component
```

The URL changes → Router reads it → Matching component renders.

**Why we need it:**

React apps are **Single Page Applications (SPA)** — there is only one HTML file.

Without routing, you cannot have multiple pages — everything would be on one screen.

Routing gives the *feeling* of multiple pages while staying on the same HTML file.

**Advantages:**

- Multiple pages in a single page application

- No full page reload when navigating — fast and smooth

- Browser back/forward buttons work correctly

- Each page has its own URL — shareable and bookmarkable

**Visual Explanation:**

```
Without Routing:
─────────────────────────────────────
URL stays same  →  only one view  →  no navigation possible


With Routing:
─────────────────────────────────────
website.com/          →  <Home />
website.com/about     →  <About />
website.com/contact   →  <Contact />
website.com/services  →  <Services />

URL changes → React swaps the component → No page reload ✅
```

---

## 2. Types of Routing

**1. Client-Side Routing:**

Routing handled entirely in the browser by JavaScript — no request sent to the server on navigation.

React Router DOM uses this.

URL changes, JavaScript swaps the component — fast, no reload.

**2. Server-Side Routing:**

Every time the URL changes, a request goes to the server, the server sends back a new HTML page, browser reloads.

Traditional websites (plain HTML) use this.

Slower — full reload on every navigation.

**3. Hash Routing:**

URL uses a `#` symbol: `website.com/#/about`

Everything after `#` is handled by the browser — never sent to the server.

Used when you can't configure the server (like GitHub Pages).

**4. Memory Routing:**

Routing that happens in memory — URL in the browser does not change.

Used in React Native (mobile apps) or testing environments where there is no browser URL bar.

---

## 3. What is React Router DOM?

**What:**

React Router DOM is an **external library** that adds routing to React apps.

Routing is not built into React — you need this library to create multiple pages and navigate between them.

**Why:**

React on its own only renders UI — it has no concept of URLs or pages.

React Router DOM adds that capability — it watches the URL and renders the matching component.

**Install:**

```bash
npm i react-router-dom
```

**Advantages:**

- Clean, declarative way to define routes

- No page reload on navigation — smooth user experience

- Nested routes — pages inside pages

- URL parameters — `/user/123` → access `123` as a param

- Programmatic navigation — redirect user via code

- Browser back/forward buttons work out of the box

---

## 4. Types of Routers in React Router DOM

**1. `BrowserRouter`**

Uses the actual URL: `website.com/about`

Most commonly used in real web apps.

Requires server to be configured to handle all routes — Vite handles this automatically in development.

```jsx
import { BrowserRouter } from 'react-router-dom'
```

**2. `HashRouter`**

Uses hash in URL: `website.com/#/about`

Works without server configuration — good for static hosting like GitHub Pages.

Not preferred for professional projects.

```jsx
import { HashRouter } from 'react-router-dom'
```

**3. `MemoryRouter`**

Keeps routing in memory — URL in browser does not change.

Used in React Native and testing.

```jsx
import { MemoryRouter } from 'react-router-dom'
```

**4. `StaticRouter`**

Used for server-side rendering (SSR) — renders routes on the server.

Used with frameworks like Next.js or custom SSR setups.

**We will use `BrowserRouter`** — it is the standard for all real web projects.

---

## 5. How to Set Up React Router DOM

**Step 1 — Wrap `<App />` with `BrowserRouter` in `main.jsx`:**

```jsx
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

`BrowserRouter` wraps the entire app — this activates routing for every component inside `App`.

Everything inside `BrowserRouter` can now use routing features.

**Step 2 — Define Routes in `App.jsx`.**

---

## 6. Full Working Example — 4 Pages with React Router DOM

### Folder Structure:

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── Services.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

### `main.jsx` — Wrap App with BrowserRouter

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

---

### `App.jsx` — Define All Routes

```jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Services from './components/Services'

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
      </Routes>

    </div>
  )
}

export default App
```

**Line by line:**

`import { Routes, Route } from 'react-router-dom'` — `Routes` is the container for all your routes. `Route` defines one individual route.

`<Navbar />` — placed outside `<Routes>` so it appears on every page without being affected by routing.

`<Routes>` — wrapper that holds all `<Route>` definitions. Only the matching route renders at a time.

`<Route path="/" element={<Home />} />` — when URL is `/` (homepage), render `<Home />`.

`<Route path="/about" element={<About />} />` — when URL is `/about`, render `<About />`.

`<Route path="/contact" element={<Contact />} />` — when URL is `/contact`, render `<Contact />`.

`<Route path="/services" element={<Services />} />` — when URL is `/services`, render `<Services />`.

Only **one** `<Route>` renders at a time — whichever `path` matches the current URL.

---

### `Navbar.jsx` — Navigation Links

```jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-zinc-900 text-white">

      <h2 className="text-xl font-bold">MyApp</h2>

      <div className="flex gap-8">
        <Link to="/" className="hover:text-zinc-400 transition-colors">Home</Link>
        <Link to="/about" className="hover:text-zinc-400 transition-colors">About</Link>
        <Link to="/contact" className="hover:text-zinc-400 transition-colors">Contact</Link>
        <Link to="/services" className="hover:text-zinc-400 transition-colors">Services</Link>
      </div>

    </nav>
  )
}

export default Navbar
```

**What is `<Link>`:**

`<Link>` is React Router DOM's replacement for the HTML `<a>` tag.

```jsx
// HTML way — causes full page reload ❌
<a href="/about">About</a>

// React Router way — no reload, smooth navigation ✅
<Link to="/about">About</Link>
```

`to="/about"` — tells the router which path to navigate to when clicked.

`<Link>` changes the URL and React Router renders the matching component — **without reloading the page.**

---

### Page Components

```jsx
// Home.jsx
import React from 'react'

const Home = () => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Home Page</h1>
      <p className="mt-4 text-zinc-600">Welcome to the homepage.</p>
    </div>
  )
}

export default Home
```

```jsx
// About.jsx
import React from 'react'

const About = () => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">About Page</h1>
      <p className="mt-4 text-zinc-600">This is the about page.</p>
    </div>
  )
}

export default About
```

```jsx
// Contact.jsx
import React from 'react'

const Contact = () => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Contact Page</h1>
      <p className="mt-4 text-zinc-600">Reach out to us here.</p>
    </div>
  )
}

export default Contact
```

```jsx
// Services.jsx
import React from 'react'

const Services = () => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Services Page</h1>
      <p className="mt-4 text-zinc-600">Here are our services.</p>
    </div>
  )
}

export default Services
```

---

## 7. How It All Works Together

```
User clicks "About" in Navbar
  ↓
<Link to="/about"> fires
  ↓
URL changes to website.com/about (no page reload)
  ↓
BrowserRouter detects URL change
  ↓
<Routes> checks all <Route> paths
  ↓
path="/about" matches ✅
  ↓
element={<About />} renders
  ↓
About page appears on screen
  ↓
Navbar stays — it is outside <Routes>
```

---

## 8. `<Link>` vs `<NavLink>`

React Router DOM also has `<NavLink>` — same as `<Link>` but adds an **active class automatically** when the link matches the current URL.

```jsx
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? "text-blue-400" : "text-white"}
>
  About
</NavLink>
```

When you're on `/about`, that link gets `text-blue-400` — visually showing which page you're on.

Useful for highlighting the current active page in a navbar.

---

## Summary

- **Routing** — showing different components based on the URL. Makes SPA feel like a multi-page app.

- **React Router DOM** — external library for routing in React. Install with `npm i react-router-dom`.

- **`BrowserRouter`** — wraps `<App />` in `main.jsx`. Activates routing for the whole app.

- **`Routes`** — container for all routes. Renders only the one matching route at a time.

- **`Route`** — defines one path and what component to render: `<Route path="/about" element={<About />} />`.

- **`Link`** — replaces `<a>` tag. Changes URL without reloading the page.

- **`NavLink`** — same as `Link` but adds active styling to the current page's link.

- **Navbar outside `<Routes>`** — so it appears on every page regardless of which route is active.

- Types of routers: `BrowserRouter` (standard), `HashRouter` (static hosting), `MemoryRouter` (mobile/testing), `StaticRouter` (SSR).

---