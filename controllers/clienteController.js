const express = require('express');
const Cliente = require('../models/Cliente');
const Exame = require('../models/Exame');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        const exames = await Exame.find({ id_cliente: req.params.id });
        res.json({ cliente, exames });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const cliente = new Cliente(req.body);
    try {
        const newCliente = await cliente.save();
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedCliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Exame.deleteMany({ id_cliente: req.params.id });
        await Cliente.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cliente e exames deletados' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
