const gameBoard = (() => {
    const boardContainer = document.getElementById('board-container');
    
    const startingBoard = [null, null, null, null, null, null, null, null, null]; // empty board

    const printNewBoard = () => {
        boardContainer.classList.add('board-container');

        for (let i=0; i<startingBoard.length; i++) {
            const spot = document.createElement('div');
            spot.classList.add('board-spots');
            spot.setAttribute('id', `s-${i}`);
            boardContainer.appendChild(spot);
        }
    }
    return {
        printNewBoard
    }
})();

gameBoard.printNewBoard();
