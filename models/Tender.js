//const { isNumber } = require("@hapi/joi/lib/common");
const mongoose = require("mongoose");
//const Consumer = require("./Consumer");


const tenderSchema = new mongoose.Schema({
    user:{
        type:mongoose.ObjectId,
        ref:"User",
        required:true
    },
    categories: { 
            type: String, 
            enum: ['Construction', 'Software', 'Education'], 
            required: false },
    title:{
        type: String, 
        required: true
    },
   
    details:{
        type: String, 
        required: true
    },
    budget:{
        type: Number, 
        required: true
    },
    status:{
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        required: false,
        default:"ACTIVE"
      }
   },
{timestamps:true}
);

module.exports = mongoose.model("Tender", tenderSchema);