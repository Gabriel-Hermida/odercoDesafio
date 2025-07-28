const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //add para pasta public

let tarefas = [];

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
    const tarefa = req.body;
    if (!tarefa || !tarefa.descricao) {
        return res.status(400).json({ error: 'Descrição da tarefa é obrigatória' });
    }
    tarefa.id = tarefas.length + 1;
    tarefas.push(tarefa);
    res.status(201).json(tarefa);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});