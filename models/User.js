const mongoose= require("mongoose");

const UserSchema= new mongoose.Schema({
    username:{type: String, required:true, unique:true},
    companyName:{type:String},
    email:{type: String, required:true, unique:true},
    password:{type:String, required: true},
    Address:{type: String, required:true},
    ContactNo:{type: Number, required:true, unique:true,maxLength:11},
    status:{
        type: Boolean, 
        default:true
    },
    role:{type:String, enum:["Consumer","Contractor","Admin"],default:"Contractor",required:true},
    isAdmin:{
        type:Boolean,
        default:false
    },
},
 {timestamps:true}
 );


 module.exports=mongoose.model("User", UserSchema);
