const Livro = require('../models/livro');  // Importa o modelo de livros

// Criar um novo livro
exports.criarLivro = async (req, res) => {
  const { titulo, autor, ano_publicacao, isbn } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({ error: 'Título e autor são obrigatórios.' });
  }

  try {
    const novoLivro = await Livro.criar(titulo, autor, ano_publicacao, isbn);
    res.status(201).json(novoLivro);
  } catch (err) {
    console.error('Erro ao criar livro:', err);
    res.status(500).json({ error: 'Erro ao criar o livro.' });
  }
};

// Listar todos os livros
exports.listarLivros = async (req, res) => {
  try {
    const livros = await Livro.listarTodos();
    res.status(200).json(livros);
  } catch (err) {
    console.error('Erro ao listar livros:', err);
    res.status(500).json({ error: 'Erro ao listar livros.' });
  }
};

// Atualizar um livro pelo ID
exports.atualizarLivro = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano_publicacao, isbn } = req.body;

  if (!titulo && !autor && !ano_publicacao && !isbn) {
    return res.status(400).json({ error: 'Informe pelo menos um campo para atualizar.' });
  }

  try {
    const livroAtualizado = await Livro.atualizar(id, titulo, autor, ano_publicacao, isbn);
    if (!livroAtualizado) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }
    res.status(200).json(livroAtualizado);
  } catch (err) {
    console.error('Erro ao atualizar livro:', err);
    res.status(500).json({ error: 'Erro ao atualizar o livro.' });
  }
};

// Excluir um livro pelo ID
exports.excluirLivro = async (req, res) => {
  const { id } = req.params;

  try {
    const excluido = await Livro.excluir(id);
    if (!excluido) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Erro ao excluir livro:', err);
    res.status(500).json({ error: 'Erro ao excluir o livro.' });
  }
};
