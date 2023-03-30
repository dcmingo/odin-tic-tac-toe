

const gameBoard = (() => {
    const gameHeader = document.getElementById('game-over-header');
    const resetBtn = document.getElementById('reset-btn');
    const playerBtn = document.getElementById('player-btn');
    let humanPlayerTwo = true;
    let gameOver = false;
    let boardArray = {};
    let turnMarker = 'X';
    let solutionsArray = [
        ['tile-0','tile-1','tile-2'],
        ['tile-3','tile-4','tile-5'],
        ['tile-6','tile-7','tile-8'],
        ['tile-0','tile-3','tile-6'],
        ['tile-1','tile-4','tile-7'],
        ['tile-2','tile-5','tile-8'],
        ['tile-0','tile-4','tile-8'],
        ['tile-2','tile-4','tile-6'],    
    ]
    let tileKeys = ['tile-0','tile-1','tile-2',
    'tile-3','tile-4','tile-5',
    'tile-6','tile-7','tile-8'
    ]


    const board = document.getElementById('board-container');

    gameHeader.style.display = 'none';
    resetBtn.style.display = 'none'
    
    const togglePlayer = (e) => {
        humanPlayerTwo = !humanPlayerTwo;
        console.log(humanPlayerTwo);
        const p = document.getElementById('toggled-player');
        p.textContent = humanPlayerTwo == false ? 'Computer' : 'Human';
    }

    const resetGame = () => {
        for (t in tileKeys) {
            let e = document.getElementById(tileKeys[t]);
            e.textContent = null;
        }


        boardArray = {};
        gameHeader.style.display = 'none';
        resetBtn.style.display = 'none';
        gameOver = false;
    }

    resetBtn.addEventListener('click', resetGame, false);
    playerBtn.addEventListener('click', togglePlayer, false);

    const endGame = () => {
        gameHeader.style.display = 'grid';
        resetBtn.style.display = 'grid';
        let winner = turnMarker == 'X' ? 'O' : 'X';
        let wText = document.getElementById('end-text');
        wText.textContent = `Game Over: ${winner} Is The Winner!`

    }

    //Checks board for end game
    const checkBoard = (b) => {

        for (s in solutionsArray) {
                
            if (b[solutionsArray[s][0]] == b[solutionsArray[s][1]] && b[solutionsArray[s][2]] == b[solutionsArray[s][0]] && b[solutionsArray[s][0]] != null ) {
                console.log(s);
                gameOver = true;
                endGame();
            }

        }
    }

    //Game Logic + Tile placement
    const onTileClick = (e) => {

        
        let t = document.getElementById(e.target.id);

        if (boardArray[t.id] == null && gameOver == false) {
            t.textContent = turnMarker;
            boardArray[t.id] = turnMarker;
            turnMarker = turnMarker == 'X' ? 'O' : 'X';
            checkBoard(boardArray);
        }
        
        
           
    }
    //Below: Create game board with 9 tiles (t);
    for (i=0; i < 9; i++) {
        const t = document.createElement('div');
        t.id = 'tile-'+ i;
        t.className = 'tile';
        t.addEventListener('click', onTileClick, false);
        board.appendChild(t);
        boardArray[t.id] = null;
        
    }
    
    

})(); 


