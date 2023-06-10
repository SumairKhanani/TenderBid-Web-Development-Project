const jwt=  require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader)
    {jwt.verify(authHeader,process.env.JWT_SEC,(err,user)=>
{
     if(err) res.status(403).json("token is not Valid!");
     req.user=user;
     next();
});
    }else{
        return res.status(401).json("you are not authenticated!");
    }
};
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin)
        {
            next();
        }else{
           return res.status(403).json("you are not allowed to do that!");
        }
    });
};
const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin)
        {
            next();
        }else{
          return  res.status(403).json("you are not allowed to do that!");
        }
    });
};
const verifyTokenAndConsumer = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.role=="Consumer")
        {
            next();
        }else{
        return  res.status(403).json("you are not allowed to do that!");
        }
    });
};
const verifyTokenAndConcontrator = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.role=="Contractor")
        {
            next();
        }else{
           return res.status(403).json("you are not allowed to do that!");
        }
    });
};
const verifyTokenConsumerORAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin || req.user.role == "Consumer")
        {
            next();
        }else{
           return res.status(403).json("you are not allowed to do that!");
        }
    });
};
const verifyTokenContractorORAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin || req.user.role == "Contractor")
        {
            next();
        }else{
            return res.status(403).json("you are not allowed to do that!");
        }
    });
};
module.exports={ verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyTokenAndConcontrator,verifyTokenAndConsumer,verifyTokenContractorORAdmin,verifyTokenConsumerORAdmin};