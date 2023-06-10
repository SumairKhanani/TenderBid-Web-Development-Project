import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';

const UpdateUser = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [Cshow, setCShow] = useState(false);
  const [Ashow, setAShow] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [auth, setAuth] = useAuth();
//   const [bid, setBid] = useState('');
//   const [bids, setBids] = useState([]);
  const [username, setUsername] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [contactno, setContactNo] = useState('');
  const [role, setRole] = useState('');
  const [dshow, setDShow] = useState(true);

  useEffect(() => {
    if (auth.user.role === 'Contractor' || auth.user.role === 'Admin') {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (auth.user.role === 'Consumer' || auth.user.role === 'Admin') {
      setCShow(true);
    }
  }, []);

  useEffect(() => {
    if (auth.user.role === 'Admin') {
      setDShow(true);
    }
  }, []);

  const handleUpdate = async () => {
    const body = {
      username: username,
      companyName: companyName,
      email: email,
      Address: address,
      ContactNo: contactno,
    };
    const headers = {
      Authorization: `${auth.token}`,
    };
    try {
      const res = await axios.put(`/api/user/updateUser/${params.id}`, body, { headers });
      console.log(res);
      setDShow(true);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in updating the user');
    }
  };

  const getSingleUser = async () => {
    try {
      const headers = { Authorization: `${auth.token}` };
      const { data } = await axios.get(`/api/user/find/${params.id}`, { headers });
      console.log(data);
      setUser(data.user);
      console.log(data, 'hellooojoadjlojadkljlkad');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting the user');
    }
  };

  useEffect(() => {
    getSingleUser(user,"asdasdasdas");
  }, []);

//   const handleLowest = async () => {
//     const headers = {
//       Authorization: `${auth.token}`,
//     };
//     try {
//       const { data } = await axios.get(`/api/bid/lowest/${params.id}`, { headers });
//       console.log(data, 'MY DATAAA');
//       const mappedBids = data.map((item) => ({
//         amount: item.amount,
//         companyName: item.user.companyName,
//         username: item.user.username,
//         email: item.user.email,
//       }));
//       setBids(mappedBids);
//       setAShow(true);
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong in getting the lowest bids');
//     }
//   };

  useEffect(() => {
    console.log(user, 'Hellooo');
  }, [user]);

//   const handleBid = async () => {
//     const body = {
//       user: `${auth.user._id}`,
//       tender: `${params.id}`,
//       amount: `${bid}`,
//     };
//     const headers = {
//       Authorization: `${auth.token}`,
//     };
//     try {
//       const res = await axios.post(`/api/bid/createBid`, body, { headers });
//       console.log(res);
//       setShow(false);
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong in creating the bid');
//     }
//   };

  return (
    <Layout title="users">
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Single User</h1>
          <div className="row">
            <div className="col-md-6">
              <img
                style={{ width: '100%' }}
                src="/images/profilepic.png"
                className="card-img-top"
                alt={user.username}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">Username: {user.username}</h5>
                <p className="card-text">Company Name: {user.companyName}</p>
                <p className="card-text">Email: {user.email}</p>
                <p className="card-text">Address: {user.Address}</p>
                <p className="card-text">Contact No: {user.ContactNo}</p>
                <p className="card-text">Role: {user.role}</p>

                <div>
          
          </div>
              </div>
            </div>
          </div>
          {dshow && (
            <div className="update-user-container mt-4">
            <h2>Update User</h2>
              <input
                type="text"
                value={username}
                placeholder="Update Username"
                className="form-control mt-2"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                value={companyName}
                placeholder="Update Company Name"
                className="form-control mt-2"
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="email"
                value={email}
                placeholder="Update email"
                className="form-control mt-2"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                value={address}
                placeholder="Update Address"
                className="form-control mt-2"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="number"
                value={contactno}
                placeholder="Update Contact No"
                className="form-control mt-2"
                onChange={(e) => setContactNo(e.target.value)}
              />

              
              <NavLink to="/dashboard/admin/users">
                <button className="btn btn-primary mt-2" onClick={handleUpdate}>
                  Update User
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateUser;
