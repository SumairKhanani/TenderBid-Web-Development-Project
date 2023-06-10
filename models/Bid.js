//const { isNumber } = require("@hapi/joi/lib/common");
const mongoose = require("mongoose")
//const Tender = require("./Tender");

//Schema
const bidSchema =new  mongoose.Schema( {
     user:{
        type: mongoose.ObjectId, 
        ref:"User",
        required: true
    },
    tender:{
        type: mongoose.ObjectId, 
        ref:"Tender",
        required: true

    },
    amount:{
        type: Number, 
        required: true
    }
    
},
{timestamps:true}
)

module.exports = mongoose.model("Bid", bidSchema)