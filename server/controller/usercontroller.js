const User=require("../models/user")
const bcrypt=require("bcrypt")

const salt=10;

const method1=(req,res)=>{
    res.send("welcome");

}

const method2= async(req,res)=>{
    try{
        console.log(req.body)
        await bcrypt.hash(req.body.password,salt)
        .then(async(npass)=>{
            const output=await User.create({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                username:req.body.username,
                password:npass,
            });
            res.send(output);
        }).catch((err)=>{
            console.log(err);
        })
        
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

const method3=async(req,res)=>{
    try{
        const person=await User.findOne({username:req.body.username});
        console.log(person);
        if(person){
            const correct=await bcrypt.compare(req.body.password,person.password);
            if(correct){
                res.send("valid user")
            }
            else{
                res.send("wrong password")
            }
        }else{
            res.send("username does not exist")
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

}



module.exports={
    method1,
    method2,
    method3
}


//packetriot for external api
//pktriot http 3000