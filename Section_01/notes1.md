# Section 1: Basics of React

## Why React? — The Problem With Real DOM


## 1. We Already Have HTML, CSS, JS — Then Why React?

**What:**

HTML, CSS, and JavaScript are enough to build a website.

But when the website grows bigger — more buttons, more data, more user interactions — managing everything with plain JS becomes very messy and slow.

React is a JavaScript **library** (made by Facebook in 2013) that makes building large, interactive UIs easier, faster, and more organized.

**Why:**

The main problem React solves is **how the browser updates the page** when something changes.

With plain HTML + JS, even a tiny change on the page causes the **whole page to re-render** (reload internally).

React fixes this by being smart — it **only updates the part that actually changed**, nothing else.

**How:**

React introduces the concept of a **Virtual DOM** — a lightweight copy of the real page — that it uses to figure out *exactly* what changed, and then updates only that specific part in the browser.

---

## 2. What is the DOM?

**What:**

DOM stands for **Document Object Model**.

When a browser loads your HTML file, it doesn't just read it as plain text.

It converts your entire HTML into a **tree-like structure** of objects — where every HTML tag becomes a **node** (an object) that JavaScript can read and change.

This tree structure is called the **DOM**.

**Why:**

Because browsers need a way to represent your HTML as something JavaScript can interact with.

Without the DOM, JS would have no way to find your `h1`, change its text, or react to a button click.

**How:**

The browser parses your HTML and builds the DOM tree automatically every time the page loads.

You then use JavaScript methods like `document.getElementById()` or `document.querySelector()` to access and modify parts of this tree.

---

## 3. What Does a DOM Tree Look Like?

Imagine you have this simple HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <button>Click Me</button>
  </body>
</html>
```

The browser converts this into a DOM Tree like this:

```
Document
└── html
    ├── head
    │   └── title
    │       └── "My Page"
    └── body
        ├── h1
        │   └── "Hello World"
        └── button
            └── "Click Me"
```

Every box in this tree is a **node**.

The `html` tag is the **root node** — everything else branches out from it.

Nodes can be **element nodes** (like `h1`, `button`) or **text nodes** (like `"Hello World"`).

---

## 4. The Real DOM Problem — Re-rendering

**What:**

The **Real DOM** is the actual DOM that the browser maintains and displays on screen.

The problem is — the Real DOM is **slow to update**.

**Why:**

When you change *anything* in the Real DOM using JavaScript, the browser has to go through a process called **reflow and repaint** — it recalculates the layout and redraws the affected parts of the screen.

And in plain HTML + JS, even a small change can trigger the browser to **re-render a large portion of the page**, not just the tiny part you changed.

**Example — The h1 Problem:**

Say you have a website with a `h1` heading and a button.

When the user clicks the button, you want to change the text of `h1` — just that one line.

In plain JS, this is how it works internally:

```
User clicks button
  → JS updates the DOM
    → Browser re-renders the affected part of the page
      → If done carelessly (e.g. innerHTML on a big container),
        the entire section or page gets re-drawn
```

For a small website this feels fine.

But imagine a site with 50 components, live data, and constant user interactions — re-rendering big chunks of the DOM every time is **very hectic and slow**.

This is the problem React was built to fix.

---

## 5. How React Fixes This — Virtual DOM

**What:**

React uses a **Virtual DOM** — a lightweight JavaScript copy of the Real DOM, kept in memory.

It is not the actual browser DOM. It's just a plain JS object that *looks like* the DOM tree.

**Why:**

Updating a plain JS object is much faster than updating the Real DOM directly.

React uses the Virtual DOM as a middle layer — do the comparison cheaply in memory, then apply only the minimum required changes to the Real DOM.

**How — The 3-Step Process:**

```
Step 1: React keeps a Virtual DOM (copy of current UI)

Step 2: When state changes (e.g. button click),
        React creates a NEW Virtual DOM with the change applied

Step 3: React compares old Virtual DOM vs new Virtual DOM
        → This comparison is called DIFFING
        → It finds exactly what changed (only the h1 text, in our example)
        → It updates ONLY that part in the Real DOM
        → Everything else stays untouched
```

This process of finding the difference and updating only what changed is called **Reconciliation**.

**The h1 Example — Solved:**

```
User clicks button
  → React updates Virtual DOM (only h1 node changes)
    → React diffs old vs new Virtual DOM
      → Finds: only h1 text changed
        → Updates ONLY the h1 in the Real DOM
          → Rest of the page stays as is ✅
```

No full page re-render. No unnecessary repaints. Fast and efficient.

---

## 6. Real DOM vs Virtual DOM — Quick Comparison

| | Real DOM | Virtual DOM |
|---|---|---|
| **What it is** | Actual browser DOM | JS object (copy of DOM) |
| **Update speed** | Slow | Fast |
| **Re-renders** | Can re-render large sections | Only updates what changed |
| **Who uses it** | Plain HTML + JS | React |
| **Memory** | Heavy | Lightweight |

---

## Summary

- HTML, CSS, JS can build websites — but managing large UIs becomes slow and messy.

- The browser represents your HTML as a **DOM Tree** — a tree of nodes JS can interact with.

- The **Real DOM** is slow — updating it carelessly causes large, unnecessary re-renders.

- **React** was created by Facebook to solve this — it introduces the **Virtual DOM**.

- React compares old and new Virtual DOM (**diffing**), finds only what changed, and updates only that part in the Real DOM (**reconciliation**).

- Result: faster apps, smoother UIs, and a much better developer experience.

---

# What is React JS?

---

## 1. What is React JS?

**What:**

React JS is an **open-source JavaScript library** used for building **user interfaces (UIs)**.

It is not a full framework — it only handles the **View layer** of your application.

That means React is only responsible for *what the user sees and interacts with on the screen*.

**Simple way to think about it:**

React lets you break your entire UI into small, reusable pieces called **Components**.

Each component manages its own look and behavior.

You build big pages by combining these small components together — like assembling LEGO blocks.

---

## 2. Who Developed React JS?

**What:**

React was developed by **Jordan Walke**, a software engineer at **Facebook (now Meta)**.

It was first used internally in Facebook's News Feed in **2011**.

It was then used in **Instagram** in **2012**.

Facebook made it **open-source in 2013** — meaning anyone in the world can use it for free.

Today it is maintained by **Meta + a large open-source community** on GitHub.

---

## 3. What Does React Actually Do?

**What:**

React builds **dynamic, interactive UIs** efficiently.

Instead of manually finding and updating DOM elements like plain JS does, React lets you describe *what the UI should look like* — and React handles *how to update it*.

**Plain JS way — you manage everything manually:**

```js
// You find the element, then update it yourself
const heading = document.getElementById("title");
heading.innerText = "New Title";
```

**React way — you just describe the UI, React handles the update:**

```jsx
function Heading() {
  return <h1>New Title</h1>;
}
```

React takes care of when and how to update the DOM.

You focus on *what* to show — React figures out *how* to show it.

---

## 4. Why Do We Use React?

**Why:**

**Because building UIs with plain JS gets complicated fast.**

As your app grows, you end up with hundreds of `getElementById`, event listeners, and manual DOM updates scattered everywhere — hard to read, hard to debug, hard to maintain.

React gives you a structured, organized way to build UIs — with components, reusability, and automatic DOM updates.

**Specific reasons developers prefer React:**

- **Components are reusable** — write once, use anywhere in your app

- **Automatic UI updates** — when your data changes, React re-renders only what's needed (Virtual DOM)

- **Declarative style** — you describe *what* the UI should look like, not *how* to manipulate the DOM step by step

- **Huge ecosystem** — libraries, tools, community support — everything is available

- **Same skills, multiple platforms** — with React Native, you can build mobile apps using the same React knowledge

---

## 5. Real World Use Cases

These are real, large-scale products built with React:

| Product | How React is Used |
|---|---|
| **Facebook** | News Feed, notifications, comments |
| **Instagram** | Entire web app frontend |
| **WhatsApp Web** | Chat interface |
| **Netflix** | Homepage UI, search, content browsing |
| **Airbnb** | Listing pages, search filters |
| **Notion** | Document editor interface |
| **Discord** | Chat, server sidebar, settings |
| **Dropbox** | File management UI |

These are not small projects.

React is trusted at **massive scale** — millions of users, real-time updates, complex UIs.

---

## 6. Advantages of React JS

These are real advantages — no exaggeration:

### Component-Based Architecture

You break your UI into small, independent, reusable components.

A `Button` component written once can be used 50 times across your app without rewriting it.

### Fast UI Updates with Virtual DO

React doesn't re-render the whole page on every change.

It updates only the exact part that changed — making the UI feel fast and smooth.

### Declarative Code — Easier to Read

You describe *what* the UI should look like, not write step-by-step DOM manipulation code.

This makes your code cleaner, easier to read, and easier to debug.

### One-Way Data Flow

Data in React flows in one direction — from parent component to child component.

This makes it predictable — you always know where the data is coming from, which makes debugging easier.

### React Native — Mobile Apps Too

Once you learn React, you can use **React Native** to build Android and iOS apps.

Same concepts, same component thinking — just a different output.

### Large Community and Ecosystem

React has been around since 2013.

There are thousands of libraries built for React, tons of tutorials, and a huge developer community.

If you're stuck, someone has already solved that problem.

---

## Summary

- React is a **JavaScript library** for building UIs — only handles the View layer.

- Made by **Facebook (Meta)**, open-sourced in **2013**.

- It lets you build UIs using small, reusable pieces called **Components**.

- React handles DOM updates automatically using the **Virtual DOM** — you just describe what the UI should look like.

- Used by **Facebook, Instagram, Netflix, Airbnb, Discord, Notion** and many more.

- Key advantages: reusable components, fast updates, clean declarative code, one-way data flow, and a massive ecosystem.

---

# React DOM and CDN Links

> With React JS we will use an another liabrary which is React Dom.  
> React js which is very powerful, which does the job of UI making. and the job of connecting the UI and your browser is done by React Dom.

---

## 1. What is React DOM?

**What:**

`react-dom` is a **separate library** that works alongside React JS.

React JS alone knows how to build and manage components and the Virtual DOM — but it does **not** know anything about the actual browser or the real DOM.

That's where React DOM comes in.

**React DOM's only job is to take your React UI and render it into the actual browser DOM.**

> React JS does the job of building the UI.
> React DOM does the job of connecting that UI to your browser.

Think of it like this:

```
React JS      →   Builds the UI (components, Virtual DOM)
React DOM     →   Puts that UI into the actual browser window
```

**Why:**

React was designed to work in different environments — not just browsers.

For example:
- **React DOM** → for web browsers
- **React Native** → for mobile apps (Android/iOS)
- **React Three Fiber** → for 3D rendering

Because of this separation, the core React library stays clean and environment-agnostic.

React DOM is specifically the **bridge between React and the web browser**.

**How:**

React DOM has a method called `createRoot()` which targets a real HTML element in your page (usually a `div` with `id="root"`), and renders your entire React app inside it.

```html
<!-- Your HTML has this one div -->
<div id="root"></div>
```

```js
// React DOM takes over that div and renders your React app into it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

Everything React builds gets injected into that single `div` by React DOM.

---

## 2. Using React JS and React DOM via CDN

**What:**

A **CDN (Content Delivery Network)** is a way to load a library directly in your HTML file using a `<script>` tag — without installing anything.

You don't need Node.js, npm, or any setup.

Just add the script tags and React is ready to use in your HTML file.

**Why:**

CDN links are used when you want to:

- **Quickly try React** without setting up a full project

- **Learn and experiment** without any build tools

- **Add React to an existing HTML page** without changing your whole project structure

For real projects, you'll use `npm install react react-dom` instead — but for learning and understanding, CDN is the easiest starting point.

**How — The Two CDN Links:**

```html
<!-- 1. React JS — the core library (components, Virtual DOM) -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>

<!-- 2. React DOM — connects React to the browser -->
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

Both scripts must be added — React JS first, React DOM second.

Order matters because React DOM depends on React JS.

**What `crossorigin` means:**

`crossorigin` is an HTML attribute that tells the browser this script is being loaded from a different origin (a CDN server, not your own server).

It helps the browser handle errors from that external script properly.

---

## 3. Development CDN vs Production CDN

React provides **two versions** of its CDN links — one for while you're building, one for when your app goes live.

**Development CDN:**

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

**Production CDN:**

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

**The Difference:**

| | Development | Production |
|---|---|---|
| **File size** | Large | Much smaller (minified) |
| **Error messages** | Detailed and helpful | Removed completely |
| **Warnings** | Full warnings shown in console | No warnings |
| **Speed** | Slower (extra checks running) | Faster (no extra checks) |
| **Use when** | Building and learning | Deploying live to users |

**Why the difference matters:**

During development, React runs extra checks internally to catch your mistakes and show you helpful error messages in the browser console.

These checks take up space and slow things down slightly — which is fine when you're coding.

But when real users are using your app, you don't need those checks running.

The production version strips all of that out — resulting in a **smaller, faster file** that loads quicker for users.

**Simple rule:**

```
Learning / Building  →  use .development.js
Going live for users →  use .production.min.js
```

We will use the **development CDN links** for now — so we can see proper error messages and learn better.

---

## Summary

- **React DOM** is a separate library that acts as the bridge between React JS and the actual browser.

- React JS builds the UI — React DOM puts it into the real browser DOM using `createRoot()`.

- React was designed separately from React DOM so the same React core can work on web, mobile, and more.

- **CDN links** let you use React directly in an HTML file — no installation needed. Great for learning.

- Always add **React JS first**, then **React DOM** — order matters.

- **Development CDN** → detailed errors, bigger file, for learning and building.

- **Production CDN** → no errors, minified, smaller and faster, for live apps.

- We use **development CDN** while learning so we can see helpful error messages.

---

# Creating Elements — DOM Way vs React Way

---

## 1. Creating an Element the Old Way (Plain JS)

**What:**

In plain JavaScript, you create an HTML element using `document.createElement()`.

```js
var h1 = document.createElement("h1");
h1.innerText = "Hello from JS";
document.body.appendChild(h1);
```

You create the element, set its content manually, then manually append it to the page.

You are directly working with the **Real DOM** here — step by step, by hand.

---

## 2. Creating an Element the React Way

**What:**

In React, you create elements using `React.createElement()`.

```js
var h1 = React.createElement('h1', null, "Hello From React");
```

This does the same job — creates an `h1` element — but in React's way.

**The 3 Arguments:**

```js
React.createElement(type, props, children)
```

| Argument | What it means | In our example |
|---|---|---|
| `type` | Which HTML tag to create | `'h1'` |
| `props` | Attributes like class, id, style | `null` (no attributes) |
| `children` | Content inside the element | `"Hello From React"` |

**What is `null` here?**

`null` is passed as the second argument when you don't want to add any attributes to the element.

No `id`, no `className`, no `style` — so we pass `null` meaning "nothing here".

If you wanted to add attributes, it would look like this:

```js
var h1 = React.createElement('h1', { id: "title", className: "heading" }, "Hello From React");
```

---

## 3. What Does React.createElement Actually Return?

`React.createElement()` does **not** directly create a real DOM element.

It returns a **plain JavaScript object** — a Virtual DOM node — that describes what the element should look like.

```js
// What React.createElement('h1', null, "Hello From React") returns:
{
  type: 'h1',
  props: {
    children: "Hello From React"
  }
}
```

React holds this object in memory.

React DOM then takes this object and creates the actual real DOM element in the browser.

**So the full flow is:**

```
React.createElement()
  → creates a Virtual DOM object
    → React DOM reads it
      → creates the real <h1> in the browser
```

---

## 4. Side by Side Comparison

```js
// Plain JS — working directly with Real DOM
var h1 = document.createElement("h1");
h1.innerText = "Hello from JS";
document.body.appendChild(h1);

// React — working with Virtual DOM
var h1 = React.createElement('h1', null, "Hello From React");
```

The plain JS way — you manage every step yourself.

The React way — you just describe what you want, React and React DOM handle the rest.

---

## Summary

- `document.createElement()` creates a real DOM element directly — you manage everything manually.

- `React.createElement(type, props, children)` creates a **Virtual DOM object** — a plain JS description of the element.

- The **3 arguments** are: tag name, attributes (or `null` if none), and the content inside.

- `null` as the second argument simply means — no attributes for this element.

- React DOM takes this Virtual DOM object and renders the actual element in the browser.

---