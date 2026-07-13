import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Nav from "./components/Nav"
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"
import Profile from "./components/pages/Profile"
import ProductDetails from "./components/pages/Product"
import Home from "./components/pages/Home"
import Layout from "./components/Layout"
import Contact from "./components/pages/Contact"
import Cart from "./components/pages/Cart"
import Shop from "./components/pages/Shop"
import Wishlist from "./components/pages/wishlist"
import Protect from "./components/Protect"
import Redirect from "./components/Redirect"

import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react"

export default function App() {


    const [logginStatusLoading, setloginStatusLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        (
        async()=>{
            try {
                let response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/profile`,{credentials:"include"});
                if(!response.ok)
                    throw new Error("User not logged in!!!");

                  setLoggedIn(true);
            } catch (error) {
                setLoggedIn(false);

            }finally{
                setloginStatusLoading(false);
            }
        }
    )()
    },[])

    const routes = createBrowserRouter([
        {
            path: "/", element: <Layout logginStatusLoading={loggedIn} />, children: [
                { path: "/", element: <Home /> },
                { path: "/product/:id", element: <ProductDetails /> },
                { path: "/contact", element: <Contact /> },

                {
                    element: <Protect loading={logginStatusLoading} loggedIn={loggedIn} />, children: [
                        { path: "/profile", element: <Profile setloginStatusLoading={setLoggedIn} /> },
                        { path: "/cart", element: <Cart /> },
                        { path: "/shop", element: <Shop /> },
                        { path: "/wishlist", element: <Wishlist /> }
                    ]
                }
            ]
        },
        {
            element: <Redirect loading={logginStatusLoading} loggedIn={loggedIn} />, children: [
                { path: "/login", element: <Login setloginStatus={setLoggedIn}/> },
                { path: "/signup", element: <Signup /> },
            ]
        }

    ])
    return (
        <RouterProvider router={routes} />
    )
}