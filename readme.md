## What is redux ?

- Its a predictable state container for javascript app

Lets brake into peaces and understand the defanition

    - predictable: It means that the state of the app is predictable and can be easily understood by looking at the state tree
    - state container: It means that the state of the app is stored in a single object called state tree
    - javascript app: It means that redux is used in javascript apps

#### Why redux ?

- If you want to manage the global state of your application in a predictable way, redux can help you.

- The patterns and tools provided by Redux make it easier to understand when, where, why, and how the state in your application is being updated, and how your application logic will behave when those changes occur.

- Redux guides you towards writing code that is predictable and testable, which helps give you confidence that your application will work as expected.

#### Summary

- React is a library used to build user interfaces
- Redux is a library for managing state in a predictable way in JavaScript applications
- Redux toolkit is a library for efficient redux development
- React-redux is a library that provides bindings to use React and Redux (Toolkit) together in an application

---

### Three core conceprs of redux

| Cake shope scene |  Redux  |                        Purpose                        |
| :--------------: | :-----: | :---------------------------------------------------: |
|       Shop       |  Store  |          Holds the state of your application          |
|    Cake order    | Action  | Describes the changes in the state of the application |
|    Shopkeeper    | Reducer | Handles the action and decides how the state changes  |

- A **store** that holds the state of your application.
- An **action** which describe the changes in the state of the application.
- A **reducer** which handles the action and deside how the state changes.

---

### Three principles of redux

1. A global state of your application is stored as a object in a single store
2. The only way to change the state is to dispatch an action, an object describing what happened
3. To spacify how the state tree is transformed by actions, you write pure reducers
   - Reducer => (previous_state, action) => new_state

---

### Actions

- The only way your application can interact with the store Carry some information from your app to the redux store
- Plain JavaScript objects
- Have a 'type' property that describes something that happened in the application.
- The 'type' property is typically defined as string constants

---

### Reducer

- Specify how the app's state changes in response to actions sent to the store
- Function that accepts state and action as arguments, and returns the next state of the application

(previousState, action) => newState

---

### Redux Store

- one store for the entire application

Responsibilities -

- Holds application state
- Allows access to state via getState()
- Registers listeners via subscribe(listener)
- Allows state to be updated via dispatch(action)

```javascript
const redux = require("@reduxjs/toolkit");

const CAKE_ORDERED = "CAKE_ORDERED";
const ADD_CAKES = "ADD_CAKES";

function orderedCake(cake_quntity) {
  return {
    type: CAKE_ORDERED,
    quntity: cake_quntity,
  };
}

function addCake(cake_quntity) {
  return {
    type: ADD_CAKES,
    quntity: cake_quntity,
  };
}

const initialCakes = {
  numberOfCakes: 10,
};

const reducer = (state = initialCakes, actions) => {
  switch (actions.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - actions.quntity,
      };

    case ADD_CAKES:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + actions.quntity,
      };
    default:
      return state;
  }
};

const store = redux.configureStore({
  reducer: reducer,
});

console.log("initial state: ", store.getState());
const unscribe = store.subscribe(() =>
  console.log("updated state: ", store.getState())
);

store.dispatch(orderedCake(1));
store.dispatch(orderedCake(3));

console.log("=== Add Cakes ===");
store.dispatch(addCake(1));
store.dispatch(addCake(2));

unscribe();
```

---

### Bind Action Creators

- It is a function that binds action creators to the dispatch method of the store

```javascript
const redux = require("@reduxjs/toolkit");

const CAKE_ORDER = "CAKE_ORDER";
const CAKE_RESTOKE = "CAKE_RESTOKE";

function cakeOrder(_qunatity) {
  return {
    type: CAKE_ORDER,
    payload: _qunatity,
  };
}

function restoreCake(_qunatity) {
  return {
    type: CAKE_RESTOKE,
    payload: _qunatity,
  };
}

const initialState = {
  numOfCakes: 5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDER:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    case CAKE_RESTOKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const cakeShop = redux.configureStore({
  reducer: reducer,
});
const actions = redux.bindActionCreators(
  { cakeOrder, restoreCake },
  cakeShop.dispatch
);

console.log("initial state: ", cakeShop.getState());
const unsubscribe = cakeShop.subscribe(() =>
  console.log("Updated state: ", cakeShop.getState())
);

console.log("=== selling cakes & ice creams ===");
actions.cakeOrder(2);
actions.cakeOrder(5);

console.log("=== restoring cakes & ice creams ===");
actions.restoreCake(10);
actions.restoreCake(10);

unsubscribe();
```

### combineReducers

- It is a helper function that turns an object whose values are different reducing functions into a single reducing function you can pass to createStore

---

### Immer library

- It is a library that allows you to work with immutable state in a more convenient way

```javascript
const redux = require("@reduxjs/toolkit");
const produce = require("immer").produce;
const UPDATE_STREET = "UPDATE_STREET";

function updateStreet(_street, _pincode) {
  return {
    type: UPDATE_STREET,
    payload: { _street, _pincode },
  };
}

const initialState = {
  name: "john deo",
  age: 20,
  address: {
    street: "123 main st",
    city: "New York",
    zip: 10001,
  },
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STREET:
      // normal way to update nested state

      // return {
      //     ...state,
      //     address: {
      //         ...state.address,
      //         street: action.payload._street,
      //         zip: action.payload._pincode
      //     }
      // }

      // using immer to update nested state
      return produce(state, (draftState) => {
        draftState.address.street = action.payload._street;
        draftState.address.zip = action.payload._pincode;
      });
    default:
      return state;
  }
};

const rootReducer = redux.combineReducers({
  address: addressReducer,
});

const store = redux.configureStore({
  reducer: rootReducer,
});

const addressActions = redux.bindActionCreators(
  { updateStreet },
  store.dispatch
);

console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));
addressActions.updateStreet("456 main st", 415022);
unsubscribe();
```

---

### Middleware

- Is the suggested way to extend Redux with custom functionality
- Provides a third-party extension point between dispatching an action, and the moment it reaches the reducer
- Use middleware for logging, crash reporting, performing asynchronous tasks etc
- `redux-logger` is one of the most popular middleware for logging

```javascript
const redux = require("@reduxjs/toolkit");
const produce = require("immer").produce;
const UPDATE_STREET = "UPDATE_STREET";

// import reduxLogger from 'redux-logger';
const reduxLogger = require("redux-logger");

// create logger
const logger = reduxLogger.createLogger();

function updateStreet(_street, _pincode) {
  return {
    type: UPDATE_STREET,
    payload: { _street, _pincode },
  };
}

const initialState = {
  name: "john deo",
  age: 20,
  address: {
    street: "123 main st",
    city: "New York",
    zip: 10001,
  },
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STREET:
      return produce(state, (draftState) => {
        draftState.address.street = action.payload._street;
        draftState.address.zip = action.payload._pincode;
      });
    default:
      return state;
  }
};

const rootReducer = redux.combineReducers({
  address: addressReducer,
});

const store = redux.configureStore({
  reducer: rootReducer,
  // add logger middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

const addressActions = redux.bindActionCreators(
  { updateStreet },
  store.dispatch
);

console.log("initial state: ", store.getState());
const unsubscribe = store.subscribe(() => {});
addressActions.updateStreet("456 main st", 415022);
unsubscribe();
```

---

### synchronous vs asynchronous actions

**Synchronous Actions**

- As soon as an action was dispatched, the state was immediately updated.
- If you dispatch the CAKE_ORDERED action, the numOfCakes was right away decremented by 1. Same with ICECREAM_ORDERED action as well.

**Async Actions**

- Asynchronous API calls to fetch data from an end point and use that data in your application.
- we need two library for async actions
  - redux-thunk : middleware that allows you to write action creators that return a function instead of an action object
  - axios : promise based HTTP client for the browser and node.js

```javascript

```
