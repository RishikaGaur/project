const mongoose=require("mongoose")
const schema=mongoose.Schema

const studentSchema=new schema({
    name:{
        type:String,
        required:[true,"This field is empty"]
    },
    roll_no:{
        type:String,
        required:true,
        unique:true
    },
    branch:{
        type:String,
        required:true
    },
    starting_date: {
        type:Date,
        //default:Date.now
        required:true
    }

},{
    collection:"student_info"
}
)


studentSchema.path("starting_date").validate((v)=>{
    return v<=Date.now()
},"Enter a valid starting date")

studentSchema.pre("save",(next)=>{
    console.log("pre hook will execute as soon as create occurs")
    next()
})


studentSchema.post("save",(doc,next)=>{
    console.log("post hook will execute after new document is added and also after pre hook ")
    next()
})

module.exports = mongoose.model("student",studentSchema)


//enum, path for validation in schema

//  name:{
//     type:String,
//     validate:[fn,"error"]  
// }

// const fn=(v)=>{
//     return v.length>5
// }

//---------------------------------------------------

// field:[Schema.Types.ObjectId]
// field:Schema.Types.mixed
//virtual
//pre save,post save
//error handler,ok
//methods,instance
//storing file as binary

//----------------------------------------------------

// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String
// })
  
// const postSchema = new mongoose.Schema({
//     title: String,
//     postedBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     }
// })
  
// const User = mongoose.model('User', userSchema);
// const Post = mongoose.model('Post', postSchema);
  
// Post.find().populate("postedBy")
//     .then(p => console.log(p))
//     .catch(error => console.log(error));

//-----------------------------------------------------

// PersonSchema
// .virtual('name.full')
// .get(function () {
//   return this.name.first + ' ' + this.name.last;
// });

//--------------------------------------------------

//aggregate: sort,project,match,limit,group,lookup,out,addfield,facet,unionWith


