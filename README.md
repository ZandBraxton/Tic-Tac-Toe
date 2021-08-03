# Tic-Tac-Toe

Create a gameboard that's an array inside of an object

const gameBoard = (() => {
    //logic here
    gameboard array? 

    return {
        return functions?
    }; 
})();

const displayController = (() => {
    //logic here

    return {
        something?
    }
})



create player factory

const playerFactory = (name, marker) => {

    const win = () => console.log("You win?) // Maybe?
    return {name, marker}
}


function checkForWin(whichPlayer){
  - iterate over the winConditions array, each of which 
    represents a single winCondition.
    - For each winCondition, check if each value is present 
      anywhere in the whichPlayer. 
      - If it is not, drop out of the loop, this not a win
      - If all the values of this winCondition are present in 
        whichPlayer, then we can return a win!
  - If we loop through all the winConditions and fall out the bottom, no win.

  Add restart button
  On the left there should be a form to change the name of P1 and a button on the right for P2
  Add a score system
