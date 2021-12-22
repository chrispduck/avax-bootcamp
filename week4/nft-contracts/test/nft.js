const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const metadata = require("../metadata/cheetah-nft.json")

describe("nft", function (){
  before(async function() {
    [owner, addr1] = await ethers.getSigners();
    let factory = await ethers.getContractFactory("nft",);
    nft = await factory.deploy();
  })

  it("can mint a token", async () => {
    let tx = await nft.mint(addr1, metadata);
    let result = await tx.wait();
    console.log(`result ${result}`)
  })
});