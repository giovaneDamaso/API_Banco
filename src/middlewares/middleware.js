const { banco, contas } = require('../bancodedados');

const verificarSenha = (req, res, next) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(401).json({ mensagem: 'A senha é necessária para realizar a operação.' })
    }
    if (senha_banco !== banco.senha) {
        return res.status(401).json({ mensagem: 'A senha digitada está incorreta.' })
    }
    next();
}

const verificarCPF = (req, res, next) => {
    const { cpf } = req.body;
    if (!cpf) {
        return res.status(400).json({ Mensagem: "O CPF precisa ser informado." })
    }
    const checarCPF = contas.find((conta) => {
        return cpf === conta.usuario.cpf
    })
    if (checarCPF) {
        return res.status(400).json({ Mensagem: "Já existe um usuário com o CPF informado." })
    }
    next();
}

const verificarEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ Mensagem: "O e-mail precisa ser informado." })
    }
    const checarEmail = contas.find((conta) => {
        return email === conta.usuario.email
    })
    if (checarEmail) {
        return res.status(400).json({ Mensagem: "Já existe um usuário com o e-mail informado." })
    }
    next();
}

const verificarCamposInformados = (req, res, next) => {
    const { nome, data_nascimento, telefone, senha } = req.body;
    if (!nome || !data_nascimento || !telefone || !senha) {
        return res.send(400).json({ Mensagem: "Para continuar com a operação todos os campos precisam ser informados." })
    }
    next();
}

const verificarNumeroDaConta = (req, res, next) => {
    const { numeroConta } = req.params;
    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })
    if (!verificarConta) {
        return res.status(400).json({ Mensagem: "Número da conta inválido ou inexistente." })
    }
    next();
}

const verificarSaldo = (req, res, next) => {
    const { numeroConta } = req.params;
    const verificarContaSaldo = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })
    if (verificarContaSaldo.saldo > 0) {
        return res.status(400).json({ Mensagem: "A conta só pode ser removida se o saldo for zero." })
    }
    next();
}

const verificarContaBody = (req, res, next) => {
    const { numero_conta } = req.body;
    if (!numero_conta) {
        return res.status(400).json({ Mensagem: "O número da conta é obrigatório." })
    }
    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    if (!verificarConta) {
        return res.status(400).json({ Mensagem: "Número da conta inválido ou inexistente." })
    }
    next();
}

const verificarValorBody = (req, res, next) => {
    const { valor } = req.body;
    if (!toString(valor)) {
        return res.status(400).json({ Mensagem: "O valor é obrigatório." })
    }
    if (Number(valor) <= 0) {
        return res.status(400).json({ Mensagem: "O valor precisa ser maior que zero." })
    }
    next();
}

const verificarSenhaBody = (req, res, next) => {
    const { numero_conta, senha } = req.body;
    if (!senha) {
        return res.status(400).json({ Mensagem: "A senha é obrigatória." })
    }
    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    if (verificarConta.usuario.senha !== senha) {
        return res.status(400).json({ Mensagem: "A senha informada está incorreta." })
    }
    next();
}

const verificarContaOrigem = (req, res, next) => {
    const { numero_conta_origem, senha } = req.body;
    if (!numero_conta_origem) {
        return res.status(400).json({ Mensagem: "O número da conta origem é obrigatório." })
    }
    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem)
    })
    if (!verificarConta) {
        return res.status(400).json({ Mensagem: "Número da conta origem inválido ou inexistente." })
    }
    if (verificarConta.usuario.senha !== senha) {
        return res.status(400).json({ Mensagem: "A senha informada está incorreta." })
    }
    next();
}

const verificarContaDestino = (req, res, next) => {
    const { numero_conta_destino } = req.body;
    if (!numero_conta_destino) {
        return res.status(400).json({ Mensagem: "O número da conta destino é obrigatório." })
    }
    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino)
    })
    if (!verificarConta) {
        return res.status(400).json({ Mensagem: "Número da conta destino inválido ou inexistente." })
    }
    next();
}

const verificarContaSenhaQuery = (req, res, next) => {
    const { numero_conta, senha } = req.query;
    if (!numero_conta) {
        return res.status(400).json({ Mensagem: "O número da conta é obrigatório." })
    }
    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    if (!verificarConta) {
        return res.status(400).json({ Mensagem: "Conta bancária não encontrada!" })
    }
    if (!senha) {
        return res.status(400).json({ Mensagem: "A senha é obrigatória." })
    }
    if (verificarConta.usuario.senha !== senha) {
        return res.status(400).json({ Mensagem: "A senha informada está incorreta." })
    }
    next();

}


module.exports = {
    verificarSenha,
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
    verificarContaSenhaQuery
};