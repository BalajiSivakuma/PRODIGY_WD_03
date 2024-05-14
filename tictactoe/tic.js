document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.getElementById('restartButton');
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let currentPlayer = 'X';
    let gameActive = true;

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', restartGame);

    function handleCellClick(e) {
        const cell = e.target;
        const index = Array.from(cells).indexOf(cell);

        if (cell.textContent !== '' || !gameActive) return;

        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase()); // Add class for X or O
        if (checkWin(currentPlayer)) {
            endGame(false);
        } else if (checkDraw()) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === player;
            });
        });
    }

    function checkDraw() {
        return [...cells].every(cell => {
            return cell.textContent !== '';
        });
    }

    function endGame(draw) {
        gameActive = false;
        if (draw) {
            alert('The game is a draw!');
        } else {
            alert(`Player ${currentPlayer} wins!`);
        }
    }

    function restartGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o'); // Remove X and O classes
        });
        currentPlayer = 'X';
        gameActive = true;
    }
});
