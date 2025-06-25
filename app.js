const express = require('express');  // Importa o módulo Express para criar o servidor
const app = express();               // Inicializa o app Express
const livrosRouter = require('./routers/livros');      // Importa as rotas de Livros
const usuariosRouter = require('./routers/usuarios');  // Importa as rotas de Usuários

app.use(express.json()); 

// Define as rotas para Livros e Usuários, prefixando com '/api'
app.use('/api/livros', livrosRouter);      // Rota base para as operações de Livros
app.use('/api/usuarios', usuariosRouter);  // Rota base para as operações de Usuários

// Inicia o servidor na porta 3000
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
