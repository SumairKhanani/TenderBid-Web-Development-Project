import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Layout from './../../components/Layout/Layout';
import ContractorMenu from '../../components/Layout/ContractorMenu';
import './BiddedTender.css';

const BiddedTender = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [Cshow, setCShow] = useState(false);
  const [Ashow, setAShow] = useState(false);
  const navigate = useNavigate();
  const [tender, setTender] = useState([]);
  const [auth, setAuth] = useAuth();
  const [bid, setBid] = useState('');
  const [bids, setBids] = useState([]);

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

  return (
    <Layout title="Tenders">
      <div className="row dashboard">
       
          <h1 className="text-center">Single Tender</h1>
        
        <div className="col-md-3">
          <ContractorMenu />
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-6">
              <img
                src="/images/hammer.jpg"
                className="card-img-top"
                alt={tender.name}
              />
            </div>
           
              <div className="card-body" key={tender._id}>
                <h5 className="card-title">Tender Title: {tender.title}</h5>
                <p className="card-text">Tender Category: {tender.categories}</p>
                <p className="card-text">Tender Description: {tender.details}</p>
                <p className="card-text">Tender Budget: {tender.budget}</p>
                <p className="card-text">Tender created by: {tender?.user?.username}</p>
                <p className="card-text">Your Bid: {bid?.amount}</p>
             
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BiddedTender;