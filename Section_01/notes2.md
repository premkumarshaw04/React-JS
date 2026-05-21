# Setting Up React — Vite

---

## 1. The Old Way — Create React App

**What:**

Previously, the standard command to set up a new React project was:

```bash
npm create-react-app my-app
```

This would generate a complete React project folder with all the necessary files and dependencies.

**Why we moved away from it:**

It is **slow** — both to set up and during development.

Every time you save a file, it takes noticeable time to reflect the change in the browser.

For large projects this becomes frustrating very quickly.

---

## 2. The New Way — Vite

**What:**

Now we use **Vite** to set up React projects.

```bash
npm create vite
```

This command sets up a complete, ready-to-use React project folder — faster and cleaner than the old way.

**Why:**

Vite is significantly faster than Create React App — both during setup and while you're actively coding.

When you save a file, the change reflects in the browser almost **instantly**.

This speed difference is very noticeable, especially as your project grows.

---

## 3. What is Vite?

**What:**

Vite is a **bundler** — a tool that helps you set up and run your React project efficiently.

> Think of it like this — Vite is a tool that creates the complete React folder structure for you, and also keeps your project running fast while you build it.

Just this much is enough to understand for now.

**What is a Bundler?**

When you build a React app, you write code across many files — components, styles, utilities, etc.

A browser cannot directly understand all of this scattered code.

A **bundler** takes all your files, connects them together, and converts them into something the browser can actually understand and run.

```
Your many files                     Browser-ready output
─────────────────                   ────────────────────
App.jsx          ──┐
Header.jsx       ──┤
styles.css       ──┤  →  Vite  →   One clean, optimized bundle
utils.js         ──┤
index.html       ──┘
```

Vite does this job — and it does it very fast.

---

## Summary

- **Create React App** was the old way to set up React — it works but is slow.

- **Vite** is the modern, faster alternative — used with `npm create vite`.

- Vite is a **bundler** — it takes all your scattered files and converts them into something the browser can run.

- Your React code lives inside the **`src/`** folder — that's where you'll build everything.

---

# Setting Up the React Project — Step by Step (Real Terminal Walkthrough)

---

## 1. Check Node Version First

Before creating any React project, make sure Node.js is installed.

```bash
node -v
```

**Output:**
```
v22.19.0
```

Node is installed and the version is fine. React and Vite work well with Node v18 and above.

---

## 2. Navigate to Desktop

```bash
cd Desktop
```

**Output:**
```
The system cannot find the path specified.
```

**Why this error happened:**

On many Windows systems, especially when **OneDrive** is enabled, the Desktop folder is not directly at `C:\Users\username\Desktop`.

It gets moved inside the OneDrive folder.

So the correct path becomes:

```bash
cd OneDrive\Desktop
```

**Lesson:** If `cd Desktop` doesn't work on Windows, try `cd OneDrive\Desktop`.

---

## 3. Run the Vite Setup Command

```bash
npm create vite
```

The first time you run this, npm asks permission to install the `create-vite` package:

```
Need to install the following packages:
create-vite@9.0.7
Ok to proceed? (y)
```

Type `y` and press Enter — this is just npm downloading the Vite setup tool.

---

## 4. Answer the Setup Prompts

Vite walks you through a few questions:

```
Project name:     reactLearning
Package name:     reactlearning        ← auto-suggested (lowercase, no spaces)
Framework:        React
Variant:          JavaScript
Install with npm and start now?  Yes
```

**What these mean:**

| Prompt | What it does |
|---|---|
| **Project name** | Name of your folder on disk |
| **Package name** | Internal name in `package.json` (must be lowercase) |
| **Framework** | We choose React |
| **Variant** | JavaScript (not TypeScript — we keep it simple for now) |
| **Install and start now** | Runs `npm install` + `npm run dev` automatically |

---

## 5. What Happened After You Hit Yes

```
Scaffolding project in C:\Users\ps690\OneDrive\Desktop\reactLearning...
Installing dependencies with npm...

added 135 packages, and audited 136 packages in 33s
found 0 vulnerabilities
```

**Scaffolding** means Vite created the complete folder structure for your React project.

**135 packages installed** — these are all the small libraries React and Vite need internally to work. You don't touch these manually — they go into `node_modules/`.

**0 vulnerabilities** — means no known security issues in the installed packages. Good to see.

---

## 6. Dev Server Started

```
VITE v8.0.13  ready in 975 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Your React app is now **live and running** on your machine.

Open `http://localhost:5173/` in your browser — you'll see the default Vite + React welcome page.

**What is localhost?**

`localhost` means your own computer.

`5173` is the port number — the specific "door" on your computer where Vite is serving your app.

This is only visible to you on your machine — not on the internet.

---

## Full Command Summary

```bash
node -v                    # check Node is installed
cd OneDrive\Desktop        # navigate to Desktop (OneDrive path on Windows)
npm create vite            # start Vite setup
# → follow prompts: name, React, JavaScript, Yes to install
# Vite sets up folder, installs packages, and starts dev server automatically
# Open http://localhost:5173/ in browser
```

---

## Summary

- Always check `node -v` before starting — need Node v18 or above.

- On Windows with OneDrive, Desktop is at `OneDrive\Desktop`, not directly `Desktop`.

- `npm create vite` sets up the entire React project interactively.

- Vite installs all required packages into `node_modules/` automatically.

- After setup, your app runs at `http://localhost:5173/` — open it in the browser.

---

# Installing npm Packages — `npm i`

---

## What is `npm i`?

**What:**

`npm i` is short for `npm install`.

When you open your React project folder in VS Code and run this command in the terminal, it reads the `package.json` file and installs all the packages (dependencies) your project needs.

```bash
npm i
```

**Why:**

Every React project has a `package.json` file that lists all the libraries the project depends on.

When you share a project, clone it from GitHub, or open it on a new machine — the `node_modules/` folder is never included (it's too large).

Running `npm i` recreates that `node_modules/` folder by downloading all the required packages fresh.

**How — Open terminal in VS Code and run:**

```bash
PS C:\Users\ps690\OneDrive\Desktop\reactLearning> npm i
```

---

## Reading the Output

```
up to date, audited 136 packages in 4s

31 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

**`up to date`** — Since Vite already installed everything during setup, running `npm i` again just confirms all packages are already present. Nothing new to install.

**`audited 136 packages`** — npm checked all 136 installed packages for known security issues.

**`found 0 vulnerabilities`** — No security issues found. All good.

---

## Important Rule

Always make sure you are **inside your project folder** before running `npm i`.

```bash
# Wrong — you're not inside the project
PS C:\Users\ps690\OneDrive\Desktop> npm i

# Correct — you're inside reactLearning
PS C:\Users\ps690\OneDrive\Desktop\reactLearning> npm i
```

If you run it from the wrong folder, it won't find your `package.json` and won't install the right packages.

---

## Summary

- `npm i` = `npm install` — installs all packages listed in `package.json`.

- Always run it from **inside your project folder** in the VS Code terminal.

- If packages are already installed, it simply says `up to date` — that's fine.

- You'll need to run `npm i` every time you open a cloned or shared React project for the first time.

---

# React Folder Structure — What Everything Does

---

When you create a React project with Vite, this is the folder structure you get:

```
reactLearning/
│
├── node_modules/
├── public/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## 1. `node_modules/`

**What:**

This folder contains all the packages and libraries that your project depends on.

When you run `npm i`, everything gets downloaded and stored here.

**Important:**

You never touch this folder manually.

You never send this folder to anyone or push it to GitHub — it is too large (can be 100MB+).

That is exactly why `.gitignore` exists (explained below).

---

## 2. `public/`

**What:**

This folder holds **static assets** — files that don't go through any processing by Vite.

Things like a favicon, static images, or any file you want to serve directly as-is.

Files in `public/` are accessible directly via URL — for example, a file `public/logo.png` can be accessed at `http://localhost:5173/logo.png`.

---

## 3. `src/` — The Most Important Folder

**What:**

This is where **your actual React code lives**.

You will spend almost all your time inside this folder.

Every component, every style, every logic you write — goes here.

### `main.jsx`

This is the **entry point** of your React app.

This is where React DOM takes over and mounts your entire app into the `index.html`.

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

It finds the `<div id="root">` in `index.html` and renders the `App` component inside it.

Think of `main.jsx` as the **starting engine** of your app.

### `App.jsx`

This is the **root component** of your app.

Every other component you build will eventually connect to `App.jsx`.

It is the top of the component tree.

### `App.css`

Styles specifically for the `App` component.

### `index.css`

Global styles — these apply to the entire app, not just one component.

---

## 4. `index.html`

**What:**

This is the **single HTML file** of your entire React app.

React apps are called **Single Page Applications (SPA)** — meaning there is only one HTML file.

Inside it, there is one important line:

```html
<div id="root"></div>
```

This is the **only div** React needs.

React DOM injects your entire app inside this `div` — every page, every component, everything.

You rarely need to edit this file.

---

## 5. `package.json`

**What:**

This is the **identity card** of your project.

It contains:

- Project name and version
- List of all dependencies (libraries your project needs)
- Scripts like `npm run dev`, `npm run build`

```json
{
  "name": "reactlearning",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

When someone gets your project and runs `npm i`, npm reads this file to know what to install.

---

## 6. `package-lock.json`

**What:**

This file is **automatically generated** by npm — you never edit it manually.

It records the **exact version** of every package installed, including the packages that your packages depend on.

`package.json` says "I need React 18 or above."

`package-lock.json` says "I installed React 18.3.1 specifically."

This ensures that everyone working on the same project gets the exact same versions installed.

---

## 7. `.gitignore`

**What:**

This file tells **Git** which files and folders to ignore — meaning they won't be tracked or pushed to GitHub.

The most important entry in it is:

```
node_modules
```

Because `node_modules/` is massive and can always be recreated with `npm i`, there is no need to push it to GitHub.

---

## 8. `eslint.config.js`

**What:**

ESLint is a **code quality tool** that checks your code for errors, bad practices, and style issues while you write.

This file is its configuration — it defines the rules ESLint follows for your project.

For example, it can warn you if you declared a variable and never used it.

You don't need to touch this file for now — it works in the background automatically.

---

## 9. `vite.config.js`

**What:**

This is the **configuration file for Vite**.

It tells Vite how to handle your project — which plugins to use, what port to run on, etc.

By default it already has the React plugin configured:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

You rarely need to change this in the beginning.

---

## 10. `README.md`

**What:**

A markdown file that describes your project.

When you push your project to GitHub, this file is displayed on the repository's homepage.

It usually contains what the project does, how to set it up, and how to run it.

---

## Quick Reference — All Files at a Glance

| File / Folder | What it does |
|---|---|
| `node_modules/` | All installed packages — never touch or push to GitHub |
| `public/` | Static files served directly (images, favicon, etc.) |
| `src/` | Your actual React code lives here |
| `src/main.jsx` | Entry point — mounts the app into `index.html` |
| `src/App.jsx` | Root component — top of the component tree |
| `src/App.css` | Styles for the App component |
| `src/index.css` | Global styles for the entire app |
| `index.html` | The one and only HTML file — has `<div id="root">` |
| `package.json` | Project identity card — lists dependencies and scripts |
| `package-lock.json` | Locks exact versions of all installed packages |
| `.gitignore` | Tells Git what NOT to push (mainly `node_modules`) |
| `eslint.config.js` | Code quality checker configuration |
| `vite.config.js` | Vite configuration — has React plugin set up |
| `README.md` | Project description — shown on GitHub |

---

## Summary

- `src/` is where you work — everything else is mostly configuration.

- `main.jsx` starts the app, `App.jsx` is the root component — these two are the most important files.

- `index.html` has only one `<div id="root">` — React fills the entire app inside it.

- `package.json` lists your dependencies — `package-lock.json` locks their exact versions.

- `node_modules/` is never pushed to GitHub — `.gitignore` takes care of that.

- `vite.config.js` and `eslint.config.js` work in the background — you don't touch them for now.

---

# index.html Body + How React Renders to the Browser

---

## The index.html Body

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

The entire body of a React app has just **two lines**.

No other HTML. No other content.

Everything you see in a React app — every page, every button, every component — gets injected here at runtime.

---

### `<div id="root"></div>`

**What:**

This is a plain empty `div` with the id `"root"`.

When the browser first loads the page, this div has **nothing inside it** — completely empty.

**Why:**

React needs one real HTML element to grab onto and inject your entire app into.

This `div` is that element — it is the **only container** React needs in your HTML.

**How:**

In `main.jsx`, React DOM finds this div by its id and mounts the entire app inside it:

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

`document.getElementById('root')` finds this exact div.

React fills it with your entire app — every component, every page, everything.

---

### `<script type="module" src="/src/main.jsx"></script>`

**What:**

This script tag loads `main.jsx` — the **entry point** of your React app.

**`src="/src/main.jsx"`:**

Points the browser to your React app's starting file.

Vite picks this up, processes `main.jsx` and everything it imports, and serves it to the browser.

**`type="module"`:**

This tells the browser — treat this script as a **JavaScript module**.

Without this attribute, the browser won't understand `import` and `export` statements.

```jsx
// This works only because type="module" is set
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
```

With `type="module"`, modern JS module syntax works correctly in the browser.

---

## The Three Files and How They Connect

Now let's look at the actual code across all three files and understand the full flow.

---

### `App.jsx`

```jsx
function App() {
  return "Hello"
}

export default App
```

`App` is a plain JavaScript function that returns `"Hello"`.

In React, any function that returns UI is called a **Component**.

This is the simplest possible component — returns a plain string.

**`export default App`:**

This makes the `App` function available to other files.

Without this line, no other file can import and use `App`.

`export default` means — *"this is the main thing this file is exporting."*

---

### `main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
```

This is the **entry point** — the file that starts everything.

Line by line:

**`import React from 'react'`**

Brings in the core React library.

Needed in the background to handle components and JSX.

**`import ReactDOM from 'react-dom/client'`**

Brings in React DOM — the bridge between React and the real browser.

`react-dom/client` is the React 18+ version that gives us `createRoot`.

**`import App from './App.jsx'`**

Imports the `App` function from `App.jsx`.

This works because `App.jsx` used `export default App`.

**`document.getElementById('root')`**

Plain JavaScript — finds the `<div id="root">` in `index.html`.

**`ReactDOM.createRoot(...)`**

Tells React DOM — *"take this real DOM element and make it the root of the React app."*

React will now manage everything inside this div.

**`.render(<App />)`**

This is where React puts your component on screen.

`<App />` is JSX syntax — React's way of calling your `App` function as a component.

React calls `App()`, gets `"Hello"` back, and renders it inside the root div.

---

## The Complete Flow — How "Hello" Reaches the Screen

```
1. Browser loads index.html
        ↓
2. Sees <div id="root"></div>
   → Empty div, nothing visible yet
        ↓
3. Sees <script type="module" src="/src/main.jsx">
   → Loads and runs main.jsx
        ↓
4. main.jsx imports App from App.jsx
        ↓
5. App.jsx exports App function
   → App() returns "Hello"
        ↓
6. ReactDOM.createRoot() grabs <div id="root">
        ↓
7. .render(<App />) calls App, gets "Hello"
        ↓
8. React DOM injects "Hello" into the root div
        ↓
9. Browser displays: Hello ✅
```

---

## What the Root Div Looks Like — Before and After

**Before React runs:**

```html
<div id="root"></div>
```

**After React runs:**

```html
<div id="root">Hello</div>
```

React filled the empty div with whatever `App` returned.

---

## Summary

- `index.html` body has only two lines — a `div#root` container and a script tag loading `main.jsx`.

- `<div id="root">` is empty at first — React fills it completely at runtime.

- `type="module"` on the script tag enables modern `import/export` syntax in the browser.

- `App.jsx` is a component — a function that returns UI and exports itself.

- `main.jsx` is the entry point — it imports `App`, finds the root div, and renders the app into it.

- The flow is always: `App.jsx → main.jsx → index.html → Browser`.

---

This below topics needs to be explained

What is JSX, why and for which task we use it. = This is basically the combination of JavaScript and HTML.

Why we JSX instead Of normal JavaScript [give the reason]

---

npm run dev [explain wehat this command does]

what is import and export keyword

---