const {check, validationResult}= require("express-validator");

const validateUser=[
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
.trim()
.isISO8601()
.toDate()
.withMessage("Invalid day received"),

check("country")
.notEmpty()
.trim(),


check('username')
.notEmpty()
.trim()
.isEmail(),

check('password')
.isLength({ min: 6 })
.withMessage("Password must have atleast 6 characters"),

(req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    next();
}
];

module.exports= validateUser;