const gameBoard = (() => {
    const boardContainer = document.querySelector('.board-container'); // to be changed
    const startingBoard = [null, null, null, null, null, null, null, null, null]; // empty board
    let currentBoard; // board to be updated through the game

    const newGame = () => { // new game
        currentBoard = startingBoard.slice(0);
        renderBoard();
    }

    const renderBoard = () => {
        boardContainer.textContent = ''; // clear the board
        
        for (let i=0; i<startingBoard.length; i++) { // create board grid, add class, and add text content
            const spot = document.createElement('div');
            spot.classList.add('board-spots');
            spot.setAttribute('id', `s-${i}`);
            boardContainer.appendChild(spot);
            spot.textContent = currentBoard[i];
        }
        
        const spots = document.querySelectorAll('.board-spots');
        spots.forEach(spot => spot.addEventListener('click', markSpot));
    }
    

    const markSpot = (e) => { // when player clicks, mark a spot
        const spotId = e.target.id;
        const newSpot = spotId.substr(2);
        currentBoard[newSpot] = newSpot;
        renderBoard();
    }
    return {
        boardContainer,
        newGame
    }
})();

const init = (() => {
    window.onload = () => {
        const intro = document.createElement('h1');
        intro.classList.add('intro');
        intro.textContent = 'Tic Tac Toe';
        gameBoard.boardContainer.appendChild(intro); // to be changed

        const playGameBtn = document.createElement('button');
        playGameBtn.classList.add('play-game');
        gameBoard.boardContainer.appendChild(playGameBtn);
        playGameBtn.addEventListener('click', gameBoard.newGame);

        // TODO: 
        // - Add Buttons for Human or AI
        // - New Container for Intro
        // - Make board container dynamic when printNewBoard is called

    }
})();



