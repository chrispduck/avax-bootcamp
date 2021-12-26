const { expect } = require("chai");
const { ethers } = require("hardhat");
const metadata = require("../metadata/cheetah-nft.json");

describe("nft", function (){
  before(async function() {
    [owner, addr1, addr2] = await ethers.getSigners();
    let factory = await ethers.getContractFactory("nft",);
    nft = await factory.deploy();
    console.log("metadata: ", JSON.stringify(metadata));
  })

  it("can mint a token", async () => {
    expect(nft.mint(addr1.address, JSON.stringify(metadata)))
    .to.emit(nft, "Transfer")
    .withArgs(ethers.constants.AddressZero, addr1.address, 1);
  })

  it("counts tokenIds from 1-255", async () => {
    expect(nft.mint(addr1.address, metadata.toString()))
    .to.emit(nft, "Transfer")
    .withArgs(ethers.constants.AddressZero, addr1.address, 2);
  })

  it("can retrieve metadata", async () => {
    expect(await nft.tokenURI(1)).to.equal(JSON.stringify(metadata));
  })

  it("can transfer", async () => {
    let tx = await nft.connect(addr1).transferFrom(addr1.address, addr2.address, 1);
    await tx.wait();
    expect(await nft.ownerOf(1)).to.equal(addr2.address);
  })

  
});
