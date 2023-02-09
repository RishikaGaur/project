const db = require("../firebase");
const Posts=db.collection("posts")

const first=async(req,res)=>{
    try{
        const temp=await Posts.where("username", "==", req.params.id).get();
        const result=[];
        temp.forEach(doc=>{
            result.push(doc.data())
        })
        res.send(result)
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const second=async(req,res)=>{
    try{
        console.log(req.body);
        const result=await Posts.add({
            username:req.body.username,
            caption:req.body.caption,
            content:req.body.content
        });
        
        res.send(result)
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const third=async(req,res)=>{
    try{
        const result=await Posts.doc(req.params.id).update({
            caption:req.body.caption,
            content:req.body.content
        });

        res.send(result)
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const fourth=async(req,res)=>{
    try{
        const temp=await Posts.doc(req.params.id).delete();
        res.send("This record is deleted")

    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}


module.exports={
    first,
    second,
    third,
    fourth
}