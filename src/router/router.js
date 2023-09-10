const express = require('express');
const roteador = express();

const { verificarSenha,
    verificarCPF,
    verificarEmail,
    verificarCamposInformados,
    verificarNumeroDaConta,
    verificarSaldo,
    verificarContaBody,
    verificarValorBody,
    verificarSenhaBody,
    verificarContaOrigem,
    verificarContaDestino,
    verificarContaSenhaQuery } = require('../middlewares/middleware');

const { listarContas,
    criarContaBancaria,
    atualizarConta,
    excluirConta,
    depositarConta,
    sacarConta,
    transferirConta,
    consultarSaldo,
    tirarExtrato } = require('../controllers/banco');

roteador.get('/contas', verificarSenha, listarContas);

roteador.post('/contas', verificarCPF, verificarEmail, verificarCamposInformados, criarContaBancaria);

roteador.put('/contas/:numeroConta/usuario', verificarNumeroDaConta, atualizarConta);

roteador.delete('/contas/:numeroConta', verificarNumeroDaConta, verificarSaldo, excluirConta);

roteador.post('/transacoes/depositar', verificarContaBody, verificarValorBody, depositarConta);

roteador.post('/transacoes/sacar', verificarContaBody, verificarValorBody, verificarSenhaBody, sacarConta);

roteador.post('/transacoes/transferir', verificarContaOrigem, verificarContaDestino, verificarValorBody, transferirConta);

roteador.get('/contas/saldo', verificarContaSenhaQuery, consultarSaldo);

roteador.get('/contas/extrato', verificarContaSenhaQuery, tirarExtrato);

module.exports = roteador;