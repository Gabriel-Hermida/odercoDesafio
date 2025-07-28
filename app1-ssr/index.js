const express = require('express');
const app = express();
const port = 3002;

const tarefas = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const listaHtml = tarefas.map(tarefa => `<li>${tarefa}</li>`).join('');

    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de Tarefas (SSR)</title>
        <style>
            body { font-family: sans-serif; margin: 20px; }
            h1 { color: #333; }
            form { margin-bottom: 20px; }
            input[type="text"] { padding: 8px; width: 300px; border: 1px solid #ccc; }
            input[type="submit"] { padding: 8px 15px; background-color: #007bff; color: white; border: none; cursor: pointer; }
            ul { list-style: none; padding: 0; }
            li { background-color: #f4f4f4; margin-bottom: 5px; padding: 10px; border-radius: 4px; }
        </style>
    </head>
    <body>
        <h1>Lista de Tarefas (SSR)</h1>
        <form method="POST" action="/add">
            <input type="text" name="tarefa" placeholder="Digite uma tarefa" required>
            <input type="submit" value="Adicionar">
        </form>
        <h2>Minhas Tarefas:</h2>
        <ul>
            ${listaHtml}
        </ul>
    </body>
    </html>
    `;

    res.send(html);
});

app.post('/add', (req, res) => {
    const tarefa = req.body.tarefa;
    if (tarefa) {
        tarefas.push(tarefa);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
