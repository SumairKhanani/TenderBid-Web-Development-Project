import {Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
// import Dashboard from "./pages/user/Dashboard";
// import PrivateRoute from "./components/Routes/Private";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import ConsumerDashboard from "./pages/consumer/ConsumerDashboard";
import ConsumerRoute from "./components/Routes/ConsumerRoute";
import ContractorRoute from "./components/Routes/ContractorRoute";
import ContractorDashboard from "./pages/contractor/ContractorDashboard";
// import CreateCategory from "./pages/Admin/CreateCategory";
// import CreateProduct from "./pages/Admin/CreateProduct";
// import Users from "./pages/Admin/Users";
// import Orders from "./pages/user/Orders";
// import Profile from "./pages/user/Profile";
// import Products from "./pages/Admin/Products";
// import UpdateProduct from "./pages/Admin/UpdateProduct";
//import createTender from "./pages/consumer/createTender";
//import createTenders from './pages/consumer/createTenders.js';
import CreateTender from "./pages/consumer/CreateTender";
import Tender from "./pages/Tender";
import SingleTender from "./pages/SingleTender";
import MyBids from "./pages/contractor/MyBids";
import MyTender from "./pages/consumer/MyTenders";
import User from './pages/User';
import SingleUser from "./pages/SingleUser";
import Bids from "./pages/Admin/Bids";
import Categories from "./pages/Admin/Categories";
import CategoryTender from "./pages/Admin/CategoryTender";
import AdSingleTender from "./pages/Admin/AdSingleTender";
import AllUsers from './pages/Admin/AllUsers';
import AdSingleUser from './pages/Admin/AdSingleUser';
import AdCreateTenders from './pages/Admin/CreateTender';
import AllTenders from "./pages/Admin/AllTenders";
import PrivateRoute from './components/Routes/PrivateRoutes';
import CCategories from "./pages/consumer/CCategories";
import CSingleTender from "./pages/consumer/CSingleTender";
import CtCategories from "./pages/contractor/CtCategories";
import CtCategoryTender from "./pages/contractor/CtCategoryTender";
import CtSingleTender from "./pages/contractor/CtSingleTender";
import BiddedTender from "./pages/contractor/BiddedTender";
import UpdateTender from "./pages/Admin/UpdateTender";
import UpdateUser from "./pages/Admin/UpdateUser";
import Contactus from "./pages/Contactus";


function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
      <Route path="/dashboard" element={<ConsumerRoute/>}>
      <Route path="consumer" element={<ConsumerDashboard/>}/>
      <Route path="consumer/createTenders" element={<CreateTender/>}/>
      <Route path="consumer/categories" element={<CCategories/>}/>
      <Route path="consumer/categories/:category/:id" element={<MyTender/>}/>
      <Route path="consumer/SingleTender/:id" element={<CSingleTender/>}/>
      </Route>
      <Route path="/dashboard" element={<ContractorRoute/>}>
      <Route path="contractor" element={<ContractorDashboard/>}/>
      <Route path="contractor/categories" element={<CtCategories/>}/>
      <Route path="contractor/CategoryTender/:category" element={<CtCategoryTender/>}/>
      <Route path="contractor/SingleTender/:id" element={<CtSingleTender/>}/>
      <Route path="contractor/myBids" element={<MyBids/>}/>
      <Route path="contractor/myBids/SingleTender/:id" element={<BiddedTender/>}/>
      {/* <Route path="user/profile" element={<Profile/>}/> */}
      </Route>
      <Route path="/t" element={<PrivateRoute/>}>
      <Route path="Tenders" element={<Tender/>}/>
      <Route path='Users' element={<User/>}/>
      <Route path='SingleTender/:id' element={<SingleTender/>}/>
      <Route path='SingleUser/:id' element={<SingleUser/>}/>
      </Route>
      
      <Route path="/dashboard" element={<AdminRoute/>}>
      <Route path="admin" element={<AdminDashboard/>}/>
      <Route path="admin/bids" element={<Bids/>}/>
      <Route path="admin/categories" element={<Categories/>}/>
      <Route path="admin/CategoryTender/:category" element={<CategoryTender/>}/>
      <Route path="admin/SingleTender/:id" element={<AdSingleTender/>}/>
      <Route path="admin/users" element={<AllUsers/>}/>
      <Route path="admin/users/SingleUser/:id" element={<AdSingleUser/>}/>
      <Route path="admin/UpdateUser/:id" element={<UpdateUser/>}/>
      <Route path="admin/CreateTenders/" element={<AdCreateTenders/>}/>
      <Route path="admin/Tenders" element={<AllTenders/>}/>
    
      <Route path="admin/UpdateTender/:id" element={<UpdateTender/>}/>
      {/* <Route path="admin/users" element={<Users/>}/> */}
      </Route>
     {/* <Route path='/forgot-password' element={<ForgotPassword/>}/> */}
     
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contactus/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>

    </>
  );
}

export default App;