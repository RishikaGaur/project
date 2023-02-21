//get session token from req cookie
//find token in db
//check whether token exist in db
//also check expiry time 
//send username in res

const checkToken = (req, res, next) => {
    try {
        const token = req.session.id;
        console.log(token)
        // console.log(payload)
        const accessToken = Tokens.where("session_token", "==", token).get()
        // console.log(accessToken)
        const persons = []
        accessToken.forEach(doc => {
            persons.push(doc.data())
        })
        // console.log(persons)
        if (persons) {

            if (req.session.cookie.expires<=new Date()) {
                const user = persons[0].username
                console.log("welcome", user)
                next()
            }
        }
    } catch (error) {
        return res.send({
            validity: "Invalid or Expired Token"
        })

    }
}

module.exports = checkToken;