import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import ConsumerMenu from '../../components/Layout/ConsumerMenu';
import './CreateTender.css';

const CreateTender = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState('');
  const [categories, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [budget, setBudget] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const body = {
        user: auth.user._id,
        categories: categories,
        title: title,
        details: details,
        budget: budget,
      };
      const headers = { Authorization: `${auth.token}` };
      const { data } = await axios.post('/api/tender/createTender', body, { headers });
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success('Tender Created Successfully');
        navigate('/dashboard/consumer/categories');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <ConsumerMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Tender</h1>
            <div className="create-tender-form">
            
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  className="form-control2"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Categories:</label>
                <textarea
                  value={categories}
                  className="form-control2"
                  onChange={(e) => setCategory(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Details:</label>
                <textarea
                  value={details}
                  className="form-control2"
                  onChange={(e) => setDetails(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Budget:</label>
                <input
                  type="number"
                  value={budget}
                  className="form-control2"
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            
              <div className="form-group">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Tender
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTender;
