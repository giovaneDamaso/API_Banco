const { banco, depositos } = require('../bancodedados');
let { contas } = require('../bancodedados');
const { format } = require("date-fns");
const listarContas = (req, res) => {
    if (contas.length === 0) {
        return res.status(204).json()
    }
    return res.status(200).json(contas)

}
const criarContaBancaria = (req, res) => {
    let id = contas.length;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    contas.push({
        numero: id + 1,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    })
    return res.send(201)
}

const atualizarConta = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (cpf) {
        const checarCPF = contas.find((conta) => {
            return cpf === conta.usuario.cpf
        })
        if (checarCPF) {
            return res.status(400).json({ Mensagem: "Já existe um usuário com o CPF informado." })
        }
    }
    if (email) {
        const checarEmail = contas.find((conta) => {
            return email === conta.usuario.email
        })
        if (checarEmail) {
            return res.status(400).json({ Mensagem: "Já existe um usuário com o e-mail informado." })
        }
    }
    if (!nome && !data_nascimento && !telefone && !senha) {
        return res.status(400).json({ Mensagem: "Um dos campos (nome, data denascimento, telefone ou senha) precisa ser informado para atualização da conta." })
    }
    const contaAatualizar = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })
    if (nome) {
        contaAatualizar.usuario.nome = nome;
    }
    if (data_nascimento) {
        contaAatualizar.usuario.data_nascimento = data_nascimento;
    }
    if (telefone) {
        contaAatualizar.usuario.telefone = telefone;
    }
    if (senha) {
        contaAatualizar.usuario.senha = senha;
    }
    return res.status(200).json();
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;
    contas = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta)
    })
    return res.status(200).json()

}

const depositarConta = (req, res) => {
    const { numero_conta, valor } = req.body;
    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    verificarConta.saldo += Number(valor);
    const deposito = {
        data: format(new Date(), "yyyy-MM-dd' 'hh:mm:ss"),
        numero_conta: Number(numero_conta),
        valor: Number(valor)
    };
    verificarConta.depositos = verificarConta.depositos || [];
    verificarConta.depositos.push(deposito);
    return res.status(200).json()
}

const sacarConta = (req, res) => {
    const { numero_conta, valor } = req.body;
    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    if ((verificarConta.saldo - Number(valor)) <= 0) {
        return res.status(400).json({ Mensagem: "Não há valor disponível para o saque." })
    }
    verificarConta.saldo -= Number(valor);
    const saque = {
        data: format(new Date(), "yyyy-MM-dd' 'hh:mm:ss"),
        numero_conta: Number(numero_conta),
        valor: Number(valor)
    };
    verificarConta.saques = verificarConta.saques || [];
    verificarConta.saques.push(saque);
    return res.status(200).json()

}

const transferirConta = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body;
    const verificarContaOrigem = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem)
    })
    const verificarContaDestino = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino)
    })
    if ((verificarContaOrigem.saldo - Number(valor)) <= 0) {
        return res.status(400).json({ Mensagem: "Não há valor disponível para a transferência." })
    }
    verificarContaOrigem.saldo -= Number(valor);
    verificarContaDestino.saldo += Number(valor);
    const transferencia = {
        data: format(new Date(), "yyyy-MM-dd' 'hh:mm:ss"),
        numero_conta_origem: Number(numero_conta_origem),
        numero_conta_destino: Number(numero_conta_destino),
        valor: Number(valor)
    }
    verificarContaOrigem.transferenciasEnviadas = verificarContaOrigem.transferenciasEnviadas || [];
    verificarContaDestino.transferenciasRecebidas = verificarContaDestino.transferenciasRecebidas || [];
    verificarContaOrigem.transferenciasEnviadas.push(transferencia);
    verificarContaDestino.transferenciasRecebidas.push(transferencia);
    return res.status(200).json()
}

const consultarSaldo = (req, res) => {
    const { numero_conta } = req.query;
    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    return res.status(200).json({ saldo: verificarConta.saldo })
}

const tirarExtrato = (req, res) => {
    const { numero_conta } = req.query;
    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    const extrato = [];
    extrato.push({ depositos: verificarConta.depositos || "Nenhum deposito encontrado." },
        { saques: verificarConta.saques || "Nenhum saque encontrado." },
        { transferenciasEnviadas: verificarConta.transferenciasEnviadas || "Nenhuma transferência enviada." },
        { transferenciasRecebidas: verificarConta.transferenciasRecebidas || "Nenhuma transferência recebida." });
    return res.status(200).json({ extrato: extrato })
}

module.exports = {
    listarContas,
    criarContaBancaria,
    atualizarConta,
    excluirConta,
    depositarConta,
    sacarConta,
    transferirConta,
    consultarSaldo,
    tirarExtrato
}