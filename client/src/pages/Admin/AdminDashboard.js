import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import AdminMenu from '../../components/Layout/AdminMenu';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Dashboard - Admin">
      <div className="admin-dashboard-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-content">
          <div className="admin-header">
          <h2 className="admin-title">
              <img src={"../images/profilepic.png"} alt="User Icon" className="admin-user-icon" />
              Welcome, {auth?.user?.username}!
            </h2>
            <p className="admin-subtitle">Manage your website with ease.</p>
          </div>
          <div className="admin-card">
            <h3 className="admin-card-title">Admin Information</h3>
            <div className="admin-info">
              <div className="admin-info-item">
                <span className="admin-info-label">Name:</span> {auth?.user?.username}
              
               
              <div className="admin-info-item">
                <span className="admin-info-label">Email:       </span>{auth?.user?.email}
              

              <div className="admin-info-item">
                <span className="admin-info-label">Contact:</span> {auth?.user?.ContactNo}
          
            </div>
            </div>
            </div>
          </div>
          </div>
          </div>
    
        </div>
      
      
    </Layout>
  );
};

export default AdminDashboard;