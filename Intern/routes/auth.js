let express = require('express')
let User = require('../models/auth')
let router = express.Router()
let authorize = require('../middleware/authen')
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');


router.post("/signup",(req, res, next) => {
    User.find({
        email: req.body.email
    })
    .exec()
    .then(user =>{
        if(user.length >= 1){
            return res.status((409)).json({
                message: " email exists"
            })
        } else {
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if(err) {
                    return res.status(500).json({
                        error:err
                    });
                } else{
            
            let user = new User ({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                userName: req.body.userName,
                password: hash
            });
            user.save()
            .then(result =>{
                console.log(result);
                res.status(500).json({
                    message: 'User created'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
                }
            });
        }
    })
 
});
    
//login
router.post('/signin', (req,res,next) =>{
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'Authentication Failed!'
            })
        }
        bcrypt.compare(req.body.password, user[0].password,(err,res)=> {
            if(err){
                return res.status(401).json({
                    message: 'Authentication Failed!'
            })
        }
        if(user){
          let token =  jwt.sign(
            {
                email:user[0].email
            },
            "randomString",
            
            
            {
                expiresIn: "1h"
            }
            );
            return res.status(200).json({
                message: 'Authentication succesfull!',
                token: token
        });
        }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
})







module.exports = router;