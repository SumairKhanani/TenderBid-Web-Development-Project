import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Layout from './../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { FaUser, FaBuilding, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import './AllUsers.css';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();

  // Get all users
  const getAllUsers = async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const response = await axios.get('/api/user/getUsers', { headers });
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while getting users');
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title="All Users">
      <div className="all-users-container">
      
        <div className="user-sidebar">
          <AdminMenu/>
        </div>
      
        <div className="user-list">
          <div className="user-count">
          <h1 className="page-title">USERS INFORNMATION </h1>
         <h2 className="page-subtitle">  Users Available : {users.length} </h2>
          </div>
          <div className="users">
            {users.map((user) => (
              <Link key={user._id} to={`/dashboard/admin/users/SingleUser/${user._id}`} className="user-link">
                <div className="user-card">
                  <div className="user-avatar">
                    <img src="/images/profilepic.png" alt="User Avatar" />
                  </div>
                  <div className="user-info">
                    <h3 className="user-name">{user.username}</h3>
                    <p className="user-company">
                      <FaBuilding className="user-icon" />
                      {user.companyName}
                    </p>
                    <p className="user-email">
                      <FaEnvelope className="user-icon" />
                      {user.email}
                    </p>
                    <p className="user-address">
                      <FaMapMarkerAlt className="user-icon" />
                      {user.Address}
                    </p>
                    <p className="user-contact">
                      <FaPhone className="user-icon" />
                      {user.ContactNo}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllUsers;