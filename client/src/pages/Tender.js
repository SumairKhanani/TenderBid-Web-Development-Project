import React,{useState,useEffect} from 'react'
//import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';

import './Tender.css'
const Tender = () => {
  const [tenders, setTenders] = useState([]);
  const [auth] = useAuth();

  // Get all tenders
  const getAllTenders= async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const { data } = await axios.get('/api/tender/getTender', { headers });
      setTenders(data.tenders);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting tenders');
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllTenders();
  }, []);

  return (
    <Layout title="Tenders">
      <div className="tender-container">
      <div className="row dashboard">
          
        <h1 className="tender-title">ALL TENDERS</h1>
        <div className="tenders-grid">
          {tenders?.map((p) => (
            <Link key={p._id} to={`/SingleTender/${p._id}`} className="tender-link">
              <div className="tender-card">
                <div className="tender-image">
                  <img src="/images/hammer.jpg" className="tender-img" alt={p.name} />
                </div>
                <div className="tender-details">
                      <h5 className="card-title">{p.title}</h5>
                      <p className="card-text">{p.categories}</p>
                      <p className="card-text">{p.details}</p>
                      <p className="card-text">{p.budget}</p>
                      <p className="card-text">{p?.user?.username}</p>
                    </div>
                  {/* <p className="tender-category">{tender.category.name}</p> */}
                </div>
        
            </Link>
          ))}
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Tender;