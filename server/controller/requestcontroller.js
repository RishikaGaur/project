const getPendingRequest=async(req,res)=>{
    const temp=await Requests.where("status","==","pending").get();
        const result=[];
        temp.forEach(doc=>{
            result.push({from: doc.data().from._path.segments[1],
            to: doc.data().to._path.segments[1] })
        })
        res.send(result)
}

const sendRequest=async(req,res)=>{
    try{
        const result=await Requests.add({
            from:User.doc(req.body.from),
            to:User.doc(req.body.to),
            status:"pending"
        });
        

        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.ACC,
              pass: process.env.PASS
            }
        });
    
        let message = {
            from: process.env.ACC,
            to: req.body.to,
            subject: "Friend Request",
            text: "You got a new friend request"
        }
        transport.sendMail(message, (err, info)=>{
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }
        })

        res.send("email sent")
        
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const acceptRequest=async(req,res)=>{
    //accept using id param
    try{

        const reqList=await Requests.doc(req.params.id).get()
        const persons=reqList.data()
        const from=persons.from._path.segments[1]
        const to=persons.to._path.segments[1]
        
        await User.doc(from).update({
            following_count:require('firebase-admin').firestore.FieldValue.increment(1),
            following:require('firebase-admin').firestore.FieldValue.arrayUnion(User.doc(to))
        })
        await User.doc(to).update({
            follower_count:require('firebase-admin').firestore.FieldValue.increment(1),
            followers:require('firebase-admin').firestore.FieldValue.arrayUnion(User.doc(from))
        })
        const result=await Requests.doc(req.params.id).update({
            status:"accept"
        })
        res.send(result)

    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const rejectRequest=async(req,res)=>{
    try{
        const result=await Requests.doc(req.params.id).update({
            status:"reject"
        })
        res.send(result)
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}


const removeFollower=async(req,res)=>{
    try{
        await User.doc(req.params.user).update({
            follower_count:require('firebase-admin').firestore.FieldValue.increment(-1),
            followers:require('firebase-admin').firestore.FieldValue.arrayRemove(User.doc(req.body.username))
        })

        await User.doc(req.body.username).update({
            following_count:require('firebase-admin').firestore.FieldValue.increment(-1),
            following:require('firebase-admin').firestore.FieldValue.arrayRemove(User.doc(req.params.user))
        })

        res.send("follower deleted")
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const removeFollowing=async(req,res)=>{
    try{
        await User.doc(req.body.username).update({
            follower_count:require('firebase-admin').firestore.FieldValue.increment(-1),
            followers:require('firebase-admin').firestore.FieldValue.arrayRemove(User.doc(req.params.user))
        })

        await User.doc(req.params.user).update({
            following_count:require('firebase-admin').firestore.FieldValue.increment(-1),
            following:require('firebase-admin').firestore.FieldValue.arrayRemove(User.doc(req.body.username))
        })

        res.send("follower deleted")
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}


module.exports={
    getPendingRequest,
    sendRequest,
    acceptRequest,
    rejectRequest,
    removeFollower,
    removeFollowing
}