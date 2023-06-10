import React, { useState, useEffect } from 'react';
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/auth.js';
import ContractorMenu from '../../components/Layout/ContractorMenu';
import './MyBids.css'

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [auth, setAuth] = useAuth();

  // Get all bids
  const getAllBids = async () => {
    try {
      const headers = { Authorization: auth.token };
      const { data } = await axios.get(`/api/bid/UserBid/${auth?.user?._id}`, { headers });
      setBids(data?.bid);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in getting Bids");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllBids();
  }, []);

  return (
    <Layout title="My Bids">
      <div className="row">
        <div className="col-md-3">
          <ContractorMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center"> {auth?.user?.username}'s Bids</h1>
          <div className="bids-container">
            {bids.map((bid) => (
              <Link
                key={bid?._id}
                to={`/dashboard/contractor/myBids/SingleTender/${bid?.tender?._id}`}
                className="bid-card"
              >
                <div className="card">
                  <img
                    src={"/images/bidicon.png"}
                    className="card-img-top"
                    alt={bid?.user?.username}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Username: {bid?.user?.username}</h5>
                    <p className="card-text">On Tender: {bid?.tender?.title}</p>
                    <p className="card-text">Tender Budget was: {bid?.tender?.budget}</p>
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

export default MyBids;
