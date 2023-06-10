import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ConsumerMenu from '../../components/Layout/ConsumerMenu';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import './CreateTender.css';
import { useAuth } from '../../context/auth';

const CreateTender = () => {
  const [categories, setCategories] = useState("");
const [categoryOptions, setCategoryOptions] = useState([]);
    const navigate = useNavigate();
    const [auth,setAuth]= useAuth();
    const [user,setUser]=useState("");
    const[category,setCategory]= useState("");
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [budget, setBudget] = useState("");

    // const getUserId=async ()=>{
    //    try {
    //     const {data}=await axios.get ("api/auth/user/me")
    //     setUser(data.user)
    //     return data.user;
    //    } catch (error) {
    //     console.log(error)
    //    }
        
    // }
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("/api/tender/categories");
          setCategoryOptions(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCategories();
    }, []);
    
  console.log(auth.token)
    // useEffect(()=>{
    //    if(auth?.token) getUserId();
    // },[auth?.token])
    //create product function
    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const tenderData = new FormData();
             
        // tenderData.set("user", auth.user._id);
        // tenderData.set("title", title);
        // tenderData.set("details", details);
        // tenderData.set("budget", budget);
        const body ={
          "user" : `${auth.user._id}`,
          "categories":`${categories}`,
          "title" : `${title}`,
          "details" : `${details}`,
          "budget" : `${budget}`
        }
        const headers ={Authorization : `${auth.token}`}
        const { data} = axios.post( "/api/tender/createTender",
          body, {headers}
        );
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Tender Created Successfully");
          navigate("/dashboard/admin/Tenders");
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
        
      }
    };
  
    return (
      <Layout title={"Dashboard - Create Product"}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Create Tender</h1>
               
              {/* <div className="mb-3">
                  <input
                    type="text"
                    value={user}
                    placeholder="write an id"
                    className="form-control"
                    onChange={(e) => setUser(e.target.value)}
                    disabled
                  />
                </div> */}
              <div className="mb-3">
                  <input
                    type="text"
                    value={title}
                    placeholder="write a title"
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <select
                value={categories}
              className="form-control"
               onChange={(e) => setCategory(e.target.value)}
         >
            <option value="">Select a category</option>
            {categoryOptions.map((option, index) => (
             <option key={index} value={option}>
             {option}
        </option>
  ))}
</select>

                <div className="mb-3">
                  <textarea
                    type="text"
                    value={details}
                    placeholder="write a detail"
                    className="form-control"
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                  <input
                    type="number"
                    value={budget}
                    placeholder="write a Budget"
                    className="form-control"
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleCreate}>
                    Create your Tender Now
                  </button>
           
                </div>
              </div>
            </div>
          </div>
      </Layout>
    );
}

export default CreateTender