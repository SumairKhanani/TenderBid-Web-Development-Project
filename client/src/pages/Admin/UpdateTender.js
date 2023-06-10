import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';

const UpdateTender = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [Cshow, setCShow] = useState(false);
  const [Ashow, setAShow] = useState(false);
  const navigate = useNavigate();
  const [tender, setTender] = useState([]);
  const [auth, setAuth] = useAuth();
  const [bid, setBid] = useState('');
  const [bids, setBids] = useState([]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [budget, setBudget] = useState('');
  const [dshow, setDShow] = useState(false);

  useEffect(() => {
    if (auth.user.role === 'Contractor' || auth.user.role === 'Admin') {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (auth.user.role === 'Consumer' || auth.user.role === 'Admin') {
      setCShow(true);
    }
  }, []);

  useEffect(() => {
    if (auth.user.role === 'Admin') {
      setDShow(true);
    }
  }, []);

  const handleUpdate = async () => {
    const body = {
      title: title,
      details: details,
      budget: budget,
    };
    const headers = {
      Authorization: `${auth.token}`,
    };
    try {
      const res = await axios.put(`/api/tender/updateTender/${params.id}`, body, { headers });
      console.log(res);
      setDShow(true);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in updating the tender');
    }
  };

  const getSingleTender = async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const { data } = await axios.get(`/api/tender/find/${params.id}`, { headers });
      console.log(data);
      setTender(data?.tender);
      console.log(data, 'hellooojoadjlojadkljlkad');
    } catch (error) {
      toast.error('Something went wrong in getting the tender');
     return console.log(error);
      
    }
  };

  useEffect(() => {
    getSingleTender();
  }, []);





  

  return (
    <Layout title="Tenders">
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Single Tender</h1>
          <div className="row">
            <div className="col-md-6">
           
              <img
                style={{ width: '50%' }}
                src="/images/hammer.jpg"
                className="card-img-top"
                alt={tender.name}
              />
            </div>
            <div className="col-md-6">
            
              <div className="card-body" key={tender._id}>
                <h5 className="card-title">Tender Title: {tender.title}</h5>
                <p className="card-text">Tender Description: {tender.categories}</p>
                <p className="card-text">Tender Description: {tender.details}</p>
                <p className="card-text">Tender Budget: {tender.budget}</p>
                <p className="card-text">Tender Username: {tender?.user?.username}</p>
                <p className="card-text">Tender Status: {tender?.status}</p>
              </div>
            </div>
          </div>
          {dshow && (
            <div className="update-tender-container mt-4">
              <h2>Update Tender</h2>
              <input
                type="text"
                value={title}
                placeholder="Update Title"
                className="form-control mt-2"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                value={details}
                placeholder="Update Details"
                className="form-control mt-2"
                onChange={(e) => setDetails(e.target.value)}
              />
              <input
                type="number"
                value={budget}
                placeholder="Update Budget"
                className="form-control mt-2"
                onChange={(e) => setBudget(e.target.value)}
              />
              <NavLink to="/dashboard/admin">
                <button className="btn btn-primary mt-2" onClick={handleUpdate}>
                  Update Tender
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateTender;
