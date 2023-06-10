import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaFileAlt, FaList, FaTags, FaUserCircle } from "react-icons/fa";
import { useAuth } from '../../context/auth';
import "./AdminMenu.css";
const ConsumerMenu = () => {
  const [auth] = useAuth();
  return (
    <>
    <div className="admin-menu">
      <div className="admin-info">
        <FaUserCircle className="admin-avatar" />
        <div className="admin-name">{auth?.user?.username}</div>
      </div>
      
      <div className="sub-heading">PAGES</div>
      <NavLink
to="/dashboard/consumer/createTenders"
className="menu-link"
            activeClassName="active-link"
>
Create Tender
</NavLink>

<NavLink
to="/dashboard/consumer/categories"
className="menu-link"
            activeClassName="active-link"
>
Categories
</NavLink>
    </div>
    </>
  );
};


export default ConsumerMenu;



