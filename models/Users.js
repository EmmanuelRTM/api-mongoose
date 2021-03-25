const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:String,//shorthand
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    age:{
        type:Number,
        default: 0
    },
    gender: {
        type:String,
        enum:['M','F','O']
    },
    birth_date: Date,
    photo:{
        type:String
       // match:/ / regex
    },
    otro_campo:{
        type:String
    }
},{timestamps:true})

//convertir a modelo

const users= mongoose.model('users',UserSchema)

module.exports = users;