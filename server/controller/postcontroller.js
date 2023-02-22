const getUserPost = async (req, res) => {
    try {
        const tem = await User.doc(req.params.username).get();
        const person = tem.data().posts;
        const idList = []
        person.forEach(ele => {
            idList.push(ele._path.segments[1])
        })

        const temp = await Posts.where(require('firebase-admin').firestore.FieldPath.documentId(), "in", idList).get();
        const result = [];
        temp.forEach(doc => {
            result.push({
                id: doc.id,
                caption: doc.data().caption,
                content: doc.data().content
            })
        })
        res.send(result)

    } catch (err) {
        res.status(500).json({
            status: "failure",
            error_message: err
        })
    }
}

const createPost = async (req, res) => {
    try {
        const result = await Posts.add({
            caption: req.body.caption,
            content: req.body.content,
            like_count:0,
            comment_count:0,
            likes:[],
            comments:[]
        })
        const update_result = await User.doc(req.params.username).update({
            post_count: require('firebase-admin').firestore.FieldValue.increment(1),
            posts: require('firebase-admin').firestore.FieldValue.arrayUnion(Posts.doc(result.id))
        })
        res.send(update_result)
    } catch (err) {
        res.status(500).json({
            status: "failure",
            error_message: err
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const result = await Posts.doc(req.params.id).update({
            caption: req.body.caption,
            content: req.body.content
        });

        res.send(result)
    } catch (err) {
        res.status(500).json({
            status: "failure",
            error_message: err
        })
    }
}

const delPost = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId)
        const update_result = await User.where("posts", 'array-contains', Posts.doc(postId)).get()
        const persons = []
        update_result.forEach(doc => {
            persons.push(doc.data().username)
        })
        console.log(persons[0])

        const userPostUpdate = await User.doc(persons[0]).update({
            post_count: require('firebase-admin').firestore.FieldValue.increment(-1),
            posts: require('firebase-admin').firestore.FieldValue.arrayRemove(Posts.doc(postId))
        })

        const postDel = await Posts.doc(postId).delete();

        res.send(postDel)

    } catch (err) {
        res.status(500).json({
            status: "failure",
            error_message: err
        })
    }
}

const getAllPost = async (req, res) => {
    try {
        const temp = await Posts.limit(20).get();
        const result = [];
        temp.forEach(doc => {
            result.push({
                id:doc.id,
                caption:doc.data().caption,
                content:doc.data().content,
                likes:doc.data().like_count,
                comments:doc.data().comment_count
            })
        })
        res.send(result)

    } catch (err) {
        res.status(500).send({
            status: "failure",
            message: err
        })
    }

}

const likePost=async(req,res)=>{
//id as params and user as body
try{
    const result= await Posts.doc(req.params.id).update({
        like_count: require('firebase-admin').firestore.FieldValue.increment(1),
        likes: require('firebase-admin').firestore.FieldValue.arrayUnion(User.doc(req.body.username))
    })
    res.send(result)
}catch(err){
    res.status(500).send({
        status:"failure",
        message:err
    })
}


}
const commentPost=async(req,res)=>{
    try{
        const result= await Posts.doc(req.params.id).update({
            comment_count: require('firebase-admin').firestore.FieldValue.increment(1),
            comments: require('firebase-admin').firestore.FieldValue.arrayUnion({
                user:User.doc(req.body.username),
                section:req.body.section
            })
        })
        res.send(result)
    }catch(err){
        res.status(500).send({
            status:"failure",
            message:err
        })
    }
}

module.exports = {
    getUserPost,
    createPost,
    updatePost,
    delPost,
    getAllPost,
    likePost,
    commentPost
}