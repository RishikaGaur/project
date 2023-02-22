const jwt = require("jsonwebtoken")

//find token in db if return empty error
//check in db whether username is same 

const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            const payload = await jwt.verify(token, process.env.JWT_KEY)
            if (payload) {
                console.log("welcome", payload.username)
                next()
            }
        }
    } catch (error) {
        // console.log(error)
        if (error.name == "TokenExpiredError") {
            res.send({
                validity: "Invalid or Expired Token"
            })
        }
    }
}

module.exports = checkToken;