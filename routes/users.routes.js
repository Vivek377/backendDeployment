const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users.model");

const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
    try {
        const { email, pass, location } = req.body;
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.status(400).send({ err: err.message })
            } else {
                const user = new UserModel({ email, pass: hash, location });
                await user.save();
                res.status(200).send({ msg: "registeration success" });
            }
        })
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

userRoutes.post("/login", async (req, res) => {
    try {
        const { email, pass } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (err) {
                    res.status(400).send({ err: "invalid password" });
                } else {
                    const token = jwt.sign({ "userID": user._id }, "secret");
                    res.status(200).send({ msg: "login success", token: token });
                }
            })
        } else {
            res.status(400).send({ err: "invalid credentials" });
        }

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

module.exports = userRoutes;
