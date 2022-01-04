// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface ERC20simple {
    function approve(address, uint256) external returns (bool);

    function transfer(address, uint256) external returns (bool);
}

// https://github.com/compound-finance/compound-protocol/blob/master/contracts/CTokenInterfaces.sol
// https://compound.finance/docs/ctokens
interface cERC20 {
    function mint(uint256) external returns (uint256);

    function exchangeRateCurrent() external returns (uint256);

    function supplyRatePerBlock() external returns (uint256);

    function redeem(uint256) external returns (uint256);

    function redeemUnderlying(uint256) external returns (uint256);
}   

contract CompoundDefi {
    address private DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address private cDAI = 0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643;
    ERC20simple immutable TokenDAI;
    cERC20 immutable TokenCDAI;
    constructor (){
        TokenDAI = ERC20simple(DAI);
        TokenCDAI = cERC20(cDAI);
    }
    
    function addToCompound(uint256 amount) public {
        TokenDAI.approve(cDAI, amount);
        TokenCDAI.mint(amount);
    }
}