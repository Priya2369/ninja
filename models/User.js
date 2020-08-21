const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'pleas enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter an password'],
        minlength: [6, ' minimum password length is 6 character']
    },
});

//fire a fuction after document saved to db 
//userSchema.post('save', (doc, next) => {
    //console.log('new user was created & saveed', doc);
    //next();
//});

//fire a function before  doc saved to db 
userSchema.pre('save',async function (next)  {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;