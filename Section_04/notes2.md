# Rendering JSON Data with .map() and Props

---

## 1. The JSON Data

```jsx
const users = [
  {
    name: "Aarav Sharma",
    city: "Kolkata",
    age: 25,
    profession: "Software Engineer",
    profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Priya Verma",
    city: "Delhi",
    age: 28,
    profession: "Graphic Designer",
    profilePhoto: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    name: "Rahul Das",
    city: "Mumbai",
    age: 30,
    profession: "Data Analyst",
    profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    name: "Sneha Roy",
    city: "Bangalore",
    age: 24,
    profession: "Doctor",
    profilePhoto: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    name: "Karan Mehta",
    city: "Pune",
    age: 27,
    profession: "Photographer",
    profilePhoto: "https://randomuser.me/api/portraits/men/5.jpg"
  }
]
```

This is a plain JavaScript array of objects sitting inside your component.

Each object is one user — with 5 properties: name, city, age, profession, and a photo URL.

In real projects, this kind of data comes from an API — but the way React renders it is the same.

---

## 2. App.jsx — Rendering Cards with `.map()`

```jsx
import React from 'react'
import Card from './components/Card'

const App = () => {

  const users = [ /* ...data here... */ ]

  return (
    <div>
      <div>
        {users.map(function(elem, idx) {
          return (
            <Card
              key={idx}
              username={elem.name}
              city={elem.city}
              age={elem.age}
              profession={elem.profession}
              pic={elem.profilePhoto}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
```

**What is `.map()` doing here:**

`.map()` is a JavaScript array method that loops over every item in the array and returns something for each one.

Here it loops over `users` — 5 users → runs 5 times → returns 5 `<Card />` components.

**`elem`** — the current object in the array on each loop iteration.

On first run → `elem` = Aarav's object.
On second run → `elem` = Priya's object. And so on.

**`idx`** — the index of the current item (0, 1, 2, 3, 4).

**How props are being passed:**

```
elem.name        → username prop  → props.username in Card
elem.city        → city prop      → props.city in Card
elem.age         → age prop       → props.age in Card
elem.profession  → profession prop→ props.profession in Card
elem.profilePhoto→ pic prop       → props.pic in Card
```

Each iteration picks data from `elem` and passes it into `<Card />` as individual props.

---

## 3. What is `key`?

```jsx
<Card key={idx} ... />
```

`key` is a **special prop** that React requires whenever you render a list of elements.

**Why React needs it:**

When a list changes — an item is added, removed, or reordered — React needs to know **which specific item changed** so it can update only that one in the DOM instead of re-rendering the entire list.

`key` gives each item a unique identity so React can track them individually.

**Without `key`** — React shows a warning and may re-render the whole list on every change, which is slow.

**With `key`** — React updates only the item that actually changed.

**Note — `key` is not a regular prop:**

You cannot access it inside the child component as `props.key` — React uses it internally only.

**Using index as key:**

```jsx
key={idx}  // works fine for learning and static lists
```

For real projects where items can be added or deleted, use a unique ID from your data instead:

```jsx
key={elem.id}  // better practice
```

---

## 4. Card.jsx — Receiving and Displaying Props

```jsx
import React from 'react'

const Card = (props) => {
  return (
    <div>
      <img src={props.pic} alt="profile" />
      <h1>{props.username}</h1>
      <h2>{props.city}, {props.age}</h2>
      <h4>{props.profession}</h4>
      <button>Add Friend</button>
    </div>
  )
}

export default Card
```

`props.pic` — the profile photo URL passed from `App`. Used as `src` in the `<img>` tag to display the image.

`props.username` — the user's name.

`props.city` and `props.age` — displayed together.

`props.profession` — the user's job.

**What `props` looks like inside Card on the first render:**

```js
props = {
  username: "Aarav Sharma",
  city: "Kolkata",
  age: 25,
  profession: "Software Engineer",
  pic: "https://randomuser.me/api/portraits/men/1.jpg"
}
```

React calls `Card` 5 times — each time with a different user's data.

---

## 5. The Output

Five cards rendered on screen:

```
[Photo]  Aarav Sharma       Kolkata, 25     Software Engineer   [Add Friend]
[Photo]  Priya Verma        Delhi, 28       Graphic Designer    [Add Friend]
[Photo]  Rahul Das          Mumbai, 30      Data Analyst        [Add Friend]
[Photo]  Sneha Roy          Bangalore, 24   Doctor              [Add Friend]
[Photo]  Karan Mehta        Pune, 27        Photographer        [Add Friend]
```

---

## 6. Data Always Flows Top to Bottom

```
App  →  passes props to  →  Card
```

`App` owns the data — it decides what each `Card` receives.

`Card` can only read what it receives — it cannot send anything back up to `App`.

This is called **one-way data flow** — a core rule in React.

It makes your app predictable — you always know where the data is coming from.

---

## Full Flow — How It All Works Together

```
App renders
  ↓
users.map() runs — loops 5 times
  ↓
Each loop → picks one user's data from elem
  ↓
Creates <Card /> with that user's data as props
  ↓
Card receives props and renders:
  img, name, city, age, profession, button
  ↓
5 Cards appear on screen ✅
```

---

## Summary

- **`.map()`** — loops over the array and returns a component for each item. 5 users → 5 Cards.

- **`elem`** — current object in the loop. **`idx`** — its index.

- Each user's properties are passed as individual props to `<Card />`.

- **`key`** — required by React for lists. Helps React track and update individual items efficiently. Not accessible as `props.key` inside the child.

- **`props.pic`** used as `src` in `<img>` — displays the photo from the URL.

- **Data flows top to bottom** — `App` passes data down to `Card`. Never the other way.

---

# How Props Are Passed to Child Components

---

## The Three Files

```
App.jsx  →  Example.jsx  →  Example2.jsx
```

Data starts in `App` and travels downward through each component.

---

## 1. App.jsx — The Data Owner

```jsx
import React from 'react'
import Example from './components/Example'

const App = () => {
  return (
    <div>
      <Example name="Sarthak" />
    </div>
  )
}

export default App
```

`App` passes `name="Sarthak"` to `Example` as a prop.

`App` owns this data — it decides what `Example` receives.

---

## 2. Example.jsx — Receives and Passes Further

```jsx
import React from 'react'
import Example2 from './components/Example2'

const Example = (props) => {
  return (
    <div>
      <>
        I am Example {props.name}
        <Example2 user={props.name} />
      </>
    </div>
  )
}

export default Example
```

`Example` receives `name` from `App` via `props`.

`props.name` here is `"Sarthak"`.

It uses `props.name` to display its own content — `"I am Example Sarthak"`.

It also **passes that same value further down** to `Example2` — but gives it a new prop name: `user`.

```jsx
<Example2 user={props.name} />
// same as
<Example2 user="Sarthak" />
```

---

## 3. Example2.jsx — The Final Receiver

```jsx
import React from 'react'

const Example2 = (props) => {
  return (
    <div>
      I am Example 2 {props.user}
    </div>
  )
}

export default Example2
```

`Example2` receives `user` from `Example` via `props`.

`props.user` is `"Sarthak"`.

It displays — `"I am Example 2 Sarthak"`.

`Example2` has no idea where this data originally came from — it just uses what it receives.

---

## Output

```
I am Example Sarthak
I am Example 2 Sarthak
```

---

## Full Data Flow

```
App
  → passes name="Sarthak" as prop to Example
        ↓
Example
  → receives props.name = "Sarthak"
  → displays "I am Example Sarthak"
  → passes props.name as user="Sarthak" to Example2
        ↓
Example2
  → receives props.user = "Sarthak"
  → displays "I am Example 2 Sarthak"
```

Data only travelled **downward** — from `App` to `Example` to `Example2`.

This is **props drilling** — passing data through multiple component layers to reach the component that actually needs it.

---

## One Important Thing to Notice

The prop name **changed** as it passed down:

```
App sends:       name="Sarthak"
Example receives: props.name
Example sends:   user={props.name}
Example2 receives: props.user
```

The **value** stayed the same — `"Sarthak"`.

But the **prop name** was renamed at each level — `name` became `user`.

This is completely fine — each component decides what name to give the prop it passes down.

---

## Summary

- Data flows **top to bottom** — `App → Example → Example2`.

- A component can receive a prop, use it, and also pass it further down to its own children.

- The prop name can change at each level — only the value matters.

- This pattern is called **props drilling** — works fine for small apps, gets messy when the chain gets very long.

---

