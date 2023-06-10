import React,{useState,useEffect} from 'react'
//import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from './../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import AdminMenu from '../../components/Layout/AdminMenu';


const AllTenders = () => {
    const [tenders, setTenders] = useState([]);
    const [auth,setAuth]= useAuth();


    //getall products
    const getAllTenders = async () => {
      try {
        const headers ={Authorization : `${auth.token}`}
        const { data } = await axios.get("/api/tender/getTender",
        {headers});
        setTenders(data.tenders);
      } catch (error) {
        console.log(error);
        toast.error("Someething Went Wrong in getting products");
      }
    };
  
    //lifecycle method
    useEffect(() => {
      getAllTenders();
    }, []);
    return (
      <Layout title="tenders">
        <div className="row dashboard">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Tenders List</h1>
            <div className="d-flex flex-wrap">
              {tenders?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/SingleTender/${p._id}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img style={{  width: '80%',
    height: '75%' }}
                      src={"/images/hammer.jpg"}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">TITILE:{p.title}</h5>
                      <p className="card-text">CATEGORY:{p.categories}</p>
                      <p className="card-text">DETAILS:{p.details}</p>
                      <p className="card-text">BUDGET{p.budget}</p>
                      <p className="card-text">CREATOR:{p?.user?.username}</p>
                      <p className="card-text">STATUS:{p?.status}</p>
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
  

export default AllTenders