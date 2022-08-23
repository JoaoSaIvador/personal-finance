const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
    //console.log(req.cookies);
    const token = req.cookies['Authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified._id);
        req.body.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
}