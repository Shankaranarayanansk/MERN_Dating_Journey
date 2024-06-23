const moongees = require('mongoose');

const validator = require('validator');

const userSchema = new moongees.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true , 
        unique: true,
        validate: (value) => {
            return validator.isEmail(value);
        },
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false,
    collection: 'user'
},
{
    timestamps: true,
}
);
let UserModel = moongees.model('user', userSchema); //userModel
module.exports = {UserModel}