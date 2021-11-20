// SPDX-License-Identifier: UNLICENSED .

// HOMEWORK 5
pragma solidity ^0.8.0;

import "@openzeppelin/contracts@4.2.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.2.0/access/Ownable.sol";

contract VolcanoCoin is ERC20("ChrisCoin", "CCO"), Ownable{
    constructor(){
        _mint(msg.sender, 10000);
    }
    
    function mintTokens(uint256 _amount) public onlyOwner{
        _mint(owner(), _amount);
    }
    
    struct funder {
        address dest;
        uint256 amount;
    }
    mapping (address => funder[]) public payment; 

    function increaseTotalSupply(uint256 _amount) public onlyOwner {
         _mint(owner(), _amount);
    }
    
    function send(uint256 _amount, address _destination) public {
        _transfer(msg.sender, _destination, _amount);
        payment[msg.sender].push(funder({dest: _destination, amount: _amount}));
    }
}