// const store = require('./src/app/store');
// const cakeAction = require("./src/feature/cake/cakeSlice").cakeActions;
// const iceCreamAction = require("./src/feature/ice-cream/iceCreamSlice").iceCreamActions;
// const fetchUsers = require("./src/feature/async-slice/userSlice").fetchUsers;

// console.log("Initial state: ", store.getState());
// const unsubscribe = store.subscribe(() => { });

// store.dispatch(cakeAction.ordered(1));
// console.log("=== ice cream ===");
// store.dispatch(iceCreamAction.ordered(3));

// store.dispatch(fetchUsers());

// unsubscribe();


import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const HomeComponent = () => {
    return (
        <div className='h-screen'>
            <div className='bg-black text-white flex justify-center p-5'>
                <ul className=' flex items-center gap-10 '>
                    <li className='hover:font-bold'>
                        <Link to={"cake"}> Cake</Link>
                    </li>
                    <li className='hover:font-bold'> <Link to={"ice-cream"}> Ice Cream</Link></li>
                    <li className='hover:font-bold'> <Link to={"coustomers"}> Coustomers</Link></li>
                </ul>
            </div>

            <Outlet />
        </div>
    )
}
