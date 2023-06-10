import React,{useState,useEffect} from 'react'
//import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../context/auth';
// import Bid from '../../../models/Bid';
const SingleUser = () => {
    const params=useParams();
    const [show , setShow]= useState(false)
    const [Cshow , setCShow]= useState(false)
    const [Ashow , setAShow]= useState(false)
    const navigate=useNavigate();
    const [user, setUser] = useState([]);
    const [auth,setAuth]= useAuth();
    const [username,setUsername]=useState("")
    const [companyName,setCompanyName]=useState("")
    const [email,setEmail]=useState("")
    // const [password,setUpdate]=useState("")
    const [address,setAddress]=useState("")
    const [contactno,setContactno]=useState("")
    useEffect(() => {
        if ( auth.user.role === 'Admin') {
          setShow(true);
        }
      }, []);

      useEffect(() => {
        if (auth.user.role === 'Admin') {
          setCShow(true);
        }
      }, []);

    
      
    //get Single User
    const getSingleUser = async () => {
      try {
        const headers ={Authorization : `${auth.token}`}
        const { data } = await axios.get(`/api/user/find/${params.id}`,
        {headers});
        console.log(data)
        setUser(data.user);
        console.log(data)
      } catch (error) {
        console.log(error);
        toast.error("Someething Went Wrong in getting users");
      }
    };
    console.log(auth.user.role);
    
  
    //lifecycle method
    useEffect(() => {
      getSingleUser();
    }, []);

    // const handleLowest = async () => {
    //   const headers = {
    //     Authorization: `${auth.token}`
    //   };
    //   const { data } = await axios.get(`/api/bid/lowest/${params.id}`, { headers });
    //   console.log(data, 'MY DATAAA');
    //   const mappedBids = data.map(item => ({
    //     amount: item.amount,
    //     companyName: item.user.companyName,
    //     username: item.user.username,
    //     email: item.user.email
    //   }));
    //   setbids(mappedBids);
    //   setAShow(true)
    // };
    
    // useEffect(() => {
    //   console.log(bids, 'Hellooo');
    // }, [bids]);
    const handleDelete= async ()=>{
        const headers={
            Authorization:`${auth.token}`
        }
       const res = await axios.delete(`/api/user/deleteUser/${params.id}`,null, {headers})
       console.log(res)
    }

    const handleUpdate =async ()=>{
        const body ={
            'username' :username,
            'companyName': companyName,
            'email' :email,
            // 'password' :password,
            'Address' :address,
            'ContactNo' :contactno,
        }
        const headers={
            Authorization:`${auth.token}`
        }
       const res = await axios.put(`/api/user/updateUser/${params.id}`,body, {headers})
       console.log(res)
       //setShow(false)
    }
    return (
      <Layout title="Single user">
        <div className="row dashboard">
          <div className="col-md-3">
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">Single User</h1>
            <div className="d-flex flex-wrap">
                
            <img style={{  width: '80%',
    height: '75%' }}
                      src={"/images/profilepic.png"}
                      className="card-img-top"
                      alt={user.username}
                    
                    />
                    <div className="card-body">
                      <h5 className="card-title">User Name:{user.username}</h5>
                      <p className="card-text">Company Name:{user.companyName}</p>
                      <p className="card-text">Email: {user.email}</p>
                      <p className="card-text">Contact: {user.ContactNo}</p>
                      <p className="card-text">Address: {user.Address}</p>
                      <p className="card-text">Role: {user.role}</p>
                      {/* <h5 className="card-text">{tender.user.username} </h5>  */}
                    {show && (<div>
                        <input
                        type="text"
                        value={username}
                        placeholder="Update User Name"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                        />
                         <input
                        type="text"
                        value={companyName}
                        placeholder="update company name"
                        className="form-control"
                        onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <input
                        type="email"
                        value={email}
                        placeholder="update user email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                        type="text"
                        value={address}
                        placeholder="update address"
                        className="form-control"
                        onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                        type="Number"
                        value={contactno}
                        placeholder="update contact info"
                        className="form-control"
                        onChange={(e) => setContactno(e.target.value)}
                        />
                       <NavLink to="/dashboard/admin"> <button onClick={handleUpdate}>Update </button></NavLink> 
                       <NavLink to="/dashboard/admin"> <button onClick={handleDelete}>Delete </button></NavLink> 
                    </div>) }      
                    {/* {Cshow && (<div>
                      <button onClick={handleLowest}>3 Lowest Bids </button>
                      {Ashow && (<div>{bids?.map((p) => (
                        <h2>username : {p.username} <br/> email : {p.email}<br/> company name : {p.companyName}<br/> amount : {p.amount}<br/></h2>              ))}</div>)}
                    </div>) }  */}
                       
                  </div>
    
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  

export default SingleUser