let mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')
let bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
      firstName:{
          type:String,
          required: true
         
      },
      lastName:{ 
        type:String,
        required: true
       
      },

      email:{ 
        type:String,
        required: true,
        minlength:5,
        maxlength:255,
        unique: true
      },
      phoneNumber:{ 
        type:String,
        required: true
      },
      userName:{ 
        type:String,
        required: true,
        unique:true,
        minlength:5,
        maxlength:55
      },
      
      password:{ 
        type:String,
        required: true,
        minlength:8,
        maxlength: 1024
      }


})

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(next){
  let user = this;
  if(!user.isModified('password')){
    return next();
  }

  bcrypt
         .genSalt(12)
         .then((salt) => {
           return bcrypt.hash(user.password,salt);
         })
         .then((hash) => {
           user.password = hash;
           next();
         })
         .catch((err) => next(err));
})
;


module.exports = mongoose.model('User', userSchema)
