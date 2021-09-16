const ticTacToe = (() => {
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
                    console.log(spot.textContent);
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
            gameBoard.renderNewBoard(); 
        }
        
        const getCurrentTurn = () => { // if first turn, pick randomly if not first turn switch
            if (totalMoves < 1) {
                currentTurn = _getFirstTurn(players);
            }
            else {
                if (currentTurn === players[0].getLetter()) {
                    currentTurn = players[1].getLetter();
                }
                else {
                    currentTurn = players[0].getLetter();
                }
            }

            totalMoves++;
            return currentTurn;
        }
        const _getFirstTurn = (players) => {
            let firstTurn = (Math.random() < .5 ? players[0] : players[1]).getLetter();
            return firstTurn;
        }

        return {
            startGameHuman,
            getCurrentTurn
        };
    })();

    return {
        gameBoard,
        playGame,
    };
})();
    
const mainContainer = document.querySelector('.main-container'); // main container for all dynamic elements

const init = (() => {
    const initIntro = () => {
        const intro = document.createElement('h1');
            intro.classList.add('intro');
            intro.textContent = 'Tic Tac Toe';
            mainContainer.appendChild(intro);

            const humanBtn = document.createElement('button');
            humanBtn.setAttribute('id', 'human');
            humanBtn.classList.add('game-button');
            humanBtn.textContent = 'Play Vs Human';
            humanBtn.addEventListener('click', chooseMode)
            mainContainer.appendChild(humanBtn);
            
            const aiBtn = document.createElement('button');
            aiBtn.classList.add('game-button');
            aiBtn.textContent = 'Play Vs Ai!';
            mainContainer.appendChild(aiBtn);
    }    
    const humanInputs = () => { // - Input fields for player object names
            mainContainer.textContent = '';
            
            const nameContainer = document.createElement('div');
            nameContainer.classList.add('name-container');
            const nameInput1 = document.createElement('input');
            const nameInput2 = document.createElement('input');
            const startBtn = document.createElement('button');
            startBtn.textContent = 'Play Game!';
            mainContainer.appendChild(nameContainer);
            nameContainer.appendChild(nameInput1);
            nameContainer.appendChild(nameInput2);
            nameContainer.appendChild(startBtn);

            startBtn.addEventListener('click', () => {
                const nameInput1Value = nameInput1.value;
                const nameInput2Value = nameInput2.value;
                
                mainContainer.textContent = '';
                ticTacToe.playGame.startGameHuman(nameInput1Value, nameInput2Value);
            }); 
        }
    
    const chooseMode = (e) => {
        gameMode = e.target.id;
    }
    
    window.onload = () => {
        let gameMode = null;
        initIntro();
        gameMode === 'human' ? humanInputs(): console.log('');
        
       
        // TODO:
        // - Greeting
        // - Add Buttons for Human or AI
        // - When turn changes display name
        // - *Check win mechanics* 
        // - Display winner
        // - Ask to play again

        // - (maybe) Create AI mechanics
        

    }
})();


