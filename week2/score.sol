// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Score {

uint score;
address owner;

// events are only visible from outside a contract
event NewScore(uint _newScore);

constructor() {
    owner = msg.sender;
}

modifier onlyOwner{
    if (msg.sender == owner){
        // underscore _ means execute the remainder of the function
        _;
    }
}

function getScore() public  view returns (uint) {
    return score;
}
    
// Dont return a value for setters
// onlyOwner keyword restricts access
function setScore(uint _newScore) public onlyOwner {
    score = _newScore;
    // emitting events creates logging
    emit NewScore(score);
}

}