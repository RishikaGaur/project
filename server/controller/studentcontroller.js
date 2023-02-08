const db = require("../firebase");
const Student=db.collection("students")

const first=async(req,res)=>{
    try{
        const temp=await Student.get();
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
        const result=await Student.add({
            name:req.body.name,
            roll_no:req.body.roll,
            branch:req.body.branch,
            starting_date:req.body.start
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
        const result=await Student.doc(req.params.id).update({
            name:req.body.name,
            roll_no:req.body.roll,
            branch:req.body.branch,
            starting_date:req.body.start
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
        const temp=await Student.doc(req.params.id).delete();
        res.send("This record is deleted")

    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const fifth=async(req,res)=>{
    try{
        const temp=await Student.doc(req.params.id).get();
        const result=temp.data()
        res.send(result)
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message:err
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