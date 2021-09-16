const ticTacToe = (() => {
    const mainContainer = document.querySelector('.main-container'); // main container for all dynamic elements
    const turnContainer = document.createElement('div');

    const gameBoard = (() => { // gameboard module
            const startingBoard = [null, null, null, null, null, null, null, null, null]; // empty board
            let currentBoard; // board to be updated through the game



            const renderNewBoard = () => { // new game
                currentBoard = startingBoard.slice(0);
                _renderBoard();
            }

            const _renderBoard = () => { // display current board
                const boardContainer = document.getElementById('board-container');
                
                if (!document.querySelector('.board-container')) {
                    boardContainer.classList.add('board-container');
                    mainContainer.appendChild(boardContainer);
                }
                boardContainer.textContent = ''; // clear the board
                    
                for (let i=0; i<startingBoard.length; i++) { // create board grid, add class, and add text content
                    const spot = document.createElement('div');
                    spot.classList.add('board-spots');
                    spot.setAttribute('id', `s-${i}`);
                    boardContainer.appendChild(spot);
                    spot.textContent = currentBoard[i];
                    if (spot.textContent === '') { // add listeners if space is empty
                        spot.addEventListener('click', _markSpot);
                    }
                    else {
                        continue;
                    }
                }
            }

            const _markSpot = (e) => { // when player clicks, mark designated spot
                const spotId = e.target.id;
                const newSpot = spotId.substr(2);
                currentBoard[newSpot] = playGame.getCurrentTurn();
                _renderBoard();
                _checkWinner();
            }

            const _checkWinner = () => {
                let isWinner = false;
                let winner;

                for (let i=0; i<10; i+=3) { // check rows
                    if ((currentBoard[i] === 'X') && (currentBoard[i+1] === 'X') && (currentBoard[i+2] === 'X')) {
                        isWinner = true;
                        winner = 'X';
                    }
                    if ((currentBoard[i] === 'O') && (currentBoard[i+1] === 'O') && (currentBoard[i+2] === 'O')) {
                        isWinner = true;
                        winner = 'O';
                    }
                }

                for (let i=0; i<3; i+=1) { // check columns
                    if ((currentBoard[i] === 'X') && (currentBoard[i+3] === 'X') && (currentBoard[i+6] === 'X')) {
                        isWinner = true;
                        winner = 'X';
                    }
                    if ((currentBoard[i] === 'O') && (currentBoard[i+3] === 'O') && (currentBoard[i+6] === 'O')) {
                        isWinner = true;
                        winner = 'O';
                    }
                }

                // check diagonals
                if ((currentBoard[0] === 'X') && (currentBoard[4] === 'X') && (currentBoard[8] === 'X')) {
                    isWinner = true;
                    winner = 'X';
                }
                if ((currentBoard[0] === 'O') && (currentBoard[4] === 'O') && (currentBoard[8] === 'O')) {
                    isWinner = true;
                    winner = 'O';
                }
                if ((currentBoard[2] === 'X') && (currentBoard[4] === 'X') && (currentBoard[6] === 'X')) {
                    isWinner = true;
                    winner = 'X';
                }
                if ((currentBoard[2] === 'O') && (currentBoard[4] === 'O') && (currentBoard[6] === 'O')) {
                    isWinner = true;
                    winner = 'O';
                }
                

                if (isWinner === true) {
                    playGame.endGame(winner);
                }

                if (!currentBoard.includes(null)) {
                    winner = 'tie';
                    playGame.endGame(winner);
                }   
            }

            return {
                renderNewBoard,
            }
    })();

    const playGame = (() => { // game mechanics module
        const players = []; // array to hold players
        let currentTurn;
        let totalMoves = 0; // move counter

        const Player = (playerName, letter) => {
            const getName = () => playerName;
            const getLetter = () => letter;

            return {getName, getLetter};
        };
        
        const startGameHuman = (name1, name2) => {
            const player1 = Player(name1, 'X');
            const player2 = Player(name2, 'O');
            players.push(player1, player2);
            currentTurn = _getFirstTurn(players);
            gameBoard.renderNewBoard();
            _displayTurn(currentTurn); 
        }
        
        const getCurrentTurn = () => { // switch turn
            if (currentTurn === players[0]) {
                currentTurn = players[1];
            }
            else {
                currentTurn = players[0];
            }

            totalMoves++;
            _displayTurn(currentTurn.getName());
            return currentTurn.getLetter();
        }

        const endGame = (letter) => { // end game and announce winner
            let winner;
            mainContainer.textContent = '';

            const winnerText = document.createElement('h2');
            winnerText.classList.add('winner-text');

            const playAgainBtn = document.createElement('button');
            playAgainBtn.textContent = 'Play Again?'
            playAgainBtn.addEventListener('click', init.initIntro);

            mainContainer.appendChild(winnerText);
            mainContainer.appendChild(playAgainBtn);


            if (letter === 'X') {
                winner = players[0].getName();
            }
            else if (letter === 'O') {
                winner = players[1].getName();
            }
            else {
                winner = "It's a tie!"
            }

            if (winner != "It's a tie!") {
                winnerText.textContent = `${winner} wins!`;
            }
            else {
                winnerText.textContent = winner;
            }
            

        }

        const _getFirstTurn = (players) => { // random picker
            let firstTurn = (Math.random() < .5 ? players[0] : players[1]);
            return firstTurn.getName();
        }

        const _displayTurn = (currentTurn) => { // display current player's turn
            turnContainer.textContent = '';
            const turnText = document.createElement('h2');
            turnText.classList.add('turn-text');
            turnText.textContent = `${currentTurn}'s turn`;
            turnContainer.appendChild(turnText);
            mainContainer.appendChild(turnContainer);
        }



        return {
            startGameHuman,
            getCurrentTurn,
            endGame
        };
    })();

    const init = (() => {
        const initIntro = () => {
            mainContainer.textContent = '';
            const intro = document.createElement('h1');
                intro.classList.add('intro');
                intro.textContent = 'Tic Tac Toe';
                mainContainer.appendChild(intro);

                const humanBtn = document.createElement('button');
                humanBtn.setAttribute('id', 'human');
                humanBtn.classList.add('game-button');
                humanBtn.textContent = 'Play Vs Human';
                humanBtn.addEventListener('click', _chooseMode);
                mainContainer.appendChild(humanBtn);
                
                const aiBtn = document.createElement('button');
                aiBtn.setAttribute('id', 'ai');
                aiBtn.classList.add('game-button');
                aiBtn.textContent = 'Play Vs Ai';
                aiBtn.addEventListener('click', _chooseMode);
                mainContainer.appendChild(aiBtn);
        }    
        const _humanInputs = () => { // - Input fields for player object names
                mainContainer.textContent = '';
                
                const nameContainer = document.createElement('div');
                nameContainer.classList.add('name-container');
                const nameInput1 = document.createElement('input');
                nameInput1.setAttribute('type', 'text');
                nameInput1.setAttribute('placeholder', 'X Player Name');
                const nameInput2 = document.createElement('input');
                nameInput2.setAttribute('type', 'text');
                nameInput2.setAttribute('placeholder', 'O Player Name');
                const startBtn = document.createElement('button');
                startBtn.classList.add('game-button');
                startBtn.textContent = 'Play Game!';
                mainContainer.appendChild(nameContainer);
                nameContainer.appendChild(nameInput1);
                nameContainer.appendChild(nameInput2);
                nameContainer.appendChild(startBtn);

                startBtn.addEventListener('click', () => {
                    const nameInput1Value = nameInput1.value;
                    const nameInput2Value = nameInput2.value;
                    
                    mainContainer.textContent = '';
                    playGame.startGameHuman(nameInput1Value, nameInput2Value);
                }); 
            }
        
        const _chooseMode = (e) => { // conditional for game mode choice
            gameMode = e.target.id;
            gameMode === 'human' ? _humanInputs(): console.log('');
        }
        
        window.onload = () => { // on load
            let gameMode = null;
            initIntro();
        }

        return {
            initIntro
        }
    })();
})();  

// TODO:
// - Display winner
// - Ask to play again
// - (maybe) Create AI mechanics