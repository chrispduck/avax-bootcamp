const { expect, use } = require("chai");
const { ethers } = require("hardhat");

const { solidity } = require("ethereum-waffle");
use(solidity);

const DAIAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("DeFi", () => {
  let owner;
  let DAI_TokenContract;
  let USDC_TokenContract;
  let DeFi_Instance;
  let whale;
  const INITIAL_AMOUNT = 999999999000000;
  before(async function () {
    [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

    // Get relevant token contracts
    DAI_TokenContract = await ethers.getContractAt("ERC20", DAIAddress);
    USDC_TokenContract = await ethers.getContractAt("ERC20", USDCAddress);
    console.log(await DAI_TokenContract.symbol());
    
    // Tack control of the whale
    // Check that we have control of the whale account
    const whale = await ethers.getSigner(
      "0x503828976D22510aad0201ac7EC88293211D23Da"
    );

    // Deploy our contract
    const DeFi = await ethers.getContractFactory("DeFi");
    DeFi_Instance = await DeFi.deploy();
  });

  it("should check transfer succeeded", async () => {
    let initialBalance = await DAI_TokenContract.balanceOf(owner.address);
    await DAI_TokenContract.connect(whale).transfer(
      owner.address,
      BigInt(INITIAL_AMOUNT)
    );
    expect(await DAI_TokenContract.balanceOf(owner.address)).to.equal(initialBalance + INITIAL_AMOUNT);
  });

  it("should sendDAI to contract", async () => {
    expect(await DAI_TokenContract.transfer(DeFi_Instance.address, 99999999900000)).to.equal(true);
    
  });

  it("should make a swap", async () => {
    expect
  });
});
