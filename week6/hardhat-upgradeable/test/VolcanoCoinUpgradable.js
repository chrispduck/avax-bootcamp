const { assert, expect, use } = require("chai");
const { ethers, upgrades } = require("hardhat");
const {
  constants, // Common constants, like the zero address and largest integers
  expectRevert, // Assertions for transactions that should fail
} = require("@openzeppelin/test-helpers");

const { solidity } = require("ethereum-waffle");
// const expectEvent = require("@openzeppelin/test-helpers/src/expectEvent");
use(solidity);

// https://www.chaijs.com/guide/styles/
// https://ethereum-waffle.readthedocs.io/en/latest/matchers.html

describe("Volcano Coin Upgradeable", () => {
  let volcanoContract;
  let owner, addr1, addr2, admin;

  beforeEach(async () => {
    [owner, addr1, addr2, admin] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("VolcanoCoinUpgradeable");
    volcanoContract = await upgrades.deployProxy(factory, ["VolcanoCoinUpgradeable", "VCU", admin.address]);
    await volcanoContract.deployed();
  });
  
  // https://docs.openzeppelin.com/upgrades-plugins/1.x/hardhat-upgrades
  // https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable
  it("can be upgraded ", async () => {
    expect(await volcanoContract.versionNumber()).to.equal(1);

    const factoryV2 = await ethers.getContractFactory("VolcanoCoinUpgradeableV2");
    const upgraded = await upgrades.upgradeProxy(volcanoContract.address, factoryV2);

    await upgraded.deployed();
    console.log("volcanoContract addr:", volcanoContract.address);
    console.log("upgraded addr:", upgraded.address);
    expect(await upgraded.newFunction()).to.equal(true);
    const initTx = await upgraded.setVersionNumber(2);
    await initTx.wait();
    expect(await volcanoContract.versionNumber()).to.equal(2); 
    expect(await upgraded.versionNumber()).to.equal(2);
  })

  it("has a version number", async () => {
    expect(await volcanoContract.versionNumber()).to.equal(1);
  })

  it("has a symbol", async () => {
    let symbol = await volcanoContract.symbol();
    assert.notEqual(symbol, "hello", "symbol is hello, should be VLC");
    assert.equal(symbol, "VCU", "symbol is not VLC");
  });
  
  it("has 18 decimals", async () => {
    assert.equal(await volcanoContract.decimals(), 18);
    assert.notEqual(await volcanoContract.decimals(), 19);
  });


})
