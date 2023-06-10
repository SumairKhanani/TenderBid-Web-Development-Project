const express =require("express");
const app = express();
const mongoose=require("mongoose");
const dotenv= require("dotenv");
const userRoute=require("./routes/user")
const authRoute=require("./routes/auth")
const tenderRoute=require("./routes/tenderRoutes")
const bidRoute=require("./routes/bidRoutes")
const cors=require('cors');

dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(()=> console.log("DBconnection successfull!"))
.catch((err)=> {console.log(err);})

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/tender",tenderRoute);
app.use("/api/bid",bidRoute);

//app.use("/api/product",productRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running")
});