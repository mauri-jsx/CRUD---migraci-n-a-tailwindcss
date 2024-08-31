// src/pages/LoginPage.js
export function LoginPage() {
    const $container = document.createElement('div');
    $container.classList.add("w-1/2", "mx-auto", "p-4", "bg-white", "rounded-md");
  
    $container.innerHTML = `
      <h1 class="text-2xl">Iniciar Sesión</h1>
      <form id="login-form" class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto space-y-4">
        <div class="space-y-2">
          <label for="username" class="block text-gray-700 text-lg font-medium">Nombre de usuario</label>
          <input type="text" id="username" placeholder="Nombre de usuario" class="border border-gray-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out" required>
        </div>
        <div class="space-y-2">
          <label for="password" class="block text-gray-700 text-lg font-medium">Contraseña</label>
          <input type="password" id="password" placeholder="Contraseña" class="border border-gray-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out" required>
        </div>
        <button type="submit" class="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out w-full">Iniciar Sesión</button>
      </form>
    `;
  
    return $container;
  }
  