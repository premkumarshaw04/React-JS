# Section 5 — API Calling with Axios and useEffect

---

## 1. What is an API?

**What:**

API stands for **Application Programming Interface**.

In simple terms — an API is a way for two different applications to talk to each other.

Think of it like a waiter in a restaurant:

```
You (your app)  →  gives order to waiter (API)  →  Kitchen (server/database)
Kitchen         →  gives food to waiter (API)   →  You get the data
```

You don't go into the kitchen yourself — you just ask the waiter (API), and it brings you what you need.

**Basic Idea:**

A server has data — user information, products, weather, news, etc.

Your React app needs that data.

An API is the **bridge** — a set of URLs (called endpoints) that your app can request data from.

**Why we use APIs:**

- Data lives on a server — not in your frontend code

- APIs let you fetch live, real-time data — weather, stock prices, social feeds

- You can use other companies' data — Google Maps, payment gateways, news feeds

- Separates your frontend (React) from your backend (server) cleanly

**What is API Calling:**

API calling means — **sending a request to an API endpoint and receiving data back.**

```
Your React app  →  sends request to  →  https://api.example.com/users
Server          →  sends back        →  JSON data of users
React           →  displays that data on screen
```

**Use Cases:**

| Use Case | API Used For |
|---|---|
| Weather app | Fetching live temperature, forecast |
| E-commerce | Fetching products, prices, inventory |
| Social media | Fetching posts, users, comments |
| Maps | Fetching location, directions |
| News app | Fetching latest articles |
| Authentication | Login, signup via Google/GitHub |

**Advantages:**

- No need to store data in your frontend — fetch it live when needed

- Reuse same API across web, mobile, desktop apps

- Real-time data — always up to date

- Use third-party services without building them yourself

---

## 2. What is Axios?

**What:**

Axios is a **JavaScript library that makes API calling easy.**

> Axios is basically a tool which helps us to call an API.

The browser has a built-in way to call APIs called `fetch()` — but Axios is cleaner, simpler, and has more features.

**Why Axios over fetch:**

| | `fetch()` | Axios |
|---|---|---|
| **Response parsing** | You manually call `.json()` | Automatically parses JSON |
| **Error handling** | Doesn't throw error on 404/500 | Throws error on bad responses |
| **Code length** | More lines | Cleaner and shorter |
| **Request cancellation** | Complex | Built-in support |
| **Default headers** | Set manually | Easy to set globally |

**Real World Use Cases:**

- Fetching a list of products from a backend

- Sending form data (login, signup) to a server

- Loading user profile data after login

- Any situation where your React app needs data from a server

---

## 3. Installing and Setting Up Axios

```bash
# Step 1 — Install Axios
npm i axios

# Step 2 — Start the dev server
npm run dev
```

Once installed, import it in any component where you need it:

```jsx
import axios from 'axios'
```

---

## 4. What is `useEffect`?

Before learning `axios.get()`, you need to understand `useEffect` — because API calls are always made inside it.

**What:**

`useEffect` is a React hook that lets you **run code after the component renders.**

It is used for anything that happens *outside* of rendering — like fetching data, setting up timers, or updating the document title.

**Why:**

In React, you cannot make an API call directly inside the component body — because the component body runs on every render, and you don't want to call an API infinitely.

`useEffect` gives you control over **when** a piece of code runs.

**Syntax:**

```jsx
useEffect(() => {
  // code to run
}, [dependency array])
```

The **dependency array** controls when `useEffect` runs:

| Dependency Array | When it runs |
|---|---|
| No array | Runs after every render |
| `[]` empty array | Runs **only once** — when component first loads |
| `[value]` with a value | Runs when that value changes |

**For API calls — always use `[]` empty array:**

```jsx
useEffect(() => {
  // fetch data here
}, [])  // runs once when component mounts
```

This means — fetch the data once when the page loads. Don't keep calling the API on every re-render.

**Importing useEffect:**

```jsx
import React, { useState, useEffect } from 'react'
```

---

## 5. `axios.get()` — Fetching Data from an API

**What:**

`axios.get(url)` sends a **GET request** to the given API URL and returns the response data.

GET request means — *"give me the data at this URL"* — you are only reading data, not sending any.

**Syntax:**

```jsx
axios.get('https://api-url.com/endpoint')
  .then(function(response) {
    console.log(response.data)  // the actual data is in response.data
  })
  .catch(function(error) {
    console.log(error)
  })
```

`.then()` — runs when the request is successful. `response.data` contains the actual data.

`.catch()` — runs if something goes wrong (no internet, server error, etc.).

---

## 6. Full Working Example — Fetching Users from an API

We will use `https://jsonplaceholder.typicode.com/users` — a free fake API that returns user data.

**App.jsx:**

```jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])  // empty array initially

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(function(response) {
        setUsers(response.data)  // store fetched data in state
      })
      .catch(function(error) {
        console.log("Error fetching data:", error)
      })
  }, [])  // empty array = run only once on page load

  return (
    <div>
      {users.map((elem, idx) => (
        <div key={idx}>
          <h2>{elem.name}</h2>
          <p>{elem.email}</p>
          <p>{elem.address.city}</p>
        </div>
      ))}
    </div>
  )
}

export default App
```

**Line by line — what is happening:**

`const [users, setUsers] = useState([])` — `users` starts as an empty array. Once data is fetched, it will hold the array of user objects.

`useEffect(() => { ... }, [])` — runs once when the component first loads. This is where the API call lives.

`axios.get(url)` — sends a GET request to the fake API.

`response.data` — Axios automatically parses the JSON response. The actual array of users is in `response.data`.

`setUsers(response.data)` — stores the fetched users in state. React re-renders the component with the new data.

`.map()` — loops over the `users` array and renders one `div` per user.

---

## 7. The Full Flow — How API Calling Works in React

```
Component loads
  ↓
useState sets users = [] (empty)
  ↓
Component renders — nothing shown yet (empty array)
  ↓
useEffect runs (because [] dependency)
  ↓
axios.get() sends request to API
  ↓
API sends back JSON data
  ↓
.then() receives response
  ↓
setUsers(response.data) updates state
  ↓
React re-renders component with new users data
  ↓
.map() loops over users — cards appear on screen ✅
```

---

## 8. Axios Methods — Quick Overview

Axios has different methods for different types of requests:

| Method | What it does | When used |
|---|---|---|
| `axios.get(url)` | Fetch data from server | Loading users, products, posts |
| `axios.post(url, data)` | Send data to server | Form submission, creating new item |
| `axios.put(url, data)` | Update existing data | Editing a profile, updating a post |
| `axios.delete(url)` | Delete data | Removing an item |

For now, `axios.get()` is what you'll use most — it covers all data-fetching needs.

---

## Summary

- **API** — a bridge between your React app and a server. Your app sends a request, the server sends data back as JSON.

- **API Calling** — requesting data from an API endpoint and using it in your app.

- **Axios** — a library that makes API calling simple. Auto-parses JSON, better error handling than `fetch()`.

- Install with `npm i axios`, import with `import axios from 'axios'`.

- **`useEffect`** — a hook that runs code after the component renders. Used for API calls so they don't run infinitely.

- `useEffect(() => { ... }, [])` with empty array — runs **only once** when the component first loads. Always use this for API calls.

- **`axios.get(url)`** — fetches data from an API. Data is in `response.data`.

- Standard pattern: `useState([])` to store data → `useEffect` to fetch it → `axios.get()` to call the API → `setUsers()` to update state → `.map()` to render it.

---