document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-tarefa');
    const taskInput = document.getElementById('tarefa');
    const tasksList = document.getElementById('lista-tarefas');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const descricao = taskInput.value.trim();

        if (!descricao) {
            return;
        }

        try {
            const response = await fetch('/tarefas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ descricao: descricao })
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }

            taskInput.value = '';
            await loadTasks();
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
            alert('Erro ao adicionar tarefa. Verifique o console para mais detalhes.');
        }
    });

    async function loadTasks() {
        try {
            const response = await fetch('/tarefas');
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            const tasks = await response.json();

            tasksList.innerHTML = '';

            if (tasks.length === 0) {
                tasksList.innerHTML = '<p class="text-gray-500 text-center">Nenhuma tarefa ainda. Adicione uma!</p>';
                return;
            }

            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.descricao;
                tasksList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
            tasksList.innerHTML = '<p class="text-red-500">Erro ao carregar tarefas. Tente novamente.</p>';
        }
    }

    loadTasks();
});