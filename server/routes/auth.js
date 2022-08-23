const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const oldUser = await User.findOne({ email: req.email });

    if (oldUser) {
        return res.status(400).json({ message: 'User already exists!' });
    }

    // Encrypt password
    var encryptedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user
    const user = new User({
        username: req.body.username,
        email: req.body.email.toLowerCase(),
        password: encryptedPassword
    });

    // Create JWT Token
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn: "2min"
        }
    );

    //res.header('Authorization', 'Bearer ' + token);
    res.cookie('Authorization', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // Save user in MongoDB
    try {
        let savedUser = await user.save();
        res.json({
            message: 'Logged in!'
        });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.post('/login', async (req, res) => {
    // Check if user exists with the same email and if given password is correct
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({ message: 'User does not exist!' });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({ message: 'Incorrect password!' });
    }

    // Create JWT Token
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn: "2min"
        }
    );

    //res.header('Authorization', 'Bearer ' + token);
    res.cookie('Authorization', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({
        message: 'Logged in!',
        token: token
    });
});

router.post('/verifyUser', async (req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.json({ message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified._id);

        res.json({ user: user });
    } catch (error) {
        res.json({ message: 'Invalid Token' });
    }
});

module.exports = router;