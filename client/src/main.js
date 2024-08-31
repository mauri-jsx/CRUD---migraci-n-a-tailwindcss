import Swal from 'sweetalert2';
import { LandingPage } from './pages/LandingPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { Header } from './components/Header.js';

function renderPage(page) {
    const app = document.getElementById('app');
    app.innerHTML = ''; 
    app.appendChild(Header()); 

    switch (page) {
        case '/login':
            app.appendChild(LoginPage());
            break;
        case '/':
            app.appendChild(LandingPage());
            break;
        default:
            app.innerHTML = '<h1>404 - Página no encontrada</h1>';
    }

    if (page === '/') {
        setupTaskHandlers();
        loadTasks();
    }
}

export function navigateTo(pathname) {
    history.pushState({}, pathname, window.location.origin + pathname);
    renderPage(pathname);
}

document.addEventListener('DOMContentLoaded', () => {
    renderPage(window.location.pathname);
});

window.addEventListener('popstate', () => {
    renderPage(window.location.pathname);
});

function setupTaskHandlers() {
    document.getElementById('task-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const isComplete = document.getElementById('isComplete').checked;

        // Crear una nueva tarea
        await fetch("http://localhost:4000/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, isComplete })
        });

        document.getElementById('task-form').reset();
        loadTasks();

        Swal.fire({
            icon: 'success',
            title: 'Tarea agregada',
            showConfirmButton: false,
            timer: 1500
        });
    });
}

async function loadTasks() {
    try {
        const res = await fetch("http://localhost:4000/tasks");
        if (!res.ok) throw new Error('Error al cargar las tareas');

        const tasks = await res.json();

        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-md shadow-md flex flex-col space-y-4';

            li.innerHTML = `
                <div class="space-y-2">
                    <h3 class="text-2xl font-semibold text-teal-600 dark:text-teal-400">${task.title}</h3>
                    <p class="text-gray-700 dark:text-gray-300">${task.description}</p>
                    <p class="text-sm ${task.isComplete ? 'line-through text-green-600' : 'text-red-600'}">${task.isComplete ? 'Completada' : 'Pendiente'}</p>
                </div>
                <div class="flex space-x-4 mt-4 justify-end">
                    <button onclick="updateTask(${task.id}, '${task.title}', '${task.description}', ${task.isComplete})" class="bg-blue-300 text-black px-3 py-1 rounded-md">Editar</button>
                    <button onclick="deleteTask(${task.id})" class="bg-red-600 text-white px-3 py-1 rounded-md">Eliminar</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error cargando las tareas:', error);
    }
}

window.updateTask = async function(id, currentTitle, currentDescription, currentIsComplete) {
    const { value: formValues } = await Swal.fire({
        title: 'Actualizar tarea',
        html:
            `<input id="swal-input1" class="swal2-input" value="${currentTitle}" placeholder="Título de la tarea">` +
            `<textarea id="swal-input2" class="swal2-textarea" placeholder="Descripción">${currentDescription}</textarea>` +
            `<div class="swal2-checkbox"><input id="swal-input3" type="checkbox" ${currentIsComplete ? 'checked' : ''}> Completada</div>`,
        focusConfirm: false,
        preConfirm: () => {
            return {
                title: document.getElementById('swal-input1').value,
                description: document.getElementById('swal-input2').value,
                isComplete: document.getElementById('swal-input3').checked
            };
        },
        confirmButtonText: 'Actualizar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
    });

    if (formValues) {
        await fetch(`http://localhost:4000/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        });

        loadTasks();

        Swal.fire({
            icon: 'success',
            title: 'Tarea actualizada',
            showConfirmButton: false,
            timer: 1500
        });
    }
};

window.deleteTask = async function(id) {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás recuperar esta tarea después de eliminarla.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        await fetch(`http://localhost:4000/task/${id}`, {
            method: 'DELETE'
        });
        loadTasks();

        Swal.fire({
            icon: 'success',
            title: 'Tarea eliminada',
            showConfirmButton: false,
            timer: 1500
        });
    }
};
