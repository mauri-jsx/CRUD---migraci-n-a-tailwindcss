// src/pages/LandingPage.js
export function LandingPage() {
    const $container = document.createElement('div');
  
    $container.classList.add("w-full", "mx-auto", "p-4", "bg-white", "rounded-md", "shadow-md");
  
    $container.innerHTML = `
   <h1 class="text-4xl font-bold text-teal-600 text-center mb-8">Gestión de Tareas</h1>
      <form id="task-form" class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto space-y-4">
        <div class="space-y-2">
          <label for="title" class="block text-gray-700 text-lg font-medium">Título de la tarea</label>
          <input type="text" id="title" placeholder="Título de la tarea" class="border border-gray-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out" required>
        </div>
        <div class="space-y-2">
          <label for="description" class="block text-gray-700 text-lg font-medium">Descripción</label>
          <textarea id="description" placeholder="Descripción" class="border border-gray-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out"></textarea>
        </div>
        <div class="flex items-center mb-4">
          <input type="checkbox" id="isComplete" class="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded">
          <label for="isComplete" class="ml-2 text-gray-700 text-lg">Tarea completada</label>
        </div>
        <button type="submit" class="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out w-full">Agregar Tarea</button>
      </form>
      
      <ul id="task-list" class="mt-8 space-y-4 max-w-2xl mx-auto">
        <!-- Las tareas se generarán dinámicamente aquí -->
      </ul>
    `;
  
    return $container;
  }
  