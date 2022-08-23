const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const verify = require('./verifyToken');

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.query.user });
        res.json({ transactions: transactions });
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        res.json(transaction);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post('/', async (req, res) => {
    const date = new Date().toJSON().slice(0, 10);

    const transaction = new Transaction({
        value: req.body.value,
        category: req.body.category,
        date: date,
        user: req.body.user
    });

    try {
        const savedTransaction = await transaction.save();
        res.json(savedTransaction);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTransaction = await Transaction.deleteOne({ _id: req.params.id });
        res.json(deletedTransaction);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;