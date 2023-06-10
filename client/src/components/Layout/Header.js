import React from 'react'
import {NavLink,Link} from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
//import Dashboard from './../../pages/user/Dashboard';
import {ImHammer2} from 'react-icons/im';


const Header = () => {
  const [auth,setAuth]= useAuth()
  const handleLogout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem('auth');
    toast.success("Logout SuccessFully!")
  }
  return (
    <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to= "/" className="navbar-brand">
        <ImHammer2/> TenderBid
        </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to= "/"  className="nav-link" >
            Home
            </NavLink>
        </li>
      
        {
          !auth.user? (<>
           <li className="nav-item">
          <NavLink to= "/register" className="nav-link" >
            Register
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to= "/login" className="nav-link" >
            Login
            </NavLink>
        </li></>): (<>
        
       <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {auth?.user?.username}
  </NavLink>
  <ul className="dropdown-menu">
    <li><NavLink to={`/dashboard/${auth?.user?.role==="Admin"? 'admin': (auth?.user?.role === "Consumer" ? 'consumer' : 'contractor')}`} className="dropdown-item">
      Dashboard</NavLink></li>
   <li> <NavLink onClick={handleLogout} to= "/login"  className="dropdown-item" >
            Logout
            </NavLink>
            </li>
  </ul>
</li>
<li className="nav-item">
          <NavLink to= "/t/Tenders"  className="nav-link"  >
            Tenders
            </NavLink>
        </li>
</>)
          }
       
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header