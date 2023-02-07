const express=require("express")
const path = require('path');
const fs = require("fs")
const imgRouter=express.Router()
const image=require("../models/img")
const multer=require("multer")


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/public');
     },
    filename: function (req, file, cb) {
        let filename = 'filenametogive';
        req.body.file = filename
        cb(null , filename);
    }
});
var upload = multer({ storage: storage })

imgRouter.post("/",upload.single("myFile"),(req,res)=>{

    console.log(req.file)

//     image.create({
//         image:{
//             data:fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType:"image/jpg"
//         }
//     },(ans,err)=>{
//         if(err){
//             res.send(err)
//         }
//         res.send(ans)
//     })
})

imgRouter.get("/",(req,res)=>{

})

module.exports=imgRouter