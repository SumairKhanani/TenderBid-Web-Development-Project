import React,{useState,useEffect} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/auth';
import Layout from "../../components/Layout/Layout";
import ContractorMenu from '../../components/Layout/ContractorMenu';
import '../Admin/Categories.css'
const CtCategories = () => {
  const [categories, setCategories] = useState([]);
  const [auth] = useAuth();

  // Get all categories
  const getAllCategories = async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const response = await axios.get(`/api/tender/categories/`, { headers });
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title="Categories">
      <div className="categories-container">
        <div className="categories-sidebar">
          <ContractorMenu />
        </div>
        <div className="categories-content">
          <div className="categories-header">
            <h1 className="categories-title">Categories List</h1>
          </div>
          <div className="categories-list">
            {categories.map((category) => (
              <div className="categories-card" key={category}>
                <Link to={`/dashboard/contractor/CategoryTender/${category}`} className="categories-link">
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
    
export default CtCategories;








