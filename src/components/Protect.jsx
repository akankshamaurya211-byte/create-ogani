

export default function Protect(loading, loggedIn){
  return(
    <>
    {loading && <p>Loading...</p>}
    {!loading && !loggedIn && <Navigation to ="/login"/>}
    {!loading && loggedIn && <Outlet/>}
    </>
  )
 }