const bcrypt=require("bcrypt")
const db = require("../firebase");
const User=db.collection("users")

const salt=10;

const method1=async(req,res)=>{
    try{
        const temp=await User.doc(req.params.id).get();
        const result=temp.data()
        const new_result={
            firstname:result.firstname,
            lastname:result.lastname,
            gender:result.gender,
            dob:result.dob,
            country:result.country,
            followers:result.follower_count,
            following:result.following_count,
            posts:result.post_count
        }
        res.send(new_result)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

//can also use User.doc().set({})

const method2= async(req,res)=>{
    try{
        console.log(req.body)
        await bcrypt.hash(req.body.password,salt)
        .then(async(npass)=>{
            const output=await User.doc(req.body.username).set({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                gender:req.body.gender,
                dob:new Date(req.body.dob),
                country:req.body.country,
                username:req.body.username,
                password:npass,
                following_count:0,
                follower_count:0,
                post_count:0,
                following:[],
                followers:[],
                posts:[]

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


//doc.id
//https://firebase.google.com/docs/firestore
//


const method3=async(req,res)=>{
    try{

        const temp=await User.doc(req.body.username).get();
        const result=temp.data()
            if(result){
                const correct=await bcrypt.compare(req.body.password,result.password);
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

//search with username,crud posts,following and requests
const method4=async(req,res)=>{
    try{
        const result=await User.doc(req.params.id).update({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            gender:req.body.gender,
            dob:new Date(req.body.dob),
            country:req.body.country
        })
        res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

const method5=async(req,res)=>{
    try{
        const result=await User.where("firstname","==",req.params.id).get()
        const persons=[]
        result.forEach(doc=>{
            persons.push({
            name:doc.data().firstname+" "+doc.data().lastname
            })
        })
        
        res.send(persons)

    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

const method6=async(req,res)=>{
    req.logout()
    res.redirect("/")
}


module.exports={
    method1,
    method2,
    method3,
    method4,
    method5,
    method6
}