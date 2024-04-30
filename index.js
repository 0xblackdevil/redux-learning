const store = require('./src/app/store');
const cakeAction = require("./src/feature/cake/cakeSlice").cakeActions;
const iceCreamAction = require("./src/feature/ice-cream/iceCreamSlice").iceCreamActions;
const fetchUsers = require("./src/feature/async-slice/userSlice").fetchUsers;

console.log("Initial state: ", store.getState());
const unsubscribe = store.subscribe(() => { });

// store.dispatch(cakeAction.ordered(1));
// console.log("=== ice cream ===");
// store.dispatch(iceCreamAction.ordered(3));

store.dispatch(fetchUsers());

unsubscribe();


