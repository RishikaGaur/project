const jwt = require("jsonwebtoken")

//find token in db if return empty error
//check in db whether username is same 

const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const payload = await jwt.verify(token, process.env.JWT_KEY)
        if (payload) {
            // console.log(payload)
            const accessToken = await Tokens.where("access_token", "==", token).get()
            // console.log(accessToken)
            const persons = []
            accessToken.forEach(doc => {
                persons.push(doc.data())
            })
            // console.log(persons)
            if (persons) {
                if (persons[0].username == payload.username) {
                    next()
                }
            }
        }
    }catch (error) {
    // console.log(error)
    if (error.name == "TokenExpiredError") {
        return res.send({
            validity: "Invalid or Expired Token"
        })
    }
}
}

module.exports = checkToken;