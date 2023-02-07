const jwt=require("jsonwebtoken")

const one=(req,res)=>{
    let token;
    try{
        token=jwt.sign({username:req.body.username},"secretkeyoftoken",{expiresIn:"1h"});
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
    res.status(201).json({
        status:"success",
        data:{
            username:req.body.username,
            token:token
        }
    })
}

const two=(req,res)=>{
    try{
        const tokn=req.headers.authorization.split(' ')[1]; 

        const payload=jwt.verify(tokn,"secretkeyoftoken")
        if(payload){
            res.send({
                status:"success",
                username:payload.username})
        }else{
            res.send("invalid token")
        }

    }catch(err){
        res.status(500).send(err)
    }
}


module.exports={
    one,
    two
}
