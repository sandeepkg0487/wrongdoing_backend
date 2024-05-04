const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { generateJWT } = require('../../controller/jwt');
const { adminmodel } = require('../../models/userschema');

const adminlogincontroll = async (req, res, next) => {
    const { email, password } = req.body;
    console.log('hi iam login');
    console.log(req.body)
    try {

        //FETCHING USER DATA FROM DB
        const user = await adminmodel.findOne({ email })
        console.log("userfind for checking:", user);

        //USERNAME VALIDATION
        if (!user) {
            return res
                .status(400)
                .send({
                    message: "Usaer name does not match",

                });
        }

        //PASSWORD VALIDATION
        const passwordmatch = await bcrypt.compare(password, user.password)
        console.log('is password match :', passwordmatch);
        if (!passwordmatch) {
            console.log('passworddoesent match');
            return res.status(400)
                .send({
                    message: "Password does not match",

                });
        }
        console.log('generating token');
        // generete tocken
        const payload = {
            userId: user._id,
            email: user.email,
        };

        const accessToken = generateJWT(payload)
        console.log("accessToken111:", accessToken);
       
        //SEND RESPONSE
        res
            .status(200)
            .json({
                message: "Login Successful",
                status: 'success',
                email: user.email,
                accessToken,
                
            });

    } catch (err) {
        console.log('error happen in login authcontroll.js'.err);
    }

}





module.exports = { adminlogincontroll };

