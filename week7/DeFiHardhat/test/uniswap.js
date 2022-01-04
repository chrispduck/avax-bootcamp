const { expect, use } = require("chai");
const { ethers } = require("hardhat");

const { solidity } = require("ethereum-waffle");
use(solidity);

const DAIAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("Uniswap", () => {
  let owner;
  let DAI_TokenContract;
  let USDC_TokenContract;
  let DeFi_Instance;
  let whale;
  let DAI_decimals; //TODO decimal amounts are different
  let USDC_decimals;
  const DOLLAR_AMOUNT = 10e14; // 1 dollars
  before(async function () {
    [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();
    
    // Get relevant token contracts
    DAI_TokenContract = await ethers.getContractAt("ERC20", DAIAddress);
    USDC_TokenContract = await ethers.getContractAt("ERC20", USDCAddress);
    console.log(await DAI_TokenContract.symbol());

    // set decimals
    DAI_decimals = 1;
    USDC_decimals = 1; //TODO use these?
    // DAI_decimals = await DAI_TokenContract.decimals();
    // USDC_decimals = await USDC_TokenContract.decimals();
    console.log(`decimals: `, DAI_decimals, USDC_decimals);

    // Tack control of the whale
    // Check that we have control of the whale account
    whale = await ethers.getSigner(
      "0x503828976D22510aad0201ac7EC88293211D23Da"
    );

    // Deploy our contract
    const DeFi = await ethers.getContractFactory("DeFi");
    DeFi_Instance = await DeFi.deploy();
  });

  it("check DAI transfer to owner succeeded too", async () => {
    console.log(
      `whale dai balance before`,
      await DAI_TokenContract.balanceOf(whale.address)
    );
    console.log(
      `owner dai balance before`,
      await DAI_TokenContract.balanceOf(owner.address)
    );

    let initialBalance = await DAI_TokenContract.connect(owner).balanceOf(
      owner.address
    );

    await DAI_TokenContract.connect(whale).transfer(
      owner.address,
      ethers.BigNumber.from(DOLLAR_AMOUNT * DAI_decimals)
    );
    console.log(
      `whale dai balance after`,
      await DAI_TokenContract.balanceOf(whale.address)
    );
    console.log(
      `owner dai balance after `,
      await DAI_TokenContract.balanceOf(owner.address)
    );
    expect(await DAI_TokenContract.balanceOf(owner.address)).to.equal(
      parseInt(initialBalance) + DOLLAR_AMOUNT * DAI_decimals
    );
  });

  it("should sendDAI to contract", async () => {
    tx = await DAI_TokenContract.connect(owner).transfer(
      DeFi_Instance.address,
      ethers.BigNumber.from(DOLLAR_AMOUNT * DAI_decimals)
    );
    result = await tx.wait();
    expect(
      await DAI_TokenContract.connect(owner).balanceOf(DeFi_Instance.address)
    ).to.equal(DOLLAR_AMOUNT * DAI_decimals);
  });

  it("should make a swap", async () => {
    await printOwnerBalances();
    await printDeFiBalances();
    USDC_owner_balance_before = await USDC_TokenContract.connect(
      owner
    ).balanceOf(owner.address);

    let tx = await DeFi_Instance.swapDAItoUSDC(DOLLAR_AMOUNT * DAI_decimals);
    result = await tx.wait();

    await printOwnerBalances();
    await printDeFiBalances();

    USDC_owner_balance_after = await USDC_TokenContract.connect(
      owner
    ).balanceOf(owner.address);
    expect(
      USDC_owner_balance_after - USDC_owner_balance_before
    ).to.be.greaterThan(0);
  });

  async function printOwnerBalances() {
    let balance_USDC_owner = await USDC_TokenContract.connect(
      owner.address
    ).balanceOf(owner.address);
    console.log(`owner balance usdc`, balance_USDC_owner);
    let balance_DAI_owner = await DAI_TokenContract.connect(
      owner.address
    ).balanceOf(owner.address);
    console.log(`owner balance dai`, balance_DAI_owner);
  }

  async function printDeFiBalances() {
    let balance_USDC = await USDC_TokenContract.connect(
      DeFi_Instance.address
    ).balanceOf(DeFi_Instance.address);
    console.log(`DeFi_Instance balance usdc`, balance_USDC);
    let balance_DAI = await DAI_TokenContract.connect(
      DeFi_Instance.address
    ).balanceOf(DeFi_Instance.address);
    console.log(`DeFi_Instance balance dai`, balance_DAI);
  }

  async function printDecimals() {
    console.log(
      `usdc decimals`,
      await USDC_TokenContract.connect(owner).decimals()
    );
    console.log(
      `dai decimals`,
      await DAI_TokenContract.connect(owner).decimals()
    );
  }
});
