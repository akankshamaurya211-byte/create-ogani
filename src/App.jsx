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

export default function App() {
    const routes = createBrowserRouter([
        {
            path: "/", element: <Layout />, children: [
                { path: "/", element: <Home /> },
                { path: "/nav", element: <Nav /> },
                { path: "/profile", element: <Profile /> },
                { path: "/product/:id", element: <ProductDetails /> },
                { path: "/contact", element: <Contact /> },
                { path: "/cart", element: <Cart /> },
                {path: "/shop", element: <Shop />},
                {path:"/wishlist", element:<Wishlist/>}
            ]
        },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
    ])
    return (
        <RouterProvider router={routes} />
    )
}