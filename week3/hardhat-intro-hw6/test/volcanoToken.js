const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("volcanoToken", function () {
  it("Should create token and check the URI", async function () {
    const VolcanoToken = await ethers.getContractFactory("volcanoToken");
    const volcanoToken = await VolcanoToken.deploy();
    await volcanoToken.deployed();
    address = "0xb794f5ea0ba39494ce839613fffba74279579268";
    uri = "myURI"
    tokenID = 1
    await volcanoToken.mint(address, uri);
    console.log(typeof((await volcanoToken.balanceOf(address))._hex));
    assert.equal(await volcanoToken.tokenURISimple(1), uri);
  });
});
