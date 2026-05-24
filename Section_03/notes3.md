# Section 3 [Part 1] — Form Handling in React

---

## 1. What is Form Handling in React?

**What:**

Form handling means — **capturing what the user types or selects in a form, and doing something useful with it** when they submit.

In plain HTML, the browser handles form submission automatically — it reloads the page and sends data to a server.

In React, we take **full control** of the form ourselves — we decide what happens when the user submits, what data is captured, and how it is processed.

**Why:**

React apps are **Single Page Applications (SPA)** — the page never fully reloads.

If you let the browser handle form submission the default way, it reloads the page — and all your React state (data in memory) is wiped out.

That's a problem. So React gives you tools to handle forms entirely in JavaScript, without any page reload.

**Advantages of Form Handling in React:**

- Full control over what happens on submit

- No page reload — state and data stay intact

- Easy validation before submission

- Data can be sent to an API without reloading the page

- Works perfectly with `useState` to track what the user is typing in real time

---

## 2. Basic Form in React — First Step

```jsx
import React, { useState } from 'react'

const App = () => {
  const submitHandler = () => {
    console.log("Hello")
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Enter your name' />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App
```

**What is happening here:**

`onSubmit={submitHandler}` — when the form is submitted (button clicked), React calls `submitHandler`.

`submitHandler` currently just logs `"Hello"` to the console.

**The problem:**

If you run this and click Submit, you'll see `"Hello"` flash in the console for a split second — and then the page reloads.

The page reload happens because of the **default behaviour of HTML forms**.

---

## 3. Default Behaviour of Forms — The Problem

**What:**

Every HTML form has a built-in default behaviour:

> As soon as the form is submitted, the browser **reloads the page**.

In a normal HTML + server setup, this makes sense — the form data goes to the server, the server responds, the page reloads with new content.

**Why this is a problem in React:**

React apps don't work that way.

When the page reloads:

- All your React **state is wiped** — gone

- Any data the user typed is **lost**

- Any API call you were about to make — **never happens**

- The user experience breaks completely

So the first thing you always do in React form handling is — **stop this default behaviour**.

---

## 4. What is `e` — The Event Object

**What:**

When any event happens in the browser (a click, a form submission, a key press), the browser automatically creates an **Event Object** and passes it to your event handler function.

This object contains information about the event that just happened.

By convention, this object is named `e` or `event` — it's just a parameter name, you can call it anything, but `e` is the standard short form.

```jsx
const submitHandler = (e) => {
  console.log(e) // logs the entire event object
}
```

**What does `e` contain:**

```
e.type           → "submit" (what kind of event)
e.target         → the form element that triggered the event
e.preventDefault → a method to stop the default behaviour
e.timeStamp      → when the event happened
// ...and many more properties
```

The most important one for us right now is `e.preventDefault()`.

**Where does `e` come from:**

You don't create it — the **browser creates it automatically** every time an event fires and passes it to your handler.

All you have to do is accept it as a parameter in your function.

---

## 5. `e.preventDefault()` — Stopping the Page Reload

**What:**

`e.preventDefault()` is a method on the Event Object.

Calling it tells the browser:

> "Stop whatever you were going to do by default — I'll handle this myself."

For a form, the default action is page reload.

Calling `e.preventDefault()` stops that reload — the page stays as is, and your JavaScript code runs normally.

```jsx
const submitHandler = (e) => {
  e.preventDefault()  // ← stops the page from reloading
  console.log("Form submitted without reload!")
}
```

---

## 6. Two Ways to Pass the Handler — With `e`

Your code shows both ways clearly. Let's understand the difference.

---

### Way 1 — Pass the function directly to `onSubmit`

```jsx
const submitHandler = (e) => {
  e.preventDefault()
  console.log("Submitted")
}

<form onSubmit={submitHandler}>
```

**What happens:**

When the form is submitted, React calls `submitHandler` and **automatically passes the event object** as the first argument.

`e` receives the event object — `e.preventDefault()` works perfectly.

This is the **cleaner and preferred way** when you don't need to pass any extra arguments.

---

### Way 2 — Wrap in an arrow function inside `onSubmit`

```jsx
const submitHandler = (e) => {
  e.preventDefault()
  console.log("Submitted")
}

<form onSubmit={(e) => {
  submitHandler(e)
}}>
```

**What happens:**

React calls the inline arrow function and passes the event object to `e`.

You then **manually pass `e`** into `submitHandler(e)`.

`submitHandler` receives it as its own `e` — `e.preventDefault()` works.

**Why use this way:**

When you need to pass **extra arguments** to your handler along with the event:

```jsx
<form onSubmit={(e) => {
  submitHandler(e, "extra data", userId)
}}>
```

With direct `onSubmit={submitHandler}`, you can only receive `e`.

With the arrow function wrapper, you can pass anything extra you need.

---

### Side by Side:

```jsx
// Way 1 — Direct (cleaner, preferred for simple cases)
<form onSubmit={submitHandler}>

// Way 2 — Wrapped (use when passing extra arguments)
<form onSubmit={(e) => { submitHandler(e) }}>
```

Both work identically for simple form handling — Way 1 is just shorter.

---

## 7. Full Working Example — Form Without Page Reload

```jsx
import React from 'react'

const App = () => {
  const submitHandler = (e) => {
    e.preventDefault()   // stops page reload
    console.log("Form submitted!")
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Enter your name' />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App
```

**Step by step — what happens when Submit is clicked:**

```
User clicks Submit button
  ↓
Form's onSubmit fires
  ↓
React calls submitHandler and passes Event Object as e
  ↓
e.preventDefault() runs — page reload is cancelled
  ↓
console.log("Form submitted!") runs ✅
  ↓
Page stays as is — no reload, React state safe
```

---

## Summary

- **Form handling in React** means taking full control of form submission — no browser defaults, no page reload.

- **Default form behaviour** — browser reloads the page on submit. In React this is a problem because it wipes all state and breaks the SPA experience.

- **`e` (Event Object)** — automatically created by the browser on every event and passed to your handler. Contains info about the event — type, target, and methods like `preventDefault`.

- **`e.preventDefault()`** — stops the browser's default action. For forms, it stops the page reload.

- **Way 1** — `onSubmit={submitHandler}` — React passes `e` automatically. Clean and preferred for simple cases.

- **Way 2** — `onSubmit={(e) => { submitHandler(e) }}` — you manually pass `e`. Useful when you need to pass extra arguments to the handler.

- Always call `e.preventDefault()` as the **first line** inside your form submit handler in React.

---
    
# Section 3 [Part 2] — Two Way Binding

---

## 1. What is Two Way Binding?

**What:**

Two way binding means — **the input and the state are always in sync with each other.**

- When the user **types** in the input → the state updates

- When the **state updates** → the input reflects that new value

Both directions are connected — that's why it's called **two way** binding.

```
User types      →   state updates   (Input → State)
State updates   →   input reflects  (State → Input)
```

**Why we use it:**

Without two way binding, React doesn't know what the user is typing.

The input just sits there as a plain HTML element — React has no connection to it.

With two way binding, React **owns** the input's value — it knows exactly what's inside it at every keystroke.

This gives you full control to:

- Validate input while typing

- Clear the input programmatically after submit

- Pre-fill the input with existing data

- Sync input value with other parts of the UI

**Advantages:**

- React always knows the current value of the input — no need to manually read the DOM

- Input can be cleared or pre-filled anytime just by updating the state

- Works perfectly with form validation

- Single source of truth — the state holds the value, the input just displays it

**Problems it solves:**

Without two way binding, after submitting a form you can't clear the input from React — because React doesn't own it.

With two way binding, `setUsername('')` clears the input instantly — because React controls what the input shows.

---

## 2. Line by Line Code Explanation

```jsx
import React from 'react'
import { useState } from 'react'

const App = () => {
  const [username, setUsername] = useState('')
```

`useState('')` — creates a state variable `username` with an initial value of empty string `''`.

`setUsername` — the function to update `username`.

The input starts empty because the initial value is `''`.

---

```jsx
  const submitHandler = (e) => {
    e.preventDefault()
```

`e.preventDefault()` — stops the page from reloading when the form is submitted.

---

```jsx
    console.log(username)
```

At the moment of submit, `username` holds whatever the user typed.

This logs that value to the console.

---

```jsx
    setUsername('')
  }
```

After logging, `setUsername('')` sets `username` back to empty string.

Because the input's `value` is connected to `username`, the input field **clears itself** on screen.

This is something you simply cannot do without two way binding.

---

```jsx
  return (
    <div>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
```

`onSubmit` — fires when the form is submitted.

The arrow function receives `e` and passes it to `submitHandler(e)`.

---

```jsx
        <input
          value={username}
```

**This is the key line for two way binding — Direction 2 (State → Input).**

`value={username}` tells React:

> "Whatever is stored in `username` state — show that as the value of this input."

This makes the input a **controlled input** — React controls what it displays.

The input no longer manages its own value. React does.

---

```jsx
          onChange={(e) => {
            setUsername(e.target.value)
          }}
```

**This is the key line for two way binding — Direction 1 (Input → State).**

`onChange` fires **every time the user types a character** in the input.

`e` is the Event Object — created by the browser for every keystroke.

`e.target` — refers to the input element that triggered the event.

`e.target.value` — the **current text inside that input** at the moment of typing.

So `setUsername(e.target.value)` means:

> "Every time the user types, grab the current input value and store it in `username` state."

React then re-renders, sets the input's `value` back to `username` — which now has the new character included.

---

```jsx
          type="text"
          placeholder='Enter your name'
          />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App
```

Standard JSX — nothing new here.

---

## 3. What is `e.target.value` — In Simple Terms

`e` → the Event Object (created by the browser automatically)

`e.target` → the HTML element where the event happened (the input box)

`e.target.value` → the current text inside that input box

```
User types "P"
  → onChange fires
    → e.target is the <input> element
      → e.target.value is "P"
        → setUsername("P") runs
          → username state becomes "P"
            → React re-renders
              → input value shows "P" ✅

User types "r" next
  → e.target.value is "Pr"
    → setUsername("Pr")
      → username becomes "Pr"
        → input shows "Pr" ✅
```

Every single keystroke goes through this cycle — so `username` is always in sync with what's on screen.

---

## 4. The Full Flow of Work

```
Page loads
  → username = '' (empty string)
  → input shows nothing (value={username} = '')
        ↓

User types "Prashant" (letter by letter)
  → onChange fires on every keystroke
  → setUsername(e.target.value) updates username each time
  → username = "P" → "Pr" → "Pra" → ... → "Prashant"
  → input always shows the current username value
        ↓

User clicks Submit
  → onSubmit fires
  → submitHandler(e) is called
  → e.preventDefault() — no page reload
  → console.log(username) → logs "Prashant"
  → setUsername('') — username reset to ''
  → React re-renders — input clears itself ✅
```

---

## 5. Your Understanding — Rewritten Simply

You wrote:

> *"we are writing something and that is set as value and React knows that we are writing something via React, that is why it is called two way binding"*

Here's that same idea written cleanly:

When you type in the input, `onChange` captures what you typed and stores it in `username` state via `setUsername`.

And because the input's `value` is set to `username`, whatever is in the state is immediately shown back in the input.

So two things happen simultaneously — **you update the state by typing, and the state updates what you see in the input.**

React is always aware of what is in the input — because the input's value is not free to be anything — it can only show what React's state tells it to show.

That's two way binding — **the input drives the state, and the state drives the input.**

---

## 6. Controlled vs Uncontrolled Input — Quick Difference

| | Controlled Input | Uncontrolled Input |
|---|---|---|
| **Value managed by** | React state | The DOM itself |
| **How to read value** | From state directly | Using `ref` or `document.getElementById` |
| **Can clear after submit** | Yes — `setState('')` | No — not easily |
| **React aware of value** | Always | Not unless you ask |
| **Used in** | Two way binding | Rarely in React |

In React, **controlled inputs are the standard** — always prefer them.

---

## Summary

- **Two way binding** — input and state stay in sync. Typing updates state, state updates input. Both directions connected.

- `value={username}` — connects state to input (State → Input). Makes it a **controlled input**.

- `onChange={(e) => setUsername(e.target.value)}` — connects input to state (Input → State). Fires on every keystroke.

- `e.target.value` — the current text inside the input at the moment the event fired.

- `setUsername('')` after submit — clears the input instantly because React controls the input's value.

- **The input no longer manages itself** — React's state is the single source of truth.

- Two way binding is the standard way to handle inputs in React — it gives you full control.

---