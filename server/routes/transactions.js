const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
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
    const transaction = new Transaction({
        value: req.body.value,
        category: req.body.category
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
        const deletedTransaction = await Transaction.deleteOne({ _id: red.params.id });
        res.json(deletedTransaction);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;