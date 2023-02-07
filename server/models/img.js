const mongoose=require("mongoose")
const schema=mongoose.Schema

const imageSchema=new schema({
    image:{
        data:Buffer,
        contentType:String
    }
})

module.exports=mongoose.model("Image",imageSchema,"images")