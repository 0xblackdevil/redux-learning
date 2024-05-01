---
marp: true
theme: gaia
footer: "- 0xmeet.com"
backgroundColor: #f2f2f2
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---

# What is redux

Its a **predictable** **state container** for **JavaScript apps**.

Let's Breakdown it:

- predictable : the state of the app is predictable and can be easily understood by looking at the state tree
- state container : state of the app is stored in a single object called state tree
- JavaScript apps : redux is used in javascript apps

---

# why redux ?

- manage the global state in a predictable way
- easy to understand when, where, why and how the state is updated using tools and patterns

---

### Summary

- React is a library used to build user interface.
- Redux is a library for managing state in a predictable way.
- Redux toolkit is a lib for efficient Redux development.
- React-redux is a lib that provides bindings for React and Redux.

---

# Three Core concepts of Redux

- store : Holds the state of your application.
- action : Describes the changes in the state of the application.
- reducer : Handles the action and decides how the state changes.

---

# Three principles of Redux

- Global state of your application is stored as a object in a single store.
- only way to change the state is to dispatch an action.
- write pure reducers to specify how the state should change in response to an action.
  - Reducer => (previous_state, action) => new_state
