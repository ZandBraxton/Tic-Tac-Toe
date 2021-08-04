const playerFactory = (name, marker) => {
    let moves = []
    return {name, marker, moves}
}

const displayController = (() => {
    const player1 = document.querySelector('.player1')
    const player2 = document.querySelector('.player2')
    const currentPlayer = document.querySelector('.turn')
    
    function bind(domBoard) {
        domBoard.forEach(tile => {
            tile.addEventListener('click', () => {
                gameBoard.placeMarker(tile)
            })
        })    
    }    

    function clearBoard(domBoard) {
        domBoard.forEach(tile => {
            tile.textContent = ''
            gameBoard.gameStart()
        })    
    }

    function renderName(Player1, Player2, player) {
        currentPlayer.textContent = `${player.name}'s turn!`
        player1.textContent = Player1.name
        player2.textContent = Player2.name
    }

    function changeName(e, Player1, Player2, player) {
        let name = prompt("Player name?")
        if (name != null && name != '') {
            if (e.target.id === '1') {
            Player1.name = name
            }
            else {
                Player2.name = name
            }  
        }
        renderName(Player1, Player2, player)
    }
    
    function winScreen(player, result) {
        if (result === "Win") {
            currentPlayer.textContent = `${player.name} is the winner!`
        } else {
            currentPlayer.textContent = "Tie Game!" 
        }
    }

    return {winScreen, bind, clearBoard, renderName, changeName}
})();



const gameBoard = (() => {
    const domBoard = document.querySelectorAll('.gametile')
    displayController.bind(domBoard)
    let Player1 = playerFactory("Player 1", "X")
    let Player2 = playerFactory("Player 2", "O")
    let player = {}
    let counter = 0
    let gameover = false
    const restart = document.querySelector('.restart')
    restart.addEventListener('click', () => {
        displayController.clearBoard(domBoard)
    })

    gameStart()


    const nameChange = document.querySelectorAll('.name-change')
       nameChange.forEach(btn => {
           btn.addEventListener('click', (e) => {
               displayController.changeName(e, Player1, Player2, player)
           })
       })
    
    


    function gameStart () {
        Player1.moves = []
        Player2.moves = []
        gameover = false
        counter = 0
        randomPlayerStart()
        displayController.renderName(Player1, Player2, player)
    }
   

    function randomPlayerStart() {
        let x = (Math.floor(Math.random() * 2) == 0)
        if(x) {
            player = Player1
        } else {
            player = Player2
        }
    }

    function switchPlayer() {
        if(player.marker === "X") {
            player = Player2
        } else {
            player = Player1
        }
        displayController.renderName(Player1, Player2, player)
    }

    function placeMarker(tile) {
        if (gameover === true) {
            return
        }
        if (tile.textContent != '') {
            return
        } else {
            counter++
            tile.textContent = player.marker
            player.moves.push(tile.id)
            checkWinCondition()
            if (gameover != true) {
                switchPlayer()
            }
            console.log(counter)
        }
    }

    function checkWinCondition() {
        const winCondition = [
            ['1', '5', '9'], 
            ['3', '5', '7'], 
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['1', '4', '7'],
            ['2', '5', '8'],
            ['3', '6', '9']
    ]
        
        for (let i = 0; i < winCondition.length; i++) {
            let j = 0   
            n = winCondition[i][j]
            console.log(player.moves)
            if (player.moves.includes(n)) {
                    j++
                    n = winCondition[i][j]
                    if (player.moves.includes(n)) {
                        j++
                        n = winCondition[i][j]
                        if (player.moves.includes(n)) { 
                            displayController.winScreen(player, "Win")
                            gameover = true
                            return
                    } 
                } 
            } 
        } if (counter === 9) {
            displayController.winScreen(player, "Tie")
            gameover = true
            return
        }
    }   
        return {placeMarker, gameStart}
})();

