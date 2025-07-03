// Cambiar tema (oscuro / claro)
const toggleSwitch = document.getElementById('toggle-bg-switch');
toggleSwitch.addEventListener('change', function () {
    const modoText = document.getElementById('modo');
    modoText.textContent = this.checked ? 'Modo Claro' : 'Modo Oscuro';
    document.body.classList.toggle('light-mode');
    document.querySelectorAll('h1, h2, input').forEach(element => {
        element.classList.toggle('light-mode');
    });

    // Asegura que los checkboxes dinámicos también cambien de modo
    const contenedor = document.getElementById('shoppingList');
    contenedor.querySelectorAll('.item-checkbox').forEach(checkbox => {
        checkbox.classList.toggle('light-mode');
    });
});

function anadir() {
    const contenedor = document.getElementById('shoppingList');
    const itemInput = document.getElementById('itemInput');
    const text = itemInput.value.trim();

    if (text === '') {
        alert('Por favor, introduce un elemento.');
        return;
    }

    // Crear un nuevo elemento de lista
    const itemLi = document.createElement('li');
    itemLi.style.display = 'flex';
    itemLi.style.alignItems = 'center';
    itemLi.style.margin = '8px 0';

    //  Creamos el checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'item-checkbox';

    // Creamos el span para el texto del elemento
    const itemSpan = document.createElement('span');
    itemSpan.textContent = text;
    itemSpan.style.marginLeft = '10px';
    itemSpan.style.flexGrow = '1'; // Para que ocupe el espacio disponible

    itemLi.appendChild(checkbox);
    itemLi.appendChild(itemSpan);

    // Añadir el nuevo elemento a la lista
    contenedor.appendChild(itemLi);

    // Limpiar el campo de entrada
    itemInput.value = '';
}

function reiniciar() {
    const contenedor = document.getElementById('shoppingList');
    contenedor.innerHTML = ''; // Limpiar la lista
}
