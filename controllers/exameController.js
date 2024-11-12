const express = require('express');
const Exame = require('../models/Exame');
const Cliente = require('../models/Cliente');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const exames = await Exame.find().populate('id_cliente', 'nome');
        res.json(exames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const exame = await Exame.findById(req.params.id).populate('id_cliente', 'nome');
        res.json(exame);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const exame = new Exame(req.body);
    try {
        const newExame = await exame.save();
        res.status(201).json(newExame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedExame = await Exame.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExame);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Exame.findByIdAndDelete(req.params.id);
        res.json({ message: 'Exame deletado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
