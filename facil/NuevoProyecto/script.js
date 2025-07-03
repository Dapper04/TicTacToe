// Cambiar tema (oscuro / claro)
const toggleSwitch = document.getElementById('toggle-bg-switch');
toggleSwitch.addEventListener('change', function () {
    const modoText = document.getElementById('modo');
    modoText.textContent = this.checked ? 'Modo Claro' : 'Modo Oscuro';
    document.body.classList.toggle('light-mode');
    document.querySelectorAll('h1, h2').forEach(element => {
        element.classList.toggle('light-mode');
    })
    
});
    