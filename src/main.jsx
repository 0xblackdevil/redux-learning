import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import { HomeComponent } from './home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CakeView from './feature/cake/cakeView';
import IceCreamView from './feature/ice-cream/iceCreamView';
import UserView from './feature/async-slice/userView';
import { Provider } from 'react-redux';

import store from "./app/store"

const root = ReactDOM.createRoot(document.getElementById('root'));

const appRoute = createBrowserRouter([
    {
        path: '/', element: <HomeComponent />, children: [
            { path: 'cake', element: <CakeView /> },
            { path: 'ice-cream', element: <IceCreamView /> },
            { path: 'coustomers', element: <UserView /> }
        ]
    }
]);

root.render(
    <Provider store={store}>
        <RouterProvider router={appRoute} />
    </Provider >
);