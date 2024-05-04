const express = require('express');
const { logincontroll, registercontroll } = require('../../controller/authcontroller');
const Route = express.Router();


Route.post('/login',logincontroll);
Route.post('/signup',registercontroll);

 

module.exports=Route;