const playerFactory = (name, marker) => {
    let moves = []
    return {name, marker, moves}
}

const displayController = (() => {

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

    function winScreen(player, result, domBoard) {
        if (result === "Win") {
            console.log(`${player.name} is the winner!`)
            // clearBoard(domBoard)
        } else {
            console.log("Tie game!")
            // clearBoard(domBoard)
        }
    }

    const player1 = document.querySelector('.player1')
    const player2 = document.querySelector('.player2')
    const currentPlayer = document.querySelector('.turn')

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

    return {winScreen, bind, clearBoard, renderName, changeName}
})();



const gameBoard = (() => {
    const domBoard = document.querySelectorAll('.gametile')
    displayController.bind(domBoard)
    let Player1 = {}
    let Player2 = {}
    let player = {}
    let counter = 0
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
        Player1 = playerFactory("Player 1", "X")
        Player2 = playerFactory("Player 2", "O")
        player = {}
        counter = 0
        randomPlayerStart()
        displayController.renderName(Player1, Player2, player)
        // displayController.renderTurnName(player)
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
        if (tile.textContent != '') {
            return
        } else {
            counter++
            tile.textContent = player.marker
            player.moves.push(tile.id)
            checkWinCondition()
            switchPlayer()
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
                            displayController.winScreen(player, "Win", domBoard)
                    } 
                } 
            } 
        } if (counter === 9) {
            displayController.winScreen(player, "Tie", domBoard)
        }
    }   
        return {placeMarker, gameStart}
})();

