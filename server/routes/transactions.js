const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const verify = require('./verifyToken');

router.get('/', verify, async (req, res) => {
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
    const timestamp = new Date().toJSON().slice(0, 19);

    const transaction = new Transaction({
        purpose: req.body.transaction.purpose,
        value: req.body.transaction.value,
        category: req.body.transaction.category,
        date: date,
        user: req.body.transaction.user,
        createdAt: timestamp
    });

    try {
        const savedTransaction = await transaction.save();
        res.json({ transaction: savedTransaction });
    } catch (error) {
        res.json({ message: error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const newTransaction = req.body.transaction;

        const updatedTransaction = await Transaction.updateOne(
            { _id: req.params.id, user: newTransaction.user },
            { $set: { purpose: newTransaction.purpose, category: newTransaction.category, value: newTransaction.value } }
        );

        res.json(updatedTransaction);
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