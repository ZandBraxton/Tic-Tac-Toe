const playerFactory = (name, marker) => {
    return {name, marker}
}



const gameBoard = (() => {
    const markers = []
    const domBoard = document.querySelectorAll('.gametile')

    const Player1 = playerFactory("P1", "X")
    const Player2 = playerFactory("P2", "O")
    let x = (Math.floor(Math.random() * 2) == 0)
    let player = {}
    if(x) {
        player = Player1
    } else {
        player = Player2
    }


    domBoard.forEach(tile => {
        tile.addEventListener('click', function() {
            let tile = this
            placeMarker(tile)
        })
    })

    function switchPlayer() {
        if(player.marker === "X") {
            player = Player2
            console.log(player)
        } else {
            player = Player1
            console.log(player)
        }
    }

    function placeMarker(tile) {
        tile.textContent = player.marker
        switchPlayer()
    }




    

})();

