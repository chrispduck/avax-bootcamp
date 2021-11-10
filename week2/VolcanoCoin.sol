// SPDX-License-Identifier: UNLICENSED .

pragma solidity ^0.8.0;

contract owned {
    address immutable owner;
    modifier onlyOwner() {
        if (msg.sender == owner) {
            _; //replaced by the code of calling function
        }
    }

    constructor() {
        owner = msg.sender;
    }
}

contract VolcanoCoin is owned {
    int256 totalSupply;
    event increasedTotalSupply(int256);

    constructor() {
        totalSupply = 10000;
    }

    function getTotalSupply() public view returns (int256) {
        return totalSupply;
    }

    // only allowed to increment
    function increaseTotalSupply(int256 _amount) public onlyOwner {
        totalSupply = totalSupply + _amount;
    }
}
