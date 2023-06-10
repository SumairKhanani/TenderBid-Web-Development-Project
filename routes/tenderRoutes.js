const router = require("express").Router();
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin,verifyTokenAndConcontrator,verifyTokenAndConsumer,verifyTokenConsumerORAdmin, verifyTokenContractorORAdmin}=require("./verifyToken")
//const User = require("../models/User");
const Tender = require("../models/Tender");

//CREATE tender
router.post("/createTender",verifyTokenConsumerORAdmin, async (req,res)=>
{
    const newTender = new Tender(req.body)
    try{
        const savedTender=await newTender.save();
        res.status(200).json(
            {
                success:true,
                savedTender});
    }catch(err)
    {
       return res.status(500).json({success:false,err});
    }
});




//UPDATE tender
router.put("/updateTender/:id",verifyTokenConsumerORAdmin,async(req,res)=>
    {
    try{
        const updatedTender= await Tender.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },
        {
            new:true
        });
        res.status(200).json({
            success:true,
            updatedTender});
 
    } 
      catch(err){
        return (res.status(500).json({success:false,err}));
    }
});

//UPDATE tender status
router.put("/updateTenderStatus/:id",verifyTokenConsumerORAdmin,async(req,res)=>
    {
    try{
        const updatedTender= await Tender.findByIdAndUpdate(req.params.id,{status:"INACTIVE"},
        {
            new:true
        });
        res.status(200).json({
            success:true,
            message:"Tender Is Now Inactive",
            updatedTender});
 
    } 
      catch(err){
        return (res.status(500).json({success:false,err}));
    }
});

router.get("/getTenderStatus/:id",verifyTokenContractorORAdmin,async(req,res)=>{
  try {
    const tender= await 
    Tender.findById(req.params.id)
    res.status(200).json(
      {success:true,
     status:tender.status});
  } catch (error) {
    return( res.status(500).json({success:false,err}));
  }
})


//DELETE HARD tender

router.delete("/deleteTender/:id",verifyTokenConsumerORAdmin,async(req,res)=>
{
    try{
        await Tender.findByIdAndDelete(req.params.id)
        res.status(200).json({
          message:"TENDER has been deleted",
        success:true})
    }catch(err)
    {
        return res.status(500).json(err);
    }
});

//GET one tender


router.get("/find/:id",verifyToken,async(req,res)=>
{
    try{
       const tender= await 
       Tender.findById(req.params.id).populate("user")
       res.status(200).json({success:true,tender});
      
    }catch(err)
    {
       return( res.status(500).json({success:false,err}));
    }
});

//get all tenders
router.get("/getTender",verifyToken ,async(req,res)=>
{
    try{
        const tenders= await Tender.find({})
        .populate("user")
        .limit(12)
        .sort({createdAt:-1});
       res.status(200).json(
        { 
            success:true,
            countTotal:tenders.length,
            tenders
         });
      
    }catch(err)
    {
        return res.status(500).json(
        {
            success:false,
            err
        });
    }
});
//get all tenders from one user
router.get("/userTender/:uid",verifyTokenConsumerORAdmin ,async(req,res)=>
{
    try {
        const { tid, uid } = req.params;
        const tenders = await Tender
          .find({
            user: uid,
          })
          .limit(3)
          .populate("user");
        res.status(200).send({
          success: true,
          tenders,
        });
      } catch (error) {
        console.log(error);
       return  res.status(500).json({
          success: false,
          message: "error while geting relate tenders",
          error,
        });
      }
});

// GET products by category
router.get("/getTenders/:category",verifyToken ,async (req, res) => {
  try {
    const category = req.params.category;
    const tender = await Tender.find({ categories: category }).populate("user")
    res.status(200).json({
        success:true,
        tender});
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve tenders" });
  }
});



//getting all the categories 
router.get("/categories",verifyToken ,async (req, res) => {
    try {
      const categories = await Tender.distinct("categories");
      res.json(categories);
    } catch (error) {
     return res.status(500).json({ error: "Failed to retrieve categories" });
    }
  });

  //GET tenders by category for each user
router.get("/getTenders/:category/:uid",verifyToken ,async (req, res) => {
  try {
    const category = req.params.category;
    const uid = req.params.uid;
    const tender = await Tender.find({ categories: category, user: uid }).populate("user")
    res.status(200).json({
        success:true,
        tender});
  } catch (error) {
  return  res.status(500).json({ error: "Failed to retrieve tenders" });
  }
});





module.exports=router;