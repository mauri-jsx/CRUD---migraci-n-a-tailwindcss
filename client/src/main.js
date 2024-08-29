import './style.css';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', loadTasks);

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

async function loadTasks() {
    try {
        const res = await fetch("http://localhost:4000/tasks");
        if (!res.ok) throw new Error('Error al cargar las tareas');

        const tasks = await res.json();

        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4';

            li.innerHTML = `
                <div class="space-y-2">
                    <h3 class="text-2xl font-semibold text-teal-600">${task.title}</h3>
                    <p class="text-gray-700">${task.description}</p>
                    <p class="text-sm ${task.isComplete ? 'line-through text-green-600' : 'text-red-600'}">${task.isComplete ? 'Completada' : 'Pendiente'}</p>
                </div>
                <div class="flex space-x-4 mt-4">
                   <button onclick="updateTask(${task.id}, '${task.title}', '${task.description}', ${task.isComplete})" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out">Editar</button>
                   <button onclick="deleteTask(${task.id})" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out">Eliminar</button>
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
