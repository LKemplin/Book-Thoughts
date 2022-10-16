const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')



module.exports.register = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({id: user._id}, process.env.FIRST_SECRET_KEY);
            res
                .cookie("usertoken", userToken, secret, {
                    httpOnly: true
                })
                .json({msg: "User has been logged in successfully."})
        })
        .catch(err => res.json(err));
}

module.exports.login = async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (User === null) {
        return res.sendStatus(400);  //add error message here
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        return res.sendStatus(400);  //add error message here
    }
    const userToken = jwt.sign({id: user._id}, process.env.FIRST_SECRET_KEY)
    res
        .cookie("usertoken", userToken, secret, {httpOnly: true})
        .json({msg: "User has been logged in successfully."});
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    req.sendStatus(200);
}