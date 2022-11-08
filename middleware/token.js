const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// require('dotenv').config();
// const jwtKEY = process.env.jwtKEY;
const jwtKEY = "fakharhussain"

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if ( !authorization ) {
        return res.status(401).send({error: "you must be Logged in From Admin!"})
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token, jwtKEY, async (err,payload) => {
        if (err) {
            return res.status(401).send({error: "you must be Logged in!"})
        }
        const {userId} = payload;
        const user = await User.findById(userId)
        req.user = user;
        next();
    })
}

