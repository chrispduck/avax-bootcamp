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
    uint256 totalSupply;
    mapping (address => uint256) public balance;
    struct funder {
        address dest;
        uint256 amount;
    }
    mapping (address => funder[]) payment; 

    event newTotalSupply(uint256);
    event coinTransfer(address, address, uint256);

    constructor() {
        totalSupply = 10000;
        balance[msg.sender] = totalSupply;
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    // only allowed to increment
    function increaseTotalSupply(uint256 _amount) public onlyOwner {
        totalSupply += _amount;
        emit newTotalSupply(_amount);
        // what if _amount + totalSupply exceeds capacity of uint256?
    }

    function send(uint256 _amount, address _destination) public {
        require(balance[msg.sender] >= _amount);
        balance[msg.sender] -= _amount;
        balance[_destination] += _amount;
        payment[msg.sender].push(funder({dest: _destination, amount: _amount}));
        emit coinTransfer(msg.sender, _destination, _amount);
    }
}
