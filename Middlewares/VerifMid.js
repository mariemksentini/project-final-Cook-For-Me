const { body ,validationResult } = require('express-validator');

exports.VerifSignUp = [
    body('name', 'Is not a valid name').isLength({min : 2}),
    body('age', 'Your age must be over 10 years old').isInt({min : 10}),
    body('email', 'Is not a valid email').isEmail(),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=(.*\d){3,})(?=(.*[\W_]){1,}).*$/)
        .withMessage('Password must contain at least 3 numbers and 1 special character'),
    body('address.zipCode', 'Zip code must be a number').isInt({min : 1000}),
    body('address.houseNum', 'House number must be a number').isInt({min : 1}),
]

exports.VerifSignIn= [
    body('email','Is not a valid email').isEmail()
]

exports.Validation=(req,res,next)=>{
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res.status(400).send(result)
    }

    next()
}