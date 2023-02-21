const bcrypt = require("bcrypt")
const salt = 10;
const generateJWT = require("../jwt middleware/makejwt")

const getUserProfile = async (req, res) => {
    try {
        const temp = await User.doc(req.params.username).get();
        const result = temp.data()
        const new_result = {
            firstname: result.firstname,
            lastname: result.lastname,
            gender: result.gender,
            dob: result.dob,
            country: result.country,
            followers: result.follower_count,
            following: result.following_count,
            posts: result.post_count
        }
        res.send(new_result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

//can also use User.doc().set({})

const registerUser = async (req, res) => {
    try {
        const checkUser = await User.doc(req.body.username).get()
        const result = checkUser.data()
        console.log(req.body)
        if (!result) {
            await bcrypt.hash(req.body.password, salt)
                .then(async (npass) => {
                    const output = await User.doc(req.body.username).set({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        gender: req.body.gender,
                        dob: new Date(req.body.dob),
                        country: req.body.country,
                        username: req.body.username,
                        password: npass,
                        following_count: 0,
                        follower_count: 0,
                        post_count: 0,
                        following: [],
                        followers: [],
                        posts: []

                    });
                    res.send(output);
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            res.send("Username already Registered")
        }

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}


//doc.id
//https://firebase.google.com/docs/firestore
//


const loginUser = async (req, res) => {
    try {

        const temp = await User.doc(req.body.username).get();
        const result = temp.data()
        if (result) {
            const correct = await bcrypt.compare(req.body.password, result.password);
            if (correct) {
                const { error, token } = await generateJWT(req.body.username);
                if (error) {
                    res.send("Not able to create access token")
                }

                const saveToken = await Tokens.doc(req.body.username).set({
                    username: req.body.username,
                    access_token: token
                });
                console.log(saveToken, token)
                res.send({
                    status: "valid user",
                    token: token
                })
            }
            else {
                res.send({
                    status: "wrong password"
                })
            }
        } else {
            res.send({
                status: "username does not exist"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

}

//search with username,crud posts,following and requests
const editUserProfile = async (req, res) => {
    try {
        const result = await User.doc(req.params.username).update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            dob: new Date(req.body.dob),
            country: req.body.country
        })
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const searchUser = async (req, res) => {
    try {
        const persons = []

        if (req.params.firstname == "@") {
            const result = await User.get()
            result.forEach(doc => {
                persons.push({
                    id: doc.id,
                    name: doc.data().firstname + " " + doc.data().lastname
                })
            })
        } else {
            const result = await User.where("firstname", "==", req.params.firstname).get()
            result.forEach(doc => {
                persons.push({
                    id: doc.id,
                    name: doc.data().firstname + " " + doc.data().lastname
                })
            })
        }

        res.send(persons)

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const logoutUser = async (req, res) => {
    try {
        res.send("Logout successfully")
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const getFollowers = async (req, res) => {
    try {
        const tem = await User.doc(req.params.username).get();
        const person = tem.data().followers;
        const idList = []
        person.forEach(ele => {
            idList.push(ele._path.segments[1])
        })


        const temp = await User.where(require('firebase-admin').firestore.FieldPath.documentId(), "in", idList).get();
        const result = [];
        temp.forEach(doc => {
            result.push({
                id: doc.id,
                name: doc.data().firstname + " " + doc.data().lastname
            })
        })
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const getFollowing = async (req, res) => {
    try {
        const tem = await User.doc(req.params.username).get();
        const person = tem.data().following;
        const idList = []
        person.forEach(ele => {
            idList.push(ele._path.segments[1])
        })


        const temp = await User.where(require('firebase-admin').firestore.FieldPath.documentId(), "in", idList).get();
        const result = [];
        temp.forEach(doc => {
            result.push({
                id: doc.id,
                name: doc.data().firstname + " " + doc.data().lastname
            })
        })
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}


module.exports = {
    getUserProfile,
    registerUser,
    loginUser,
    editUserProfile,
    searchUser,
    logoutUser,
    getFollowers,
    getFollowing
}