import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import './AdSingleTender.css'

const AdSingleTender = () => {
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
  const [Dshow, setDShow] = useState(false);

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

  const handleDelete = async () => {
    const headers = {
      Authorization: `${auth.token}`,
    };
    try {
      const res = await axios.delete(`/api/tender/deleteTender/${params.id}`, { headers });
      console.log(res);

      toast.success(`tender is deleted`);
      setDShow(true);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in deleting the tender');
    }
  };
  const handleInactive = async () => {
    const headers = {
      Authorization: `${auth.token}`,
    };
    try {
      const res = await axios.put(`/api/tender/updateTenderStatus/${params.id}`, { headers });
      console.log(res);
      setDShow(true);
      toast.success('Tender Inactive');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in deleting the tender');
    }
  };

  const handleLowest = async () => {
    const headers = {
      Authorization: `${auth.token}`,
    };
    try {
      const { data } = await axios.get(`/api/bid/lowest/${params.id}`, { headers });
      console.log(data, 'MY DATAAA');
      const mappedBids = data.map((item) => ({
        amount: item.amount,
        companyname: item.user.companyName,
        username: item.user.username,
        email: item.user.email,
      }));
      setBids(mappedBids);
      setAShow(true);
    } catch (error) {
      toast.error('Something went wrong in getting the lowest bids');
      return console.log(error);
    }
  };

  useEffect(() => {
    console.log(bids, 'Hellooo');
  }, [bids]);

  const handleBid = async () => {
    const body = {
      user: `${auth.user._id}`,
      tender: `${params.id}`,
      amount: `${bid}`,
    };
    const headers = {
      Authorization: `${auth.token}`,
    };
    try {
      const res = await axios.post(`/api/bid/createBid`, body, { headers });
      console.log(res);
      setShow(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in creating the bid');
    }
  };

  return (
    <Layout title="Tenders">
          <h1 className="text-center">Single Tender</h1>
          <div className="tender-card-container">
            <div className="tender-image">
              <img
                style={{ width: '100%' }}
                src="/images/hammer.jpg"
                className="card-img-top"
                alt={tender.name}
              />
            </div>
            <div className="tender-details">
              <div className="card-body" key={tender._id}>
                <h5 className="card-title">Tender Title: {tender.title}</h5>
                <p className="card-text">Tender Description: {tender.categories}</p>
                <p className="card-text">Tender Description: {tender.details}</p>
                <p className="card-text">Tender Budget: {tender.budget}</p>
                <p className="card-text">Tender Username: {tender?.user?.username}</p>
                <p className="card-text">Tender Status: {tender?.status}</p>
                {show && (
                  <div className="bid-container">
                    <input
                      type="number"
                      value={bid}
                      placeholder="Bid now"
                      className="form-control"
                      onChange={(e) => setBid(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleBid}>
                      Bid
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {Cshow && (
            <div className="lowest-bids-container">
              <button className="btn btn-primary" onClick={handleLowest}>
                3 Lowest Bids
              </button>
              {Ashow && (
                <div className="lowest-bids">
                  {bids.map((p, index) => (
                    <div className="card mb-3" key={index}>
                      <div className="card-body">
                        <h5 className="card-title">Company Name: {p.companyname}</h5>
                        <p className="card-text">Username: {p.username}</p>
                        <p className="card-text">Email: {p.email}</p>
                        <p className="card-text">Amount: {p.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {Dshow && (
            <div className="btn-container">
              <button className="btn btn-primary" onClick={() => navigate(`/dashboard/admin/UpdateTender/${params.id}`)}>
                Update Tender
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete This Tender
              </button>
              <button className="btn btn-warning" onClick={handleInactive}>
                Inactivate This Tender
              </button>
            </div>
          )}
      

    </Layout>
  );
};

export default AdSingleTender;


