import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Layout from './../../components/Layout/Layout';
import ContractorMenu from '../../components/Layout/ContractorMenu';
import './CtSingleTender.css';

const CtSingleTender = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [Cshow, setCShow] = useState(false);
  const [Ashow, setAShow] = useState(false);
  const navigate = useNavigate();
  const [tender, setTender] = useState([]);
  const [auth, setAuth] = useAuth();
  const [bid, setBid] = useState('');
  const [bids, setBids] = useState([]);

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

  const getSingleTender = async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const { data } = await axios.get(`/api/tender/find/${params.id}`, { headers });
      setTender(data?.tender);
    } catch (error) {
      toast.error('Something went wrong in getting the tender');
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleTender();
  }, []);

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
        <div className="container-bid">
      <div className="row dashboard">
        <div className="col-md-3">
          <ContractorMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Single Tender</h1>
          <div className="tender-card">
            <div className="tender-image">
              <img src="/images/hammer.jpg" alt={tender.name} />
            </div>
            <div className="tender-details">
              <h5 className="tender-title">Tender Title: {tender.title}</h5>
              <p className="tender-description">Tender Description: {tender.categories}</p>
              <p className="tender-description">Tender Description: {tender.details}</p>
              <p className="tender-budget">Tender Budget: {tender.budget}</p>
              <p className="tender-username">Tender Username: {tender?.user?.username}</p>
            </div>
          </div>
          {show && (
            <div className=" text-center mt-3">
              <input
                type="number"
                value={bid}
                placeholder="Bid now"
                className="form-control"
                onChange={(e) => setBid(e.target.value)}
              />
              <button className="button-bid" onClick={handleBid}>
                SUBMIT BID
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default CtSingleTender;
