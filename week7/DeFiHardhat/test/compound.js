// import { ethers } from "hardhat";

const { ethers } = require("hardhat");

// import { expect } from "chai";
// ethers = require("@nomiclabs/hardhat-ethers");
chai = require("chai");

const DAIAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
let DaiToken;
// ethers.get
describe("compound", () => {
  before(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    // Tack control of the whale
    // Check that we have control of the whale account
    whale = await ethers.getSigner(
      "0x503828976D22510aad0201ac7EC88293211D23Da"
    );
    const factory = await ethers.getContractFactory("CompoundDefi");
    CompoundDefi = factory.deploy();
    DaiToken = await ethers.getContractAt("ERC20", DAIAddress);
  });

  it("can earn on cDAI", async () => {
    let balance = await DaiToken.balanceOf(whale.address);
    console.log("balance of DAI:", balance);
    let tx = await DaiToken.approve(CompoundDefi.address, 10e10);
    await tx.wait();
    
  });
});
