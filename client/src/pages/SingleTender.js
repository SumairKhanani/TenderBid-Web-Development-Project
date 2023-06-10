import React,{useState,useEffect} from 'react'
//import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../context/auth';

// import Bid from '../../../models/Bid';
const SingleTender = () => {
    const params=useParams();
    const [show , setShow]= useState(false)
    const [Cshow , setCShow]= useState(false)
    const [Ashow , setAShow]= useState(false)
    const navigate=useNavigate();
    const [tender, setTender] = useState([]);
    const [auth,setAuth]= useAuth();
    const [bids,setbids]=useState([])
    const [title,setTitle]=useState("")
    const [details,setDetails]=useState("")
    const [budget,setBudget]=useState("")

    //getall products
    const getSingleTender = async () => {
      try {
        const headers ={Authorization : `${auth.token}`}
        const { data } = await axios.get(`/api/tender/find/${params.id}`,
        {headers});
        console.log(data)
        setTender(data.tender);
        console.log(data)
      } catch (error) {
        console.log(error);
        toast.error("Someething Went Wrong in getting products");
      }
    };
    console.log(auth.user.role);
    
    //lifecycle method
    useEffect(() => {
      getSingleTender();
    }, []);
    useEffect(() => {
      console.log(bids, 'Hellooo');
    }, [bids]);
    
    return (
      <Layout title="tenders">
        <div className="row dashboard">
          <div className="col-md-3">
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">Single Tender</h1>
            <div className="d-flex flex-wrap">
            <img style={{  width: '50%', height: '75%' }}
                      src={"/images/hammer.jpg"}
                      className="card-img-top"
                      alt={tender.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">Tender titile: {tender.title}</h5>
                      <h5 className="card-title">Tender Description: {tender.title}</h5>
                      <h5 className="card-text">Tender Budget: {tender.budget}</h5>
                      {/* <h5 className="card-text">Consumer: {tender.user.companyName} </h5>   */}
                  </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  

export default SingleTender