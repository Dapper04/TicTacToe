let currentPlayer = 'X';
let winCondition = false;
let celsSelected = 0;

const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent && !winCondition) {
            celsSelected++;
            cell.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerDisplay.textContent = currentPlayer; // Update the display of the current player
            comprobarCondicionGanadora();
        }
        if (winCondition || celsSelected === 9) {
            //alert("El juego ha terminado. Reinicia el juego.");
            document.getElementById("reset-button").style.display = "block";
        }
    });
    
});

const actu = document.getElementById("actu-gana");
function Reiniciar() {
    celsSelected = 0;
    winCondition = false;
    currentPlayer = 'X';
    actu.textContent = 'Jugador actual: '; // Reset the message
    currentPlayerDisplay.textContent = currentPlayer; // Reset the current player display
    cells.forEach(cell => {
        cell.textContent = '';
    });
    document.getElementById("reset-button").style.display = "none";
}


function comprobarCondicionGanadora() {
    const winConditions = [
        ['cell-0', 'cell-1', 'cell-2'],
        ['cell-3', 'cell-4', 'cell-5'],
        ['cell-6', 'cell-7', 'cell-8'],
        ['cell-0', 'cell-3', 'cell-6'],
        ['cell-1', 'cell-4', 'cell-7'],
        ['cell-2', 'cell-5', 'cell-8'],
        ['cell-0', 'cell-4', 'cell-8'],
        ['cell-2', 'cell-4', 'cell-6']
    ];

    winConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (document.querySelector(`[data-id="${a}"]`).textContent &&
            document.querySelector(`[data-id="${a}"]`).textContent === document.querySelector(`[data-id="${b}"]`).textContent &&
            document.querySelector(`[data-id="${a}"]`).textContent === document.querySelector(`[data-id="${c}"]`).textContent) {
            winCondition = true;
            actu.textContent = `El jugador ${document.querySelector(`[data-id="${a}"]`).textContent} ha ganado!`;
            currentPlayerDisplay.textContent = ''; // Clear the current player display
        }
    });
}

