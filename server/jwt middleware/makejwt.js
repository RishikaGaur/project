const jwt=require("jsonwebtoken")

const generateToken=async(username)=>{
    try{
        
        const token=await jwt.sign({username},process.env.JWT_KEY,{expiresIn:1800});
        return {
            status:false,
            token
        }
    }catch(err){
        console.log(err);
        return {status:true}
    }
}

module.exports= generateToken