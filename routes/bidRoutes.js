const router = require("express").Router();
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin,verifyTokenAndConcontrator,verifyTokenAndConsumer,verifyTokenConsumerORAdmin, verifyTokenContractorORAdmin}=require("./verifyToken")
const Bid = require("../models/Bid");

//CREATE Bid
router.post("/createBid",verifyTokenContractorORAdmin, async (req,res)=>
{
    try{
    const newBid = new Bid(req.body);
        const savedBid=await newBid.save();
        res.status(200).json(savedBid);
    }catch(err)
    {
        return res.status(500).json(err);
    }

});




//UPDATE bid
router.put("/updateBid/:id",verifyTokenAndAdmin,async(req,res)=>
    {
    try{
        const UpdatedBit= await Bid.findByIdAndUpdate(req.params.id,
            {  $set:req.body},
        {
            new:true
        });
        res.status(200).json(
            {  success:true,
                UpdatedBit
            });
 
    } 
      catch(err){
        return res.status(500).json({
            success:false,
            err
        });
    }
});


//DELETE HARD bid

router.delete("/deleteBid/:id",verifyTokenAndAdmin,async(req,res)=>
{
    try{
        await Bid.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Bid has been deleted",
            success:true
        })
    }catch(err)
    {
        return  res.status(500).json(
            {
                success:false,
                err
            });
    }
});


router.get("/UserBid/:id",verifyTokenContractorORAdmin,async(req,res)=>
{
    try{
       const bid= await Bid.find({user:req.params.id})
       .populate("user").populate("tender")
       res.status(200).json({
        success:true,
        bid
       });
      
    }catch(err)
    {
        return res.status(500).json(err);
    }
});

//GET one bid


router.get("/findBid/:id",verifyTokenContractorORAdmin,async(req,res)=>
{
    try{
       const bid= await Bid.findById(req.params.id)
       .populate("user").populate("tender")
       res.status(200).json({
        success:true,
        bid
       });
      
    }catch(err)
    {
        return  res.status(500).json(err);
    }
});

//get all bids
router.get("/getBids",verifyTokenAndAdmin, async(req,res)=>
{
    try{
        const bids= await Bid.find({})
        .populate("user").populate("tender")
        .limit(12)
        .sort({createdAt:-1});
       res.status(200).json(
        { 
            success:true,
            countTotal:bids.length,
            bids
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
// API endpoint to get the lowest three bids
router.get('/lowest/:id', verifyTokenConsumerORAdmin, async (req, res) => {
    try {
      // Find the three bids with the lowest amounts
      
      const lowestBids = await Bid.find(
        {tender:req.params.id})
        .populate("user")
        .sort({ amount: 1 }) // Sort by ascending order of Amount
        .limit(3); // Limit the result to three bids
  
      res.json(lowestBids);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
//get all bids on each tender
router.get("/tenderBid/:tid",verifyTokenAndAdmin ,async(req,res)=>
{
    try {
        const { tid } = req.params;
        const bids = await Bid
          .find({
            tender: tid
          })
          .limit(15)
          .populate("user")
          .populate("tender")
        res.status(200).send({
          totalcount: bids.length,
          success: true,
          bids,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "error while geting related bids",
          error,
        });
      }
});





module.exports=router;