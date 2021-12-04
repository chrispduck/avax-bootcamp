const { expect, use, assert } = require("chai");
const { ethers } = require("hardhat");
const {
  constants, // Common constants, like the zero address and largest integers
  expectRevert, // Assertions for transactions that should fail
} = require("@openzeppelin/test-helpers");

const { solidity } = require("ethereum-waffle");
const expectEvent = require("@openzeppelin/test-helpers/src/expectEvent");
use(solidity);

// https://www.chaijs.com/guide/styles/
// https://ethereum-waffle.readthedocs.io/en/latest/matchers.html

describe("Volcano Coin", () => {
  let volcanoContract;
  let owner, addr1, addr2, addr3;

  beforeEach(async () => {
    const Volcano = await ethers.getContractFactory("VolcanoCoin");
    volcanoContract = await Volcano.deploy();
    await volcanoContract.deployed();
    // console.log(volcanoContract);
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
  });

  it("has a name", async () => {
    expect(await volcanoContract.name()).to.equal("Volcano Coin");
    expect(await volcanoContract.name()).to.not.equal("Other Token");
  });

  it("reverts when transferring tokens to the zero address", async () => {
    // expectRevert from OpenZepplin test helpers
    await expectRevert(
      volcanoContract.transfer(constants.ZERO_ADDRESS, 10),
      "ERC20: transfer to the zero address"
    );
  });

  //homework
  it("has a symbol", async () => {
    let symbol = await volcanoContract.symbol();
    assert.notEqual(symbol, "hello", "symbol is hello, should be VLC");
    assert.equal(symbol, "VLC", "symbol is not VLC");
  });

  it("has 18 decimals", async () => {
    assert.equal(await volcanoContract.decimals(), 18);
    assert.notEqual(await volcanoContract.decimals(), 19);
  });

  it("assigns initial balance", async () => {
    assert.equal(await volcanoContract.balanceOf(owner.address), 100000);
    assert.notEqual(await volcanoContract.balanceOf(owner.address), 20);
  });

  it("increases allowance for address1", async () => {
    amount = 100;
    initial_allowance = await volcanoContract.allowance(
      owner.address,
      addr1.address
    );
    let tx = await volcanoContract.increaseAllowance(addr1.address, amount);
    await tx.wait();
    new_allowance = await volcanoContract.allowance(
      owner.address,
      addr1.address
    );
    // use expect to avoid doing toNumber()
    // assert.equal(new_balance.toNumber(), 100);
    expect(new_allowance).to.equal(initial_allowance + amount);
  });

  it("decreases allowance for address1", async () => {
    increase_by = 100;
    let tx = await volcanoContract.increaseAllowance(addr1.address, increase_by);
    await tx.wait();
    initial_allowance = await volcanoContract.allowance(
      owner.address,
      addr1.address
    );

    decrease_by = 20;
    tx = await volcanoContract.decreaseAllowance(addr1.address, decrease_by);
    await tx.wait();

    new_allowance = await volcanoContract.allowance(owner.address, addr1.address);
    expect(new_allowance).to.equal(initial_allowance - decrease_by);
  });

  it("emits an event when increasing allowance", async () => {
    let tx = await volcanoContract.increaseAllowance(addr1.address, 10);
    await expect(tx).to.emit(volcanoContract, "Approval");
  });

  it("revets decreaseAllowance when trying decrease below 0", async () => {
    current_allowance = await volcanoContract.allowance(
      owner.address,
      addr1.address
    );
    await expectRevert(
      volcanoContract.decreaseAllowance(addr1.address, current_allowance + 100),
      "ERC20: decreased allowance below zero"
    );
  });

  it("updates balances on successful transfer from owner to addr1", async () => {
    initial_balance = await volcanoContract.balanceOf(owner.address);
    tx = await volcanoContract.transfer(addr1.address, 100);
    await tx.wait();

    expect(await volcanoContract.balanceOf(owner.address)).to.equal(
      initial_balance - 100
    );
    assert.equal(await volcanoContract.balanceOf(addr1.address), 100);
  });

  it("reverts transfer when sender does not have enough balance", async () => {
    await expectRevert(
      volcanoContract.transfer(
        addr1.address,
        (await volcanoContract.balanceOf(owner.address)).toNumber() + 100
      ),
      "ERC20: transfer amount exceeds balance"
    );
  });

  it("reverts transferFrom addr1 to addr2 called by the owner without setting allowance", async () => {
    tx = await volcanoContract.transfer(addr1.address, 2000);
    await tx.wait();
    await expectRevert(
      volcanoContract.transferFrom(addr1.address, addr2.address, 100),
      "ERC20: transfer amount exceeds allowance"
    );
  });

  it("updates balances after transferFrom addr1 to addr2 called by the owner", async () => {
    amount = 1000;
    // transfer to addr1
    let tx = await volcanoContract.transfer(addr1.address, amount);
    tx.wait();
    // set allowance
    tx = await volcanoContract
      .connect(addr1)
      .increaseAllowance(owner.address, amount);
    tx.wait();
    // initial balances
    balance_addr1 = await volcanoContract.balanceOf(addr1.address);
    balance_addr2 = await volcanoContract.balanceOf(addr2.address);
    // transfer
    tx = await volcanoContract.transferFrom(
      addr1.address,
      addr2.address,
      amount
    );
    tx.wait();
    // check new balances
    expect(await volcanoContract.balanceOf(addr1.address)).is.equal(
      balance_addr1 - amount
    );
    expect(await volcanoContract.balanceOf(addr2.address)).is.equal(
      balance_addr2 + amount
    );
  });
});
