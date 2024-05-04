const { mongoose, Schema, model, Model } = require('mongoose');
const bcrypt = require('bcrypt');


const userschema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    phone: {
        type: String,
        require: true
    },


})
const userModel = model('users', userschema);



const messageSchema = new Schema({
    
        wrong: {
            type: String,
        },
        desc: {
            type: String,
        },
        date: {
            type: String,
        },
        loac: {
            type: String,
        },
        resolveStatus:{
            type:Boolean
        } ,
  
 
})
const messageModel = model('message', messageSchema)



const adminschema = new Schema({
   
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    

})
const adminmodel = model('admin', adminschema);


module.exports = { messageModel, userModel ,adminmodel}