import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaFileAlt, FaList, FaTags, FaUserCircle } from "react-icons/fa";
import { useAuth } from '../../context/auth';
import "./AdminMenu.css";
const ContractorMenu = () => {
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
            to="/dashboard/contractor/myBids"
            className="menu-link"
            activeClassName="active-link"
          >
            <FaList className="menu-icon" />
            MyBids
          </NavLink>
      <NavLink
            to="/dashboard/contractor/categories"
            className="menu-link"
            activeClassName="active-link"
          >
            <FaTags className="menu-icon" />
            Categories
          </NavLink>
    </div>
    </>
  );
};



export default ContractorMenu;