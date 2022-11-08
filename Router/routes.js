const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// const multer = require("../middleware/multer");
// const cloudinary = require('../Cloud/index')


require('dotenv').config();
const jwtKEY = process.env.jwtKEY;

router.post('/signUp', (req, res) => {
        // console.log(req.body);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        user.save()
            .then((data) => {
                const token = jwt.sign({ userId: user._id }, jwtKEY)
                res.send({ token });
                console.log({data})
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Message.",
                });
            });

    })











router.post('/signIn', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ error: "Must Provide Email or Password" })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(422).send({ error: "Must Provide Email or Password 1" })
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, jwtKEY)
        res.send(user);
    } catch (error) {
        return res.status(422).send({ error: "Must Provide Email or Password 2" })
    }
})










router.get('/allUsers', (req, res) => {
    User.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Message.",
            });
        });
})











router.delete('/deleteUser/:userId', (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId,
                });
            }
            res.send({ message: "User deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId,
                });
            }
            return res.status(500).send({
                message: "Could not delete User with id " + req.params.userId,
            });
        });
});


module.exports = router;