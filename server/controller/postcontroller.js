const db = require("../firebase");
const Posts=db.collection("posts")
const User=db.collection("users")


const first=async(req,res)=>{
    try{
        const tem=await User.doc(req.params.id).get();
        const person=tem.data().posts;
        const idList=[]
        person.forEach(ele=>{
            idList.push(ele._path.segments[1])
        })
        
        console.log(idList)

        const temp=await Posts.where(require('firebase-admin').firestore.FieldPath.documentId(),"in",idList).get();
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
        const postId=req.params.id;
        console.log(postId)
        const update_result= await User.where("posts",'array-contains',Posts.doc(postId)).get()
        const persons=[]
        update_result.forEach(doc=>{
            persons.push(doc.data().username)
        })
        console.log(persons[0])
        
        await User.doc(persons[0]).update({
            post_count:require('firebase-admin').firestore.FieldValue.increment(-1),
            posts:require('firebase-admin').firestore.FieldValue.arrayRemove(Posts.doc(postId))
        })

        await Posts.doc(postId).delete();

        res.send("post deleted")

    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const fifth=async(req,res)=>{
    try{
        const temp=await Posts.limit(20).get();
        const result=[];
        temp.forEach(doc=>{
            result.push(doc.data())
        })
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