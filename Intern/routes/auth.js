let express = require('express')
let User = require('../models/auth')
let router = express.Router()
let authorize = require('../middleware/authen')
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let { check, validationResult } = require('express-validator');

router.post("/signup",
[     check('firstName')
        .not()
       .isEmpty(),
    check('lastName')
       .not()
       .isEmpty(),
    check('email', 'Email is required')
       .not()
       .isEmpty(),
       check('phoneNumber', 'phoneNumber is required')
       .not()
       .isEmpty(),
    check('userName')
        .not()
        .isEmpty()
        .isLength({ min: 5 })
        .withMessage('userName must be atleast 5 characters long'),
   
    check('password', 'Password should be atleast  8 characters long')
        .not()
        .isEmpty()
        .isLength({ min: 8, max: 1024 })
],
 (req, res, next) => {
     let  errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    else {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        let user = new User ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            userName: req.body.userName,
            password: hash
        });
        user.save().then((response) => {
            res.status(201).json({
                
                message: "User created Sucessfully!",
                result: response
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
    });
    }
});

router.post("/signin", (req, res, next) => {
    let getUser;
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }

        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});
// Get Users
router.route('/').get((req, res) => {
    User.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})
//update User
router.route('/update-user/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
})

// Get User Profile
router.route('/user-profile/:id').get(authorize, (req, res, next) => {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;