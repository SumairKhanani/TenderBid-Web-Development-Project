import React,{useState,useEffect} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/auth';
import ConsumerMenu from '../../components/Layout/ConsumerMenu';
import Layout from './../../components/Layout/Layout';
import '../Admin/Categories.css'
const CCategories = () => {
    const [categories, setCategories] = useState([]);
    const [auth,setAuth]= useAuth();


    //getall products
     const getAllCategories = async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const response = await axios.get(`/api/tender/categories`, { headers });
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };
  
    //lifecycle method
    useEffect(() => {
      getAllCategories();
    }, []);
    return (
      <Layout title="Categories">
      <div className="categories-container">
        <div className="categories-sidebar">
          <ConsumerMenu />
        </div>
        <div className="categories-content">
          <div className="categories-header">
            <h1 className="categories-title">Categories List</h1>
          </div>
          <div className="categories-list">
            {categories.map((category) => (
              <div className="categories-card" key={category}>
                <Link to={`/dashboard/consumer/categories/${category}/${auth?.user?._id}`} className="categories-link">
                  <div className="categories-card-icon">
                
                  <img src={"/images/Software.png"} alt="User Icon" />
  
                  </div>
                  <div className="categories-card-info">
                    <h3 className="categories-card-title">{category}</h3>
                    
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
    export default CCategories;


    