const mongoose = require('mongoose');

const exameSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    clinica: { type: String, required: true },
    id_cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }
});

module.exports = mongoose.model('Exame', exameSchema);
