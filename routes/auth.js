const router = require("express").Router();
const User= require("../models/User");
const cryptoJs=require("crypto-js");
const jwt=require("jsonwebtoken");
const { verifyTokenAndAdmin, verifyTokenConsumerORAdmin,verifyTokenContractorORAdmin, verifyToken } = require("./verifyToken");

//REGISTER
router.post("/register",async(req,res)=>
{
     const newUser= new User({
        username: req.body.username,
        companyName:req.body.companyName,
        email:req.body.email,
        password:cryptoJs.AES.encrypt( 
            req.body.password,process.env.Pass_sec)
            .toString(),
        Address:req.body.Address,
        ContactNo:req.body.ContactNo,
        role:req.body.role
     })
     try{
        const savedUser= await newUser.save()
        res.status(201).json({
         success:true,
         message:"User Registered successfully",
         savedUser})
        } catch(err){
          return res.status(500).json({
            success:false,
            err});
        }
   });

     
//LOGIN
router.post("/login",async (req,res)=>
{
    try
    {
     const user=await User
     .findOne({email:req.body.email});
     !user && res.status(401).json(
        {   
         success:false,
         message:"wrong credentials"
      });

     const hashedPassword=cryptoJs.AES
     .decrypt(user.password,process.env.Pass_sec);
     
     const Originalpassword =hashedPassword.toString(cryptoJs.enc.Utf8);
     
     Originalpassword !==req.body.password &&
    res.status(401).send({   
      success:false,
      message:"wrong credentials"
   });

        const accessToken=jwt.sign({
            id:user._id,
            role:user.role,
            isAdmin:user.isAdmin,
        }, process.env.JWT_SEC,
        {expiresIn:"3d"}
        );

     const {password, ...others}=user._doc;
     res.status(200).json({
      success:true,
      message:"Login succesfully!",
      user,
      accessToken});
    
    }catch(err)
    {
        return res.status(500).json({   
         success:false,
         err
      });
    }
})
router.get("/admin-auth",verifyTokenAndAdmin,async(req,res)=>{
   res.status(200).send({ok:true})
})
router.get("/consumer-auth",verifyTokenConsumerORAdmin,async(req,res)=>{
   res.status(200).send({ok:true})
})
router.get("/contractor-auth",verifyTokenContractorORAdmin,async(req,res)=>{
   res.status(200).send({ok:true})
})
router.get("/signedIn",verifyToken,async(req,res)=>{
   res.status(200).send({ok:true})
})
//decoding token
router.get("/user/me",verifyToken,async(req,res,next)=>{
   try {
      const decode=jwt.verify(
         req.headers.authorization,
         process.env.JWT_SEC);

         const user=decode.id
 res.status(200).send({
   success:true,
   decode,
   user
 })
   } catch (error) {
      console.log(error)
   }
})

module.exports=router