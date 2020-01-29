let express = require('express')
let router = express.Router()
let user = require('../models/auth')
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let {check,validationResult} = require('express-validator/check');

//create a user
router.post('/signup', [
    check('userName','Please enter a valid userName')
    .not()
    .isEmpty(),
    check("email",'Please enter a valid email').isEmail(),
    check('password','Please enter a valid password').isLength({
        min:8
    })
],
async(req,res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            erros: errors.array()
        });
    }

    let {
        firstName,
        lastName,
        email,
        phoneNumber,
        userName,
        password

    } = req.body;
    try{
        let User = await user.findOne({
            email
        });
        if(User){
            return res.satus(400).json({
                "messagge": "User already Exists"
            });
        }
     User = new user({
        firstName,
        lastName,
        email,
        phoneNumber,
        userName,
        password
    });
    let salt = await bcrypt.genSalt(10);
    User.password = await bcrypt.hash(password,salt);
    await user.save();
    let  payload = {
        User:{
            id: User.id
        }
    };
    jwt.sign(
        payload,
        'randomString', {
            expiresIn: 10000
        },
        (err,token) => {
            if(err) throw err;
            res.status(200).json({
                token
            });
        }
    );

} catch (err){
     console.log(err.mesage);
     res.status(500).send('Error in Saving');
}
 }
);
router.post(
    '/signin',
    [
        check('email', " Please enter a valid email").isEmail(),
        check('password', 'Please entwer a valid password').isLength({
            min: 8
        })
    
    ],
    async (req,res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.staus(400).json({
                errors: errors.array()
            });
        }
        let { email, password} = req.body;
        try{
            let User = await user.findOne({
                email
            });
            if(!User)
                return res.satus(400).json({
                    "messagge": "User dosent Exist"
                });
                let doMatch = await bcrypt.compare(password,User.password);
                if(!doMatch)
                return res.status(400).json({
                    message:"Incorrect Password!"
                });
                let payload = {
                    User: {
                        id: User.id
                    }
                };
                jwt.sign(
                    payload,'secret',{
                        expiresIn:3600
                    },
                    (err,token) => {
                        if(err) throw err;
                        res.status(200).json({
                            token
                        });
                    }
                );
        } catch (err){
            console.error(err);
            res.status(500).json({
                message : "Server Error"
            });
        }

    } 
)
module.exports = router;