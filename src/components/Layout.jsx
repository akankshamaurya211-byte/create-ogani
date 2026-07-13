import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({loggedInStatus}){
    return(
        <>
            <Nav loggedInStatus={loggedInStatus}/>
            <Outlet />
            <Footer />
        </>
    )
}