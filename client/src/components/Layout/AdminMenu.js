import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaFileAlt, FaList, FaTags, FaUserCircle } from "react-icons/fa";
import { useAuth } from '../../context/auth';
import "./AdminMenu.css";

const AdminMenu = () => {
  const [auth] = useAuth();
  return (
    <div className="admin-menu">
      <div className="admin-info">
        <FaUserCircle className="admin-avatar" />
        <div className="admin-name">{auth?.user?.username}</div>
      </div>
      
      <div className="sub-heading">DATA</div>
      <NavLink
        to="/dashboard/admin/users"
        className="menu-link"
        activeClassName="active-link"
      >
        <FaUser className="menu-icon" />
        Users
      </NavLink>
      <div className="sub-heading">PAGES</div>
      <NavLink
        to="/dashboard/admin/CreateTenders"
        className="menu-link"
        activeClassName="active-link"
      >
        <FaFileAlt className="menu-icon" />
        Create Tenders
      </NavLink>
      <NavLink
        to="/dashboard/admin/Tenders"
        className="menu-link"
        activeClassName="active-link"
      >
        <FaList className="menu-icon" />
        All Tenders
      </NavLink>
      <NavLink
        to="/dashboard/admin/categories"
        className="menu-link"
        activeClassName="active-link"
      >
        <FaTags className="menu-icon" />
        Categories
      </NavLink>
    </div>
  );
};

export default AdminMenu;