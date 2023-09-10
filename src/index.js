const express = require('express');
const app = express();
const roteador = require('./router/router');

app.use(express.json());
app.use(roteador);

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000.');
})