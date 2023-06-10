import React,{useState,useEffect} from 'react'
//import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from '../context/auth';
const User = () => {
    const [users, setUsers] = useState([]);
    const [auth,setAuth]= useAuth();


    //getall products
    const getAllUsers = async () => {
      try {
        const headers ={Authorization : `${auth.token}`}
        const { data } = await axios.get("/api/user/getUsers",
        {headers});
        setUsers(data.users);
      } catch (error) {
        console.log(error);
        toast.error("Someething Went Wrong in getting Users");
      }
    };
  
    //lifecycle method
    useEffect(() => {
      getAllUsers();
    }, []);
    return (
      <Layout title="Users">
        <div className="row dashboard">
          <div className="col-md-3">
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Users List</h1>
            <div className="d-flex flex-wrap">
              {users?.map((p) => (
                <Link
                  key={p._id}
                  to={`/SingleUser/${p._id}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img style={{  width: '80%',
    height: '75%' }}
                      src={"/images/profilepic.png"}
                      className="card-img-top"
                      alt={p.username}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.username}</h5>
                      <p className="card-text">{p.companyName}</p>
                      <p className="card-text">{p.email}</p>
                      <p className="card-text">{p.Address}</p>
                      <p className="card-text">{p.ContactNo}</p>
                      <p className="card-text">{p.role}</p>
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
  

export default User