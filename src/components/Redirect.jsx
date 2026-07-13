import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
 export default function Redirect(loading, loggedIn){
  return(
    <>
    {loading && <p>Loading...</p>}
    {!loading && !loggedIn && <Outlet/>}
    {!loading && loggedIn && <Navigate to = "/profile"/>}
    </>
  )
 }