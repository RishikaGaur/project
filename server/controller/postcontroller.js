const db = require("../firebase");
const Posts=db.collection("posts")
const User=db.collection("users")


const first=async(req,res)=>{
    try{
        const temp=await User.doc(req.params.id).get();
        const result=temp.data().posts;
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
        await Posts.add({
            caption:req.body.caption,
            content:req.body.content
        }).then(async(result)=>{
        const update_result= await User.doc(req.params.id).update({
            post_count:require('firebase-admin').firestore.FieldValue.increment(1),
            posts:require('firebase-admin').firestore.FieldValue.arrayUnion(Posts.doc(result.id))
        })
        
        res.send(update_result)
        }).catch((err)=>{
            throw err
        })
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


        const update_result= await User.doc(req.params.id).update({
            post_count:require('firebase-admin').firestore.FieldValue.increment(1),
            posts:require('firebase-admin').firestore.FieldValue.arrayUnion(Posts.doc(result.id))
        })

        res.send(update_result)

    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const fifth=async(req,res)=>{
    try{
        const temp=await Posts.get();
        const result=[];
        temp.forEach(doc=>{
            result.push(doc.data())
        })
        shuffle(result)
        res.send(result)

    }catch(err){
        res.status(500).send({
            status:"failure",
            message:err
        })
    }
    
}


module.exports={
    first,
    second,
    third,
    fourth,
    fifth
}