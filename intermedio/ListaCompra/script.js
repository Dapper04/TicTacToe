// Cambiar tema (oscuro / claro)
const toggleSwitch = document.getElementById('toggle-bg-switch');
toggleSwitch.addEventListener('change', function () {
    const modoText = document.getElementById('modo');
    modoText.textContent = this.checked ? 'Modo Claro' : 'Modo Oscuro';
    document.body.classList.toggle('light-mode');
    document.querySelectorAll('h1, h2, input').forEach(element => {
        element.classList.toggle('light-mode');
    });

    // Guardar preferencia de tema
    localStorage.setItem('theme', this.checked ? 'light' : 'dark');

    // Asegura que los checkboxes dinámicos también cambien de modo
    const contenedor = document.getElementById('shoppingList');
    contenedor.querySelectorAll('.item-checkbox').forEach(checkbox => {
        checkbox.classList.toggle('light-mode');
    });
});

// Cargar tema al iniciar
if (localStorage.getItem('theme') === 'light') {
    document.getElementById('toggle-bg-switch').checked = true;
    document.body.classList.add('light-mode');
    document.getElementById('modo').textContent = 'Modo Claro';
    document.querySelectorAll('h1, h2, input').forEach(element => {
        element.classList.add('light-mode');
    });
}

// Cargar lista de compras al iniciar
function loadShoppingList() {
    const savedList = localStorage.getItem('shoppingList');
    if (savedList) {
        const contenedor = document.getElementById('shoppingList');
        contenedor.innerHTML = savedList;
        
        // Reasignar eventos a los botones de eliminar
        contenedor.querySelectorAll('.reset-button').forEach(button => {
            button.addEventListener('click', function() {
                contenedor.removeChild(button.parentElement);
                saveShoppingList();
            });
        });
        
        // Reasignar eventos a los checkboxes
        contenedor.querySelectorAll('.item-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                saveShoppingList();
            });
        });
    }
}

// Guardar lista de compras
function saveShoppingList() {
    const contenedor = document.getElementById('shoppingList');
    localStorage.setItem('shoppingList', contenedor.innerHTML);
}

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

    //Creamos el botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.className = 'reset-button';
    deleteButton.textContent = 'Eliminar';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', function () {
        contenedor.removeChild(itemLi);
    });
    

    itemLi.appendChild(checkbox);
    itemLi.appendChild(itemSpan);
    itemLi.appendChild(deleteButton);

    // Añadir el nuevo elemento a la lista
    contenedor.appendChild(itemLi);

    // Guardar la lista
    saveShoppingList();

    // Limpiar el campo de entrada
    itemInput.value = '';
}

function reiniciar() {
    const contenedor = document.getElementById('shoppingList');
    contenedor.innerHTML = ''; // Limpiar la lista
    localStorage.removeItem('shoppingList'); // Eliminar del almacenamiento
}

// Cargar la lista al iniciar la página
document.addEventListener('DOMContentLoaded', loadShoppingList);
