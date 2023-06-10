import React,{useState,useEffect} from 'react'
//import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/auth';
import AdminMenu from '../../components/Layout/AdminMenu';
const Bids = () => {
    const [bids, setBids] = useState([]);
    const [auth,setAuth]= useAuth();


    //getall products
    const getAllBids = async () => {
      try {
        const headers ={Authorization : `${auth.token}`}
        const { data } = await axios.get("/api/bid/getBids",
        {headers});
        setBids(data.bids);
      } catch (error) {
        console.log(error);
        toast.error("Someething Went Wrong in getting bids");
      }
    };
  
    //lifecycle method
    useEffect(() => {
      getAllBids();
    }, []);
    return (
      <Layout title="tenders">
         <div className="container-fluid m-3 p-3 dashboard">
        <div className="row dashboard">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Bids List</h1>
            <div className="d-flex flex-wrap">
              {bids?.map((p) => (
                <Link
                  key={p._id}
                  to={`/SingleTender/${p.tender._id}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={"/images/hammer.jpg"}
                      className="card-img-top"
                      alt={p.tender.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">TENDER: {p.tender.title}</h5>
                      <p className="card-text">User BID ON THIS:{p.user.username}</p>
                      <p className="card-text">BID AMOUNT:{p.amount}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        </div>
      </Layout>
    );
  };
  

export default Bids