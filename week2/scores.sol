// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Scores {

mapping (address => uint) scores;

event NewScores(address _address, uint _newScore);

function getScore() public view returns (uint) {
    return scores[msg.sender];
}

function setScore(uint _newScores) public {
    scores[msg.sender] = _newScores;
    emit NewScores(msg.sender, scores[msg.sender]);
}

}