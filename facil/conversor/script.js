// Cambiar tema (oscuro / claro)
const toggleSwitch = document.getElementById('toggle-bg-switch');
toggleSwitch.addEventListener('change', function () {
    const modoText = document.getElementById('modo');
    modoText.textContent = this.checked ? 'Modo Claro' : 'Modo Oscuro';
    document.body.classList.toggle('light-mode');
    document.querySelectorAll('h1, h2').forEach(element => {
        element.classList.toggle('light-mode');
    });
    
    // Aplicar modo claro a elementos del conversor
    document.querySelector('.contenedor').classList.toggle('light-mode');
    document.querySelectorAll('select, .input-num, .igual').forEach(element => {
        element.classList.toggle('light-mode');
    });
    
});

// Mapeo de unidades por categorías
const categoriasUnidades = {
    metros: 'longitud',
    kilometros: 'longitud',
    centimetros: 'longitud',
    pulgadas: 'longitud',
    pies: 'longitud',
    kilogramos: 'peso',
    gramos: 'peso',
    libras: 'peso',
    onzas: 'peso',
    celsius: 'temperatura',
    fahrenheit: 'temperatura',
    kelvin: 'temperatura'
};

// Opciones para cada categoría
const opciones = {
    longitud: [
        { value: 'metros', text: 'Metros' },
        { value: 'kilometros', text: 'Kilómetros' },
        { value: 'centimetros', text: 'Centímetros' },
        { value: 'pulgadas', text: 'Pulgadas' },
        { value: 'pies', text: 'Pies' }
    ],
    peso: [
        { value: 'kilogramos', text: 'Kilogramos' },
        { value: 'gramos', text: 'Gramos' },
        { value: 'libras', text: 'Libras' },
        { value: 'onzas', text: 'Onzas' }
    ],
    temperatura: [
        { value: 'celsius', text: 'Celsius' },
        { value: 'fahrenheit', text: 'Fahrenheit' },
        { value: 'kelvin', text: 'Kelvin' }
    ]
};

// Función para actualizar el segundo selector
function actualizarUnidadDestino() {
    const unidadBase = document.getElementById('unidadBase').value;
    const unidadDestino = document.getElementById('unidadDestino');
    
    // Limpiar opciones existentes
    unidadDestino.innerHTML = '';
    
    if (unidadBase && categoriasUnidades[unidadBase]) {
        const categoria = categoriasUnidades[unidadBase];
        opciones[categoria].forEach(opcion => {
            // No incluir la misma unidad que está seleccionada en el primer selector
            if (opcion.value !== unidadBase) {
                const option = document.createElement('option');
                option.value = opcion.value;
                option.textContent = opcion.text;
                unidadDestino.appendChild(option);
            }
        });
    } else {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Selecciona una unidad base primero';
        unidadDestino.appendChild(option);
    }
}
// Agregar a cada unidad un valor por defecto
const valor = {
    metros: 1,
    kilometros: 1000,
    centimetros: 0.01,
    pulgadas: 0.0254,
    pies: 0.3048,
    kilogramos: 1,
    gramos: 0.001,
    libras: 0.453592,
    onzas: 0.0283495,
    celsius: 1,
    fahrenheit: (9/5),
    kelvin: 273.15
};

function convertir() {
    const unidadBase = document.getElementById('unidadBase').value;
    const unidadDestino = document.getElementById('unidadDestino').value;

    const valorBase = parseFloat(document.getElementById('valorBase').value);
    const cambio = valor[unidadBase] / valor[unidadDestino];
    const resultado = valorBase * cambio;
    if (unidadBase === 'celsius' && unidadDestino === 'fahrenheit') {
        // Convertir de Celsius a Fahrenheit
        document.getElementById('valorResultado').value = (valorBase * valor[unidadDestino]) + 32;
    } else if (unidadBase === 'fahrenheit' && unidadDestino === 'celsius') {
        // Convertir de Fahrenheit a Celsius
        document.getElementById('valorResultado').value = (valorBase - 32)/valor[unidadBase];
    } else if (unidadBase === 'kelvin' && unidadDestino === 'celsius') {
        // Convertir de Kelvin a Celsius
        document.getElementById('valorResultado').value = valorBase - valor[unidadBase];
    } else if (unidadBase === 'celsius' && unidadDestino === 'kelvin') {
        // Convertir de Celsius a Kelvin
        document.getElementById('valorResultado').value = valorBase + valor[unidadDestino];
    } else if (unidadBase === 'kelvin' && unidadDestino === 'fahrenheit') {
        // Convertir de Kelvin a Fahrenheit
        document.getElementById('valorResultado').value = (valorBase - valor[unidadBase]) * valor[unidadDestino] + 32;
    } else if (unidadBase === 'fahrenheit' && unidadDestino === 'kelvin') {
        // Convertir de Fahrenheit a Kelvin
        document.getElementById('valorResultado').value = (valorBase - 32)/valor[unidadBase] + valor[unidadDestino];
    }   else {
        document.getElementById('valorResultado').value = resultado.toFixed(5);
    }

}

// Agregar evento al selector base
document.getElementById('unidadBase').addEventListener('change', actualizarUnidadDestino);
