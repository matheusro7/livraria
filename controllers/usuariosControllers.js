const Usuario = require('../models/usuario');  // Importa o modelo de Usuário


// Cria um novo usuário
exports.criarUsuario = async (req, res) => {
  const { nome, email, telefone } = req.body;

  // Validação simples
  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
  }

  try {
    const novoUsuario = await Usuario.criar(nome, email, telefone);
    res.status(201).json(novoUsuario);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: 'Erro ao criar o usuário.' });
  }
};

// Lista todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.listarTodos();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
};

// Atualiza um usuário pelo ID
exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;

  // Validação simples (opcional)
  if (!nome && !email && !telefone) {
    return res.status(400).json({ error: 'Informe pelo menos um campo para atualizar.' });
  }

  try {
    const usuarioAtualizado = await Usuario.atualizar(id, nome, email, telefone);
    if (!usuarioAtualizado) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.status(200).json(usuarioAtualizado);
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
  }
};

// Exclui um usuário pelo ID
exports.excluirUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const excluido = await Usuario.excluir(id);
    if (!excluido) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Erro ao excluir usuário:', err);
    res.status(500).json({ error: 'Erro ao excluir o usuário.' });
  }
};
