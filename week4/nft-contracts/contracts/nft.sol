// SPDX-License-Identifier: Unlicensed

// An exercise to manually implement metadata for a ERC721 token
// rather than using OpenZepplin Metadata ERC721 add-on contract ERC721URIStorage

pragma solidity ^0.8.4;
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract nft is ERC721, Ownable {
    uint256 tokenId; // used as a counter

    struct metadata {
        uint256 tokenId;
        uint256 timestamp;
    }
    // mapping tokenId => tokenURI
    mapping(uint256 => string) tokenURIs;

    // Create a public record for token ownership with a mapping of the users address to an array of structs.
    mapping(address => metadata[]) portfolio;

    constructor() ERC721("ChrisNFT", "CNFT") {}

    // Start from tokenId=1
    function mint(address _to, string memory _tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        tokenId += 1;
        metadata memory tokenMetadata = metadata({
            tokenId: tokenId,
            timestamp: block.timestamp
        });
        console.log("mint: token URI", _tokenURI);
        tokenURIs[tokenId] = _tokenURI;
        _safeMint(_to, tokenId);
        portfolio[_to].push(tokenMetadata);
        return tokenId;
    }

    function burn(uint256 _tokenId) public {
        require(
            ownerOf(_tokenId) == msg.sender,
            "cannot burn a token which isn't owned by sender"
        );
        _burn(_tokenId);
        delete tokenURIs[_tokenId];
        removeFromPortfolio(msg.sender, _tokenId);
    }

    function removeFromPortfolio(address _owner, uint256 _tokenId) internal {
        for (uint256 i = 0; i < portfolio[_owner].length; i++) {
            if (portfolio[_owner][i].tokenId == _tokenId) {
                delete portfolio[_owner][i];
                break;
            }
        }
    }

    // Fetch tokenURI by mapping tokenID => URI
    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        console.log("tokenURI tokenURI:", tokenURIs[_tokenId]);
        return tokenURIs[_tokenId];
    }

    // Return an array of the tokenIds
    function listOwnedTokens(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](portfolio[_owner].length);
        for (uint256 i = 0; i < portfolio[_owner].length; i++) {
            result[i] = portfolio[_owner][i].tokenId;
        }
        return result;
    }
}
