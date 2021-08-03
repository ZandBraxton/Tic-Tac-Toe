const playerFactory = (name, marker) => {
    let moves = []
    return {name, marker, moves}
}



const gameBoard = (() => {
    const markers = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    ]
    
    // console.log(markers)
    const domBoard = document.querySelectorAll('.gametile')
    //create players
    const Player1 = playerFactory("P1", "X")
    const Player2 = playerFactory("P2", "O")
    let player = {}
    randomPlayerStart()
    bind()

    function randomPlayerStart() {
        let x = (Math.floor(Math.random() * 2) == 0)
        if(x) {
            player = Player1
        } else {
            player = Player2
        }
    }

    function bind () {
        domBoard.forEach(tile => {
            tile.addEventListener('click', function() {
                let tile = this
                console.log(tile.id)
                console.log(markers)
                placeMarker(tile)
            })
        })    
    }    

    function unbind () {
        domBoard.forEach(tile => {
            tile.removeEventListener('click', function() {
                let tile = this
                console.log(tile.id)
                console.log(markers)
                placeMarker(tile)
            })
        })    
    }    
        

    function switchPlayer() {
        if(player.marker === "X") {
            player = Player2
        } else {
            player = Player1
        }
    }

    function placeMarker(tile) {
        if (tile.textContent != '') {
            return
        } else {
            tile.textContent = player.marker
            // console.log(tile.id)
            player.moves.push(tile.id)
            checkWinCondition()
            switchPlayer()
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
                            console.log("You Win!") 
                            displayController.winScreen()
                    } 
                } 
            } 
        } 
    }   
        return {markers}
})();

const displayController = (() => {
    // console.log(gameBoard.markers)
    // console.log(gameBoard.markers.length)
    // const board = document.querySelector('.gameboard')
    
    //make display function and then return it to gameboard to use with marker array


    // for (let i = 0; i < 9; i++) {
    //     const tiles = document.createElement('div')
    //     tiles.classList.add('gametile')
    //     tiles.id = i + 1
    //     tiles.textContent = gameBoard.markers[i]
    //     board.appendChild(tiles)
    // }
    function winScreen () {
        console.log("test")
    }

    return {winScreen}
})();