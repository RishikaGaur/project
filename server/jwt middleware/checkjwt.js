const jwt = require("jsonwebtoken")

//find token in db if return empty error
//check in db whether username is same 

const checkToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const payload = jwt.verify(token, process.env.JWT_KEY)
        if (payload) {
            console.log(payload)
            const accessToken = Tokens.where("access_token", "==", "token").get()
            const persons = []
            accessToken.forEach(doc => {
                persons.push(doc.data())
            })
            console.log(persons)
            if (persons) {
                if (persons[0].username == payload.username) {
                    res.send({
                        validity: true
                    })
                }
            }
        } else {
            throw err
        }

        next()
    } catch (err) {
        res.status(500).send({
            validity: false
        })
    }
}

module.exports = checkToken;