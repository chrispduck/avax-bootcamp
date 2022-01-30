// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// following https://docs.chain.link/docs/consuming-data-feeds/ 

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    // https://data.chain.link/
    /**
     * Network: Mainnet
     * Aggregator: DAI/USD
     * Address: 0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
