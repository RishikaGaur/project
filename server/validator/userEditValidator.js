const {check, validationResult}= require("express-validator");

const editUser=[
check("firstname")
.notEmpty()
.trim(),

check("lastname")
.notEmpty()
.trim(),

check("gender")
.notEmpty()
.trim(),

check("dob")
.notEmpty()
.trim(),

check("country")
.notEmpty()
.trim(),

(req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    next();
}
];

module.exports= editUser;